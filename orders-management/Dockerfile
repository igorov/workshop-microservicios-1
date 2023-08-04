FROM node:18.16.1-alpine3.17

 # Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
 # Copiar el archivo package.json y package-lock.json (o yarn.lock)
COPY package*.json ./
 # Instalar las dependencias del proyecto
RUN npm ci
 # Copiar el resto de los archivos del proyecto
COPY . .
 # Compilar el proyecto
RUN npm run build
 # Exponer el puerto en el que se ejecuta la aplicación de Next.js
EXPOSE 3000
 # Iniciar la aplicación de Next.js
CMD ["npm", "start"]