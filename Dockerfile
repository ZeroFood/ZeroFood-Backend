FROM node:10.19.0-alpine3.9
WORKDIR /opt/app

COPY package.json .
COPY ormconfig.json .
COPY tsconfig.json .
COPY src src/

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install -g apidoc

RUN npm install

RUN tsc && apidoc -i src/ -o apidoc/

CMD [ "npm", "start" ]