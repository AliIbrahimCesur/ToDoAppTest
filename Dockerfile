# İlk olarak bir node.js imajı alalım
FROM node:14-alpine

# Uygulama kodunu /app klasörüne kopyalayalım
WORKDIR /app
COPY . .

# Bağımlılıkları yükleyelim
RUN npm install

# Uygulamayı build edelim
RUN npm run build

# Uygulamayı 3000 portunda çalışacak şekilde expose edelim
EXPOSE 3000

# Uygulamayı başlatmak için komut
CMD ["npm", "start"]


#docker build -t my-app .
#docker run -p 3000:3000 my-app
