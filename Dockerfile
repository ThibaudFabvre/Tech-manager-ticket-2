FROM --platform=linux/amd64 node:latest AS development
WORKDIR /app
COPY package.json /app/
RUN yarn install
COPY . .
RUN yarn build


FROM --platform=linux/amd64 node:latest AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package.json /app/
RUN yarn install --only=prod
COPY . .
COPY --from=development /app/dist ./dist

CMD ["node", dist/main]

EXPOSE 8000
