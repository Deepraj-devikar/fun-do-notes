import { createClient } from 'redis';

export const redisClient = createClient({
    port: 6379,
    host: 'redis'
});

const redis = async () => {
    try {
        await redisClient.connect();
        console.log("REDIS CLIENT CONNECTION ESTABLISHED...");
    } catch (error) {
        console.log(error);
    }
}

export default redis;