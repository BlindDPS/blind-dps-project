FROM node:16
WORKDIR /usr/src/app

ARG SSH_PRIVATE_KEY
RUN mkdir ~/.ssh/
RUN echo "$SSH_PRIVATE_KEY" >> ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa

COPY package*.json ./
RUN npm install --silent
COPY . .
CMD ["npm", "start"]
EXPOSE 3000
