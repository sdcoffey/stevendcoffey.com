#!/bin/bash

gulp build:prod

export AWS_PROFILE=sdcoffey
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_KEY
bucket_name=stevendcoffey.com
tag=$1

git checkout $tag

aws s3 rm "s3://$bucket_name/" --recursive --region=us-west-1
aws s3 cp ./build/prod/ "s3://$bucket_name" --recursive --region=us-west-1

