FROM node:18-alpine as front

WORKDIR /app/front
COPY ./front .

RUN npm install
RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]