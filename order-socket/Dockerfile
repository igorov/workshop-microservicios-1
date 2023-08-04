# Establecer la imagen base de Go
FROM golang:1.20-alpine3.17 AS builder

ARG APP_DIR=/order-socket

# Crear el directorio de trabajo
WORKDIR ${APP_DIR}

# Copiar los archivos del proyecto al contenedor
COPY . .

# Compilar el proyecto
RUN go build -o socket

# Imagen base final
FROM golang:1.20-alpine3.17

ARG APP_DIR=/order-socket

# Crear el directorio de trabajo
WORKDIR ${APP_DIR}

# Copiar el binario compilado desde el builder
COPY --from=builder ${APP_DIR}/socket .

# Exponer el puerto 8080
EXPOSE 8080

# Iniciar la aplicación Go
CMD ["./socket"]