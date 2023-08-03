import { client } from './database.js';

const tableDB = process.env.DB_TABLE;

export const getAll = async () => {
    const result = await client.query(`SELECT * FROM ${tableDB}`);
    console.log(`listando clientes, cantidad: ${result.rowCount}`)

    return result;
}

export const getById = async (id) => {
    const query = `SELECT * FROM ${tableDB} WHERE id = $1`;
    const values = [id];
    const result = await client.query(query, values);
    console.log(`Clientes obtenidos con id ${id}: ${result.rowCount}`)

    return result;
}

export const create = async (customer) => {
    const query = `INSERT INTO ${tableDB}(nombre, saldo, correo) VALUES ($1, $2, $3) RETURNING id`;
    const values = [customer.nombre, customer.saldo, customer.correo];

    const result = await client.query(query, values)
    const idCreado = result.rows[0].id;
    console.log(`Recurso creado con ID=${idCreado}`);

    return idCreado;
}

export const deleteCustomer = async (id) => {
    const query = `DELETE FROM ${tableDB} WHERE id = $1`;
    const values = [id];

    await client.query(query, values)
    console.log(`Recurso ${id} eliminado`);
}

export const update = async (customer, id) => {
    const query = `UPDATE ${tableDB} SET nombre=$1, saldo=$2, correo=$3 WHERE id=$4`;
    const values = [customer.nombre, customer.saldo, customer.correo, id]; // Valores a insertar en la consulta

    await client.query(query, values)
    console.log(`Recurso ${id} modificado`);
}