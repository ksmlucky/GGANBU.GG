FROM node:16.15.0 as build-stage
WORKDIR /var/jenkins_home/workspace/GGANBU/frontend
COPY package*.json ./
COPY yarn.lock ./
RUN apt-get install npm -y
COPY . .
RUN npm run build
FROM nginx:stable-alpine as production-stage

EXPOSE 3000
CMD ["npm", "run","start;"]