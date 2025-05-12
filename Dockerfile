FROM node:23.11.0-slim

# Add labels/tags
LABEL version="1.0.0"
LABEL description="Employee Offboarding Manager Application"
LABEL maintainer="your-email@example.com"

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 4200
CMD ["npm", "start"]

