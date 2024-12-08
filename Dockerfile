FROM node:20

WORKDIR /app

COPY . .

RUN npm install
RUN npm install --global @expo/ngrok@^4.1.0

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 8081

CMD ["npm", "start"]
