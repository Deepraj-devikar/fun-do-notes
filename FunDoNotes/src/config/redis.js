import { createClient } from 'redis';
import logger from './logger';

export const redisClient = createClient({
    port: 6379,
    host: 'redis'
});

let redisConnectionEstablished = false;

const redis = async () => {
    try {
        await redisClient.connect();
        redisConnectionEstablished = true;
        logger.info('Connected to the redis client.');
    } catch (error) {
        logger.error('Could not connect to the redis client.', error);
    }
}

export { redisConnectionEstablished };

export default redis;