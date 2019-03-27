package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/sdcoffey/iframeproxy/utils"
)

func main() {
	http.HandleFunc("/", handler)
	if listenErr := http.ListenAndServe(":3000", nil); listenErr != nil {
		fmt.Println(listenErr.Error())
	}
}

const BASE_URL = "https://c6b984af.ngrok.io"

func handler(resp http.ResponseWriter, req *http.Request) {
	encodedRequestedUrl := req.URL.Query().Get("url")
	if encodedRequestedUrl == "" {
		resp.WriteHeader(http.StatusBadRequest)
		return
	}

	requestedUrl := utils.Base64Decode(encodedRequestedUrl)

	log.Printf("Requested %s		%s		URL: %s", req.Method, req.URL.Path, requestedUrl)

	response, fetchErr := utils.Fetch(BASE_URL, requestedUrl)

	if fetchErr != nil {
		resp.WriteHeader(http.StatusBadRequest)
		resp.Write([]byte(fetchErr.Error()))
	} else {
		for headerKey, headerValue := range response.Headers {
			resp.Header().Set(headerKey, headerValue)
		}

		resp.WriteHeader(response.StatusCode)
		responseBody := response.Body
		if response.Base64 {
			responseBody = utils.Base64Decode(responseBody)
		}
		resp.Write([]byte(responseBody))
	}
}
