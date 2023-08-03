import { PubSub } from '@google-cloud/pubsub';
import * as repository from './repository.js';

const subscriberCustomer = process.env.SUBS_CUSTOMER;

const clientPubSub = new PubSub();
const subscription = clientPubSub.subscription(subscriberCustomer);

const messageHandler = async (message) => {
    try {
        // Procesa el mensaje recibido
        const data = message.data.toString();
        var msg = JSON.parse(data);
        console.log(`Mensaje recibido: ${data}`);

        if(msg.result === 'OK') {
            await repository.changeState(msg.orden, 'a');
        } else {
            await repository.changeState(msg.orden, 'd');
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
