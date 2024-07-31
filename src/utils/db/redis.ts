import redisClient from "$config/redis";

export async function setRedisData(key : any,value : any){
    await redisClient.set(key,JSON.stringify(value));
}

export async function getRedisData(key : any) {
  
    if(key === undefined || !key) {
      return {status:401,message:'Cookie Not Found'}
    }

    const data = await redisClient.get(key);
    if(!data) {
      return {status:401,message:'Invalid Cookie'}
    }

    return JSON.parse(data)
}


export async function deleteRedisData(key : any){
  if(key === undefined || !key) {
    return {status:401,message:'Cookie Not Found'}
  }

  const deleteCookies =  await redisClient.del(key);
  console.log('deleteCookies =====>>>>>', deleteCookies);
  return deleteCookies === 1 ? {
           status : 200,
           message : 'Session deleted'
  } : {
           status : 401,
           message : ' Failed  to session deleted' 
  }
}
