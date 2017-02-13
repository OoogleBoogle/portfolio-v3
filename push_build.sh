#!/bin/bash
set -e
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ $BRANCH != 'master' ]
  then
    git checkout master
    git merge $BRANCH -m "pulling in changes" --ff-only
    git push origin master
fi

git checkout gh-pages
if [ -a ./build ]
  then
    rm -f -r ./build
    git add -A && git commit -m "delete old build"
fi
git merge master -m "pre build merge" --ff-only
gulp critical
git push origin `git subtree split --prefix build gh-pages`:gh-pages --force
