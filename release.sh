#!/bin/bash


export AWS_PROFILE=sdcoffey
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_KEY
bucket_name=stevendcoffey.com

last_tag=`git tag --list | tail -n1`
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

gulp build --production

aws s3 rm "s3://$bucket_name/" --recursive --region=us-west-1
aws s3 cp ./build/prod/ "s3://$bucket_name" --recursive --region=us-west-1

git push --tags

git checkout master

