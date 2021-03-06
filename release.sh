#!/bin/bash

bucket_name=stevendcoffey.com

last_tag=`git tag --list | gsort -V | tail -n1`
echo "Which tag to create (last tag: ${last_tag})"
read tag

if [ "$tag" == "" ]
then
  echo "Must specify tag"
  exit 1
fi

git pull --tags
git tag $tag -m $tag
git checkout $tag

middleman build --clean

aws s3 rm "s3://$bucket_name/" --recursive --region=us-west-1
aws s3 cp ./build/ "s3://$bucket_name" --recursive --region=us-west-1

aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $WEBSITE_DISTRO_ID --paths "/*"

git push --tags

git checkout master

