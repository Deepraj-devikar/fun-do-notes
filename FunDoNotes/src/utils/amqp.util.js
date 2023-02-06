import * as amqplib from 'amqplib';
import { sendMail } from './mail.util';
import logger from '../config/logger';

/**
 * @param {object} data - data regarding task which should contain task details (name, publishType, functionName, data) and inputs for sending to function
 *      also necessaryly contains publish type in data so according to publish type publisher will set it into queue
 */
export const rabbitmqPublisher = (data) => {
    (async () => {
        const queue = 'tasks';
        const mailQueue = 'mailTasks';
        try{
            const connection = await amqplib.connect('amqp://localhost');

            const channel = await connection.createChannel();
            await channel.assertQueue(queue);
            await channel.assertQueue(mailQueue);

            if (data.publishType == process.env.MAIL_QUEUE) {
                channel.sendToQueue(mailQueue, Buffer.from(data));
                logger.info(`MAIL QUEUE : ${data}`);
            } else {
                channel.sendToQueue(queue, Buffer.from(data));
                logger.info(`TASK QUEUE : ${data}`);
            }
        } catch(error){
            logger.error("Error: in amqp publisher");
        }
    })();
}

export const rabbitmqSubscriber = () => {
    (async () => {
        const queue = 'tasks';
        const mailQueue = 'mailTasks';
        try{
            const connection = await amqplib.connect('amqp://localhost');

            const channel = await connection.createChannel();
            await channel.assertQueue(queue);
            await channel.assertQueue(mailQueue);

            channel.consume(queue, (message) => {
                if (message !== null) {
                    console.log(`Recived : ${message.content.toString()}`);
                    channel.ack(message);
                } else {
                    console.log("Consumer cancelled by server");
                }
            });
            channel.consume(mailQueue, (message) => {
                if (message !== null) {
                    console.log(`Recived : MAIL`);
                    sendMail(message.content.data);
                    channel.ack(message);
                } else {
                    console.log("Consumer cancelled by server");
                }
            });
        } catch (error) {
            logger.error("Error: in amqp subscriber launching");
        }
    })();
}
