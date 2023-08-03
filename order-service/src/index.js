import express from 'express'
import * as repository from './repository.js';
import { connectToDatabase, checkConnection } from './database.js';
import { publishOrder } from './publisher.js';
import { startSubscriber } from './subscriber.js';

// Express
const app = express();
app.use(express.json());

// Conexion a la BD
await connectToDatabase();

// Endpoints
app.get('/liveness', async (_req, res) => {
    res.status(200).json({ status: 'OK' });
})

app.get('/readiness', async (_req, res) => {
    const isConnected = checkConnection();
    return Promise.resolve(isConnected);
})

/**
 * Obtener las ordenes
 */
app.get('/orders', async (_req, res) => {
    try {
        const result = await repository.getAll();
        return res.send(result.rows)
    } catch (error) {
        console.error(`Error en la consulta ${error}`)
        res.status(500).send('Error interno del servidor');
    }
})

/**
 * Obtener Orden por ID
 */
app.get('/orders/:id', async (_req, res) => {
    const id = _req.params.id;
    try {
        const result = await repository.getById(id);
        return res.send(result.rows[0])
    } catch (error) {
        console.error(`Error en la consulta ${error}`)
        res.status(500).send('Error interno del servidor');
    }

})

/**
 * Crear una orden
 */
app.post('/orders', async (_req, res) => {
    const order = _req.body;
    let idCreado;
    try {
        const idCreado = await repository.create(order);
        await publishOrder(idCreado, order.cliente, order.monto);
        res.status(201).json({ status: 'OK', message: `Recurso creado correctamente: ID=${idCreado}` });
    } catch (error) {
        console.error(`Error en la insercion del registro: ${error}`)
        res.status(500).send('Error interno del servidor');
    }
})

/**
 * Eliminar órdenes
 */
app.delete('/orders/:id', async (_req, res) => {
    const id = _req.params.id;
    try {
        await repository.deleteCustomer(id);
        res.status(200).json({ status: 'OK', message: 'Recurso eliminado correctamente' });
    } catch (error) {
        console.log(`Error en la consulta ${error}`)
        res.status(500).send('Error interno del servidor');
    }
})

/**
 * Actualizar una orden
 */
app.put('/orders/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await repository.update(req.body, id);
        res.status(200).json({ status: 'OK', message: 'Recurso modificado correctamente' });
    } catch (error) {
        console.error(`Error en la consulta ${error}`)
        res.status(500).send('Error interno del servidor');
    }
});

// Iniciar la suscripcion al topico
startSubscriber();

const port = process.env.PORT | 8080
app.listen(port, () => console.log('listening ... puerto:', port))