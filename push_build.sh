#!/bin/bash

git checkout gh-pages
git merge master -m "pre build merge"
if [ -f ./build ]
  then
    rm -f -r ./build
    echo "build exists"
fi
# gulp critical
# git push origin `git subtree split --prefix build gh-pages`:gh-pages --force
