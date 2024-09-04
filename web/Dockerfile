FROM node:18.17.0-alpine

WORKDIR /web

COPY . /web

RUN npm install

# Build the Next.js application
RUN npm run build

CMD ["npm", "start"]