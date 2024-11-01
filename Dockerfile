# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies for the server
COPY ./server/package*.json ./server/
RUN cd server && npm install

# Copy package.json and install dependencies for the client
COPY ./client/package*.json ./client/
RUN cd client && npm install

# Copy the rest of your application code
COPY . .

# Build the client app
RUN cd client && npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "./server/index.js"]
