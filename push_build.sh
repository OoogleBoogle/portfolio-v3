#!/bin/bash

git checkout gh-pages
git merge master -m "pre build merge" --ff-only
if [ -a ./build ]
  then
    rm -f -r ./build
fi
gulp critical
git push origin `git subtree split --prefix build gh-pages`:gh-pages --force
