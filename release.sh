#!/bin/bash

grunt

rm -rf build/intermediate
scp -r -i ~/.ssh/t1.micro.cer build/* ubuntu@ec2-54-186-122-115.us-west-2.compute.amazonaws.com:/home/ubuntu/stevendcoffey.com
