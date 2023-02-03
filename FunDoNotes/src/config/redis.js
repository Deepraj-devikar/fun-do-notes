import { createClient } from 'redis';

export const redisClient = createClient({
    port: 6379,
    host: 'redis'
});

let redisConnectionEstablished = false;

const redis = async () => {
    try {
        await redisClient.connect();
        redisConnectionEstablished = true;
        console.log("REDIS CLIENT CONNECTION ESTABLISHED...");
    } catch (error) {
        console.log(error);
    }
}

export { redisConnectionEstablished };

export default redis;