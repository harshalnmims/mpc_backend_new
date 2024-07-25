import redisClient from "$config/redis";

export async function setRedisData(key : any,value : any){
    await redisClient.set(key,JSON.stringify(value));
}