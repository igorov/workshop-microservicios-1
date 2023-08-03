FROM node:18.16.1-alpine3.17

RUN mkdir -p /home/order

# Exponer en el puerto 8080
EXPOSE 8080

WORKDIR /home/order

# Copiar el contenido a la carpeta
COPY . /home/order

CMD ["node", "src/index.js"]