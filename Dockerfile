# Base Image
FROM node:20

# Working Directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install Dependencies
RUN npm install

# Copy rest of the project (optional in dev, usually mounted as volume)
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Start Next.js in dev mode
CMD ["npm", "run", "dev"]