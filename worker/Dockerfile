FROM node:12.18.3-alpine

WORKDIR /home/app

COPY package.json /home/app/
RUN npm install
COPY . /home/app
RUN npm run build

EXPOSE 9230
CMD ./scripts/start.sh
