#!/bin/bash

tag=$1
grunt

git fetch
git co $tag
rm -rf /var/www/stevendcoffey/*
sudo cp build/index.html /var/www/stevendcoffey/
sudo cp -R build/js /var/www/stevendcoffey/
sudo cp -R build/style /var/www/stevendcoffey/
