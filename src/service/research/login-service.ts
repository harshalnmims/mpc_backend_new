import { serverFetch } from "$utils/serverFetch/fetch";
import { setRedisData } from "$utils/db/redis";
import { Request, Response } from 'express';
import { unauthorizedAccessError } from "$utils/error/error";
import { CustomError } from "$utils/error/customError";


export const loginService = async (username:string,password:string,req : Request,res : Response) => {
    let obj = {username,password,rememberMe:false}

    const result = await serverFetch('https://portal.svkm.ac.in/api-gateway/auth/mobile/auth/authenticate',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(obj),
    })
    console.log('login result ',result)

    if(result.status === 500){
      throw new CustomError({
        moduleName: 'authenticate',
        message:'Failed To Fetch Data !',
        status: 500,
     });
    }

    if(result.status !== 200){
      unauthorizedAccessError('loginFailed','Invalid Credentials !')
    }  
      const redisData = {
        username: username,
        accesstoken: result.headers.accesstoken,
        refreshtoken: result.headers.refreshtoken,
        devicetoken: result.headers.devicetoken,
        sessiontoken: result.headers.sessiontoken
      } 

      await setRedisData(username,redisData);
      
      res.cookie('username', username, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, 
      });
   
    return {status:200,message:'LoggedIn Successfully !'}
}