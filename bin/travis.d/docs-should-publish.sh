#!/usr/bin/env bash

SOURCE_BRANCH="master"
# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "{$TRAVIS_PULL_REQUEST}" == "false" ] && [ "${TRAVIS_BRANCH}" == "${SOURCE_BRANCH}" ]; then
    echo "DOCS: documentation WILL be published"
    exit 0
else
    echo "DOCS: documentation WILL NOT be published"
    exit 1
fi