#!/usr/bin/env bash

git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

git fetch origin gh-pages

git checkout gh-pages