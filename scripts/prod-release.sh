#!/bin/bash
read -p "Ingrese el numero de la version: " version

image="pulzo/videoteca-front:latest"

#stage preparacion carpeta dist para subir la ultima version
rm -rf dist

ng build --configuration=production --aot --output-hashing=all

export SENTRY_AUTH_TOKEN=;
export SENTRY_PROJECT=;

./node_modules/.bin/sentry-cli releases --org=pulzo  new $version
./node_modules/.bin/sentry-cli releases --org=pulzo  files $version upload-sourcemaps dist/gea    
./node_modules/.bin/sentry-cli releases --org=pulzo finalize $version


#stage creacion de la imagen de docker
docker build --no-cache -t videoteca-front  -f Dockerfile  . --platform linux/x86_64
docker tag videoteca-front $image
docker push $image

#stage eliminacion de la imagen de docker
docker rmi $image