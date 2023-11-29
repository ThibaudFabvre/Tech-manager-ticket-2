FROM node:latest
WORKDIR /app
COPY package.json /app/
COPY src /app/src/
COPY tsconfig.json /app/
COPY nodemon.json /app/
RUN yarn install
EXPOSE 8000

CMD ["yarn", "start:prod"]