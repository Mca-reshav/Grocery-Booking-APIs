FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6001

CMD ["npx", "nodemon"]
