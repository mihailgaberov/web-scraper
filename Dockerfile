# Use the required Playwright base image
FROM mcr.microsoft.com/playwright:v1.49.1-jammy

# Set the working directory
WORKDIR /

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the port your app listens on
EXPOSE 5001

# Run the application
CMD ["npm", "start"]
