package utils

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"path/filepath"
	"regexp"
	"strings"

	"golang.org/x/net/html"
)

type Response struct {
	StatusCode int
	Body       string
	Headers    map[string]string
	Base64     bool
}

func Base64EncodeBytes(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

func Base64EncodeString(str string) string {
	return Base64EncodeBytes([]byte(str))
}

func Base64Decode(b64 string) string {
	b, _ := base64.StdEncoding.DecodeString(b64)

	return string(b)
}

func Fetch(host, url string) (*Response, error) {
	resp, httpErr := http.Get(url)

	if httpErr != nil {
		return nil, fmt.Errorf("error requesting %s: %s", url, httpErr)
	}

	var contentType string
	headers := make(map[string]string)

	// Always add access control header
	headers["Access-Control-Allow-Origin"] = "*"

	for k, v := range resp.Header {
		if len(v) > 0 {
			switch strings.ToLower(k) {
			case "content-security-policy":
			case "x-frame-options":
			case "content-type":
				contentType = v[0]
				fallthrough
			default:
				headers[k] = v[0]
			}
		}
	}

	var body string
	switch {
	case strings.Contains(contentType, "text/html"):
		body = NormalizeHtml(resp.Body, host, url)
	case strings.Contains(contentType, "text/css"):
		body = Normalize(cssPathReg, resp.Body, host, url, `(%s)`)
	default:
		unalteredBody, readErr := readBody(resp.Body)
		if readErr != nil {
			return nil, fmt.Errorf("error reading body: %s", readErr)
		}

		body = string(unalteredBody)
	}

	return &Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       Base64EncodeString(body),
		Base64:     true,
	}, nil
}

func readBody(body io.Reader) ([]byte, error) {
	b, e := ioutil.ReadAll(body)
	if e != nil {
		return []byte{}, e
	}

	return b, nil
}

const TAG_WHITELIST = "href|src|content"

var cssPathReg = regexp.MustCompile(`\((\/|.+\/).*\.[a-zA-Z]{3,4}\)`)
var htmlPathReg = regexp.MustCompile(`=(\s+)?('|")(\/|.+\/).*\.[a-zA-Z]{3,4}('|")`)

func Normalize(regx *regexp.Regexp, body io.Reader, baseUrl, originalUrl, fmtString string) string {
	fullBody, _ := readBody(body)
	parsedUrl, _ := url.Parse(originalUrl)

	return regx.ReplaceAllStringFunc(string(fullBody), func(path string) string {
		urlPath := parsedUrl.Path
		newPath := filepath.Join(urlPath, path)

		absoluteDestination := fmt.Sprintf("%s://%s%s", parsedUrl.Scheme, parsedUrl.Host, newPath)
		return fmt.Sprintf(fmtString, baseUrl+fmt.Sprintf("?url=%s", Base64EncodeString(absoluteDestination)))
	})
}

func NormalizeHtml(body io.Reader, baseUrl, originalUrl string) string {
	var buf bytes.Buffer
	tee := io.TeeReader(body, &buf)

	tokenizer := html.NewTokenizer(tee)
	parsedUrl, _ := url.Parse(originalUrl)

	mappings := make(map[string]string)

	for {
		tokenType := tokenizer.Next()

		if tokenType == html.ErrorToken {
			break
		}

		token := tokenizer.Token()
		newAttrs := make([]html.Attribute, len(token.Attr))

		originalToken := string(tokenizer.Raw())

		changedAttrs := 0
		for i, attr := range token.Attr {
			if !strings.Contains(TAG_WHITELIST, attr.Key) {
				continue
			}

			log.Printf("Rewriting %s tag value: %s\n", attr.Key, attr.Val)

			var absoluteDestination string

			switch {
			case strings.HasPrefix(attr.Val, "//"):
				attr.Val = parsedUrl.Scheme + attr.Val
				fallthrough
			case strings.HasPrefix(attr.Val, "http"):
				absoluteDestination = attr.Val

			case strings.HasPrefix(attr.Val, "/"):
				fallthrough
			case strings.HasPrefix(attr.Val, "./"):
				fallthrough
			case strings.HasPrefix(attr.Val, "../"):
				urlPath := parsedUrl.Path
				newPath := filepath.Join(urlPath, attr.Val)

				absoluteDestination = fmt.Sprintf("%s://%s%s", parsedUrl.Scheme, parsedUrl.Host, newPath)
			}

			if absoluteDestination != "" {
				newUrl := baseUrl + fmt.Sprintf("?url=%s", Base64EncodeString(absoluteDestination))
				log.Printf("Rewrote %s tag value: %s -> %s \n", attr.Key, attr.Val, newUrl)

				attr.Val = newUrl
				changedAttrs++
				newAttrs[i] = attr
			}
		}

		if changedAttrs > 0 {
			token.Attr = newAttrs
			mappings[originalToken] = token.String()
		}
	}

	fullHtmlData, _ := ioutil.ReadAll(&buf)
	fullHtml := string(fullHtmlData)

	for target, replacement := range mappings {
		fullHtml = strings.Replace(fullHtml, target, replacement, 1)
	}

	return fullHtml
}
