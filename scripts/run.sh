#!/bin/bash

./scripts/build.sh

docker run -d --name gallery-front-container --rm -it -p 4700:80 mercurio-front