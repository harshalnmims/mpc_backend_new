import { getRedisData, setRedisData } from '$utils/db/redis';
import { serverFetch } from '$utils/serverFetch/fetch';
import {NextFunction, Request,Response} from 'express'

export const validateUserSession = async (req:Request,res:Response,next:NextFunction) => {
    
    console.log('user cookies ',req.cookies)
    // const userId = req.cookies.user_id;
    const userId = "hjbfhwrf";


    if(!userId || userId === undefined){
      return res.status(401).json({status:401,message:'Invalid Cookie'})
    }

    let data = await getRedisData(userId);

    if(data.status === 401){
        return res.status(401).json({status:401,message:'Failed To Fetch Data'})
    }

    const { status, headers, body }  = await serverFetch('https://portal.svkm.ac.in/api-gateway/auth/mobile/auth/validate-route', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...data
        }
      });
      console.log({
          status,
          headers,
          body
      });

      if(status !== 200) {
        return res.status(401).json({status:401,message:'Unauthorized Access !'})    
      }

      const {accesstoken, refreshtoken} = headers;

      data = {...data, accesstoken: accesstoken, refreshtoken: refreshtoken}
      await setRedisData(userId, data);
      const userName = data.username;
      console.log("USERNAME IN MIDDLEWARE : ", userName);
      req.body.username = userName;
      next()

}