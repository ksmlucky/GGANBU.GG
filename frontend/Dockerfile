FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/gganbu/frontend
COPY package*.json ./
COPY yarn.lock ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

EXPOSE 3000
CMD ["npm", "run","start;"]