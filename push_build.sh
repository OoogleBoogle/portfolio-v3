#!/bin/bash

git checkout gh-pages
git merge master -m "pre build merge" --ff-only
git push origin `git subtree split --prefix build gh-pages`:gh-pages --force
