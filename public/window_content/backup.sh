#!/bin/bash

echo Backing up...
echo

DATE=$(date "+%m/%d/%Y %H:%M %Z")

git add .
git commit -m "${DATE}"
git push origin main

echo
echo Done. Saved as "\"${DATE}\""