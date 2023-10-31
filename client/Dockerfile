FROM node:18

WORKDIR /

COPY package*.json ./

COPY ./ ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]

