import { client } from './database.js';

const tableDB = 'orders_100'//process.env.DB_TABLE;

export const getAll = async () => {
    const result = await client.query(`SELECT * FROM ${tableDB}`);
    console.log(`listando órdenes, cantidad: ${result.rowCount}`)

    return result;
}

export const getById = async (id) => {
    const query = `SELECT * FROM ${tableDB} WHERE id = $1`;
    const values = [id];
    const result = await client.query(query, values);
    console.log(`Orden obtenida con id ${id}`)

    return result;
}

export const create = async (order) => {
    const query = `INSERT INTO ${tableDB}(descripcion, monto, id_cliente) VALUES ($1, $2, $3) RETURNING id`;
    const values = [order.descripcion, order.monto, order.cliente];

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

export const update = async (order, id) => {
    const query = `UPDATE ${tableDB} SET descripcion=$1, monto=$2, id_cliente=$3 WHERE id=$4`;
    const values = [order.descripcion, order.monto, order.cliente, id];

    await client.query(query, values)
    console.log(`Recurso ${id} modificado`);
}

export const changeState = async (id, estado) => {
    const query = `UPDATE ${tableDB} SET estado=$1 WHERE id=$2`;
    const values = [estado, id];

    await client.query(query, values)
    console.log(`Se cambió el estado de la orden ${id} a ${estado}`);
}