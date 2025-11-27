FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
# install production deps if present; fallback to install
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
