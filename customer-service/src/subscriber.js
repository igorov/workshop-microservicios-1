import { PubSub } from '@google-cloud/pubsub';
import * as repository from './repository.js';
import { publishOK, publishError } from './publisher.js';

const subscriberOrder = process.env.SUBS_ORDER;

const clientPubSub = new PubSub();
const subscription = clientPubSub.subscription(subscriberOrder);

const messageHandler = async (message) => {
    try {
        // Procesa el mensaje recibido
        const data = message.data.toString();
        var msg = JSON.parse(data);
        console.log(`Mensaje recibido: ${data}`);

        const result = await repository.getById(msg.cliente);

        if(result.rowCount === 0) {
            console.log("No se encontró customer, se termina el proceso");
            return;
        }
        const customer = result.rows[0];

        if(msg.monto <= customer.saldo) {
            customer.saldo = customer.saldo - msg.monto;
            await repository.update(customer, customer.id);
            publishOK(msg.orden);
        } else {
            publishError(msg.orden);
        }

        // Marca el mensaje como procesado
        message.ack();
    } catch (error) {
        console.error(`Error en la consulta ${error}`)
        message.nack();
    }
};

export const startSubscriber = () => {
    subscription.on('message', messageHandler);
}
