FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npx", "vite", "preview", "--port", "5173", "--host"]

# To add Cypress e2e tests, swap the base image for cypress/included, add
