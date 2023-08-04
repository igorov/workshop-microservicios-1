import express from 'express'
import cors from 'cors';
import * as repository from './repository.js';
import { connectToDatabase } from './database.js';
import { startSubscriber } from './subscriber.js';

// Express
const app = express();
app.use(express.json());

// Configura las opciones de CORS
const corsOptions = {
    origin: '*', // Permite el origen para todos
    optionsSuccessStatus: 200 // Algunas versiones de CORS envían un status 204
};

// Aplica el middleware de CORS
app.use(cors(corsOptions));

// Conexion a la BD
await connectToDatabase();

// Endpoints
// Estado de salud
app.get('/liveness', async (_req, res) => {
    res.status(200).json({ status: 'OK' });
})

/**
 * Obtener los clientes
 */
app.get('/customers', async (_req, res) => {
    try {
        const result = await repository.getAll();
        return res.send(result.rows)
    } catch (error) {
        console.error(`Error en la consulta ${error}`)
        res.status(500).send('Error interno del servidor');
    }
})

/**
 * Obtener un cliente por ID
 */
app.get('/customers/:id', async (_req, res) => {
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
 * Crear un cliente
 */
app.post('/customers', async (_req, res) => {
    try {
        const idCreado = await repository.create(_req.body);
        res.status(201).json({ status: 'OK', message: `Recurso creado correctamente: ID=${idCreado}` });
    } catch (error) {
        console.error(`Error en la insercion del registro: ${error}`)
        res.status(500).send('Error interno del servidor');
    }
})

/**
 * Eliminar un cliente
 */
app.delete('/customers/:id', async (_req, res) => {
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
 * Actualizar un cliente
 */
app.put('/customers/:id', async (req, res) => {
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