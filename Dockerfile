FROM node:alpine

# Create app directory
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY ./src/Infrastructure/db/prisma/ ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

# Install package.json dependencies.
RUN npm install

# Generate Prisma client.
RUN npx prisma generate

# Run and expose the server on port 4000
EXPOSE 4000

# A command to start the server
CMD npm run start
