FROM node:alpine

ENV NODE_ENV production

WORKDIR /app/

USER root

COPY package*.json ./

RUN apk add --no-cache ffmpeg opus pixman cairo pango giflib ca-certificates \
    && apk add --no-cache --virtual .build-deps python3 g++ autoconf libtool make gcc automake  .build-deps curl git pixman-dev cairo-dev pangomm-dev libjpeg-turbo-dev giflib-dev \
    && npm install \
    && apk del .build-deps

RUN npm install --production

COPY . ./

CMD ["node", "./dist/index.js"]