#Stage 1: build frontend
FROM node:latest as client-builder

WORKDIR /client

COPY client/package*.json ./
RUN npm i

COPY client/. .
RUN npm run build

#Stage2: build server
FROM node:latest as node-builder
WORKDIR /server

COPY server/package*.json ./
COPY server/API/package*.json ./API/
COPY server/Data/package*.json ./Data/
COPY server/Domain/package*.json ./Domain/

RUN npm run install-all

COPY server/. .

COPY --from=client-builder /client/build ./API/public/production

CMD npm run start-prod