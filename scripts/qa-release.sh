#!/bin/bash
read -p "Ingrese el numero de la version: " version

image="pulzo/videoteca-front:qa"

#stage preparacion carpeta dist para subir la ultima version
rm -rf dist

ng build --configuration=staging --aot --output-hashing=all

export SENTRY_AUTH_TOKEN=;
export SENTRY_PROJECT=video-ia-frontend-daab;

./node_modules/.bin/sentry-cli releases --org=pulzo-gf  new $version
#./node_modules/.bin/sentry-cli releases --org=pulzo-gf  files $version upload-sourcemaps dist/gea    
./node_modules/.bin/sentry-cli sourcemaps upload --release $version --org pulzo-gf dist/gea

./node_modules/.bin/sentry-cli releases --org=pulzo-gf finalize $version


#stage creacion de la imagen de docker
docker build --no-cache -t videoteca-front  -f Dockerfile  . --platform linux/x86_64
docker tag videoteca-front $image
docker push $image

#stage eliminacion de la imagen de docker
docker rmi $image