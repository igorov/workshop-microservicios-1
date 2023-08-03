import pkg from 'pg';
const { Client } = pkg;

// variables de entorno
const hostDB = process.env.DB_HOST;
const userDB = process.env.DB_USER;
const passDB = process.env.DB_PASS;
const nameDB = process.env.DB_NAME;

// Conexión a la BD
export const client = new Client({
    user: userDB,
    host: hostDB,
    database: nameDB,
    password: passDB,
    port: 5432, // Puerto por defecto para PostgreSQL
});

export const connectToDatabase = async () => {
    client.connect()
        .then(() => console.log('Conexión exitosa a la base de datos'))
        .catch(err => console.error('Error al conectar a la base de datos', err));
}