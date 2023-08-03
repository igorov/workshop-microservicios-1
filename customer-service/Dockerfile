FROM node:18.16.1-alpine3.17

RUN mkdir -p /home/customer

# Exponer en el puerto 8080
EXPOSE 8080

WORKDIR /home/customer

# Copiar el contenido a la carpeta
COPY . /home/customer

CMD ["node", "src/index.js"]