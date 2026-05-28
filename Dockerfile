FROM nginx:1.23.3-alpine

COPY /dist/gea/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
