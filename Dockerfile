FROM node:18-slim

# Install Playwright dependencies
RUN apt-get update && apt-get install -y \
    libgstreamer-gl1.0-0 \
    libgstreamer-plugins-bad1.0-0 \
    libenchant-2-2 \
    libsecret-1-0 \
    libmanette-0.2-0 \
    libgles2-mesa \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright
RUN npx playwright install --with-deps

# Set the working directory
WORKDIR /
COPY . .

# Install dependencies
RUN npm install

# Start the server
CMD ["npm", "start"]
