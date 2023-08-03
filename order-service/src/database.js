import pkg from 'pg';
const { Client } = pkg;

// variables de entorno
const hostDB = '34.28.181.0'//process.env.DB_HOST;
const userDB = 'wks_postgres'//process.env.DB_USER;
const passDB = 'Pswd12_'//process.env.DB_PASS;
const nameDB = 'workshop_db'//process.env.DB_NAME;

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

export const checkConnection = async () => {
    try {
        await client.query('SELECT 1');
        return "OK";
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
        throw new Error("ERROR");
    }
}