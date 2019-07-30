FROM node:10.16.0-alpine

ENV NEWMAN_VERSION 4.5.1

WORKDIR /etc/newman

COPY . /etc/newman

RUN npm pack && \
    npm install -g new2man-0.1.0.tgz && \
    rm -fR ./*

ENTRYPOINT ["docker-entrypoint.sh", "new2man"]
