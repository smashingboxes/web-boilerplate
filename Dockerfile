# Use the slim version of the latest Node LTS which includes Yarn
FROM node:6.10.2-slim

# Docker images have no default editor so we'll use vim
RUN apt-get update && apt-get install -y \
  vim

# Create an app directory for our app to exist in the docker container
RUN mkdir -p app

# Establish a directory where later commands will be run relative to in the container
WORKDIR /app

# Copy package.json & yarn.lock into our app directory in the container
COPY package.json \
  yarn.lock \
  # Destination folder
  /app/

# Install dependencies in the container
RUN yarn install

# Copy all the rest of our files into the app directory in the container
COPY . /app

# Expose port for webpack
EXPOSE 8080
