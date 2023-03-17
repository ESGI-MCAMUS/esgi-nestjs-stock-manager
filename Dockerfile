# Image source
FROM node:18-alpine

# Docker working directory
WORKDIR /app

# Install yarn
# RUN npm i yarn -g

# Copying file into APP directory of docker
COPY package*.json .
COPY yarn.lock .

# Then install the NPM module
RUN yarn

# Copy current directory to APP folder
COPY . .

EXPOSE 3000

# CMD ["npm", "run", "start:dev"]