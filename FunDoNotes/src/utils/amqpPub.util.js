import * as amqplib from 'amqplib';
import logger from '../config/logger';

/**
 * @param {object} data - data regarding task which should contain task details (name, publishType, functionName, data) and inputs for sending to function
 *      also necessaryly contains publish type in data so according to publish type publisher will set it into queue
 */
export const amqpPublisher = (data) => {
    (async () => {
        const mailQueue = 'mailTasks';
        try{
            const connection = await amqplib.connect('amqp://localhost');
            const channel = await connection.createChannel();
            await channel.assertQueue(mailQueue);

            if (data.publishType == process.env.MAIL_QUEUE) {
                channel.sendToQueue(mailQueue, Buffer.from(JSON.stringify(data)));
                logger.info(`MAIL QUEUE SEND : ${data}`);
            }
        } catch(error){
            logger.error("Error: in amqp publisher");
        }
    })();
}
