# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port your React app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
