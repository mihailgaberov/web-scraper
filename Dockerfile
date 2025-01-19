# Use a base image with Playwright dependencies
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the port your app listens on
EXPOSE 5001

# Run the application
CMD ["npm", "start"]
