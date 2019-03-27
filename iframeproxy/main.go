package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/sdcoffey/iframeproxy/utils"
)

const BASE_URL = "https://5bvxzrenc3.execute-api.us-east-1.amazonaws.com/dev/iFrameProxy"

func main() {
	lambda.Start(Handler)
}

func Handler(evt events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	encodedRequestedUrl := evt.QueryStringParameters["url"]
	requestedUrl := utils.Base64Decode(encodedRequestedUrl)

	response, err := utils.Fetch(BASE_URL, requestedUrl)

	if err != nil {
		return nil, err
	}

	return &events.APIGatewayProxyResponse{
		Headers:         response.Headers,
		Body:            response.Body,
		StatusCode:      response.StatusCode,
		IsBase64Encoded: response.Base64,
	}, nil
}
