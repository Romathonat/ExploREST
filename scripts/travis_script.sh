#!/usr/bin/env bash

#we package to deploy to heroku
npm run build

git config user.name "Travis CI"
git config user.email "github@travis-ci.org"

git commit -am "deploy to heroku"
