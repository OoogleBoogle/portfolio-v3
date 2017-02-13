#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo $BRANCH

if [ $BRANCH == 'optimizing' ]
  then
    echo "Yay $BRANCH"
fi

# git checkout master
# git merge $BRANCH -m "pulling in changes" --ff-only

# git checkout gh-pages
# git merge master -m "pre build merge" --ff-only
# if [ -a ./build ]
#   then
#     rm -f -r ./build
# fi
# gulp critical
# git push origin `git subtree split --prefix build gh-pages`:gh-pages --force
