import { PubSub } from '@google-cloud/pubsub';

// variables de entorno
const topicOrder = process.env.TOPIC_ORDER;

// Cliente del topic
const clientPubSub = new PubSub();

export const publishOrder = async (id_orden, id_cliente, monto) => {
    const msg = {
        orden: id_orden,
        cliente: id_cliente,
        monto
    }

    //const dataBuffer = Buffer.from(msg);
    const dataBuffer = Buffer.from(JSON.stringify(msg));
    console.log(`Mensaje: ${JSON.stringify(msg)}`);
    const messageId = await clientPubSub
        .topic(topicOrder)
        .publishMessage({ data: dataBuffer });

    console.log(`Mensaje enviado, messageId=${messageId}`);
}