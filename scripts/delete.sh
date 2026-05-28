#!/bin/bash

./scripts/stop.sh

container='gallery-front-container'
image='mercurio-front'

if [ "$(docker ps -aq -f name=$container)" ]; then
    docker rm -f $container
fi

if [ "$(docker images -q $image)" ]; then
    docker rmi $image
fi
