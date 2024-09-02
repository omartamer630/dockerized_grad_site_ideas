# Use Node.js for the backend
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY . .

# Install dependencies
RUN npm install

# Expose the port that the backend will run on
EXPOSE 4001

# Start the backend server
CMD ["npm" , "run" , "server"]
