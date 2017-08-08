#!/usr/bin/env bash

SOURCE_BRANCH="add-documentation"
# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "{$TRAVIS_PULL_REQUEST}" != "false" -o "${TRAVIS_BRANCH}" != "${SOURCE_BRANCH}" ]; then
    exit 0
else
    exit 1
fi