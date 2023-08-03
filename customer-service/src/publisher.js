import { PubSub } from '@google-cloud/pubsub';

const topicCustomer = process.env.TOPIC_CUSTOMER;

// Cliente del topic
const clientPubSub = new PubSub();

export const publishOK = id_orden => {
    send_mesage(id_orden, "OK");
}

export const publishError = id_orden => {
    send_mesage(id_orden, "ERROR");
}

const send_mesage = async (id_orden, result) => {
    const msg = {
        orden: id_orden,
        result
    }

    //const dataBuffer = Buffer.from(msg);
    const dataBuffer = Buffer.from(JSON.stringify(msg));
    console.log(`Mensaje: ${JSON.stringify(msg)}`);
    const messageId = await clientPubSub
        .topic(topicCustomer)
        .publishMessage({ data: dataBuffer });

    console.log(`Mensaje enviado, messageId=${messageId}`);
}