FROM node:16

WORKDIR /usr/src/client

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Set environment variables
ENV VITE_HOST=0.0.0.0

# Expose the port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev", "--", "--host"]
