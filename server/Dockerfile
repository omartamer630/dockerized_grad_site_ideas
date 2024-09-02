# Stage 1: Build stage
FROM node:18 AS build

WORKDIR /app

# Copy only the package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production stage
FROM node:18-slim

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app /app

# Expose the port that the backend will run on
EXPOSE 4001

# Start the backend server
CMD ["npm", "run", "server"]
