#!/bin/bash

./scripts/delete.sh

rm -rf ./dist

ng build $1 --aot --output-hashing=all

docker build --no-cache -t mercurio-front . $2 $3
