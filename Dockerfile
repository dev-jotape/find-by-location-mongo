FROM node:12.18.1 as base

RUN mkdir /app
WORKDIR /app

EXPOSE 4000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["npm", "start"]

FROM base as dev
ENV NODE_ENV=development
COPY . .
RUN npm install -g nodemon && npm install
CMD ["npm", "start"]
