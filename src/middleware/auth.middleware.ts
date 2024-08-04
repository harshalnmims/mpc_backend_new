import { deleteRedisData, getRedisData, setRedisData } from '$utils/db/redis';
import { serverFetch } from '$utils/serverFetch/fetch';
import {NextFunction, Request,Response} from 'express'

export const validateUserSession = async (req:Request,res:Response,next:NextFunction) => {
    
    console.log('user cookies ',req.cookies.user_id)
    // const userId = req.cookies.user_id;
      const { user_id: cookieUserId } = req.cookies;
      const { user_id: headerUserId } = req.headers;
      const userId = cookieUserId || headerUserId;

      // const userId = undefined;
      console.log('userId ',userId)

    if(!userId || userId === undefined){
      return res.status(401).json({status:401,message:'Invalid Request'})
    }

    let data = await getRedisData(userId);

    if(data.status === 401){
        return res.status(401).json({status:401,message:'Invalid Request'})
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

      if(status === 500){
        return res.status(401).json({status:401,message:'Session Timeout, Kindly Login!'})
      }

      if(status !== 200) {
        return res.status(401).json({status:401,message:'Session Timeout, Kindly Login!'})    
      }

      const {accesstoken, refreshtoken} = headers;

      data = {...data, accesstoken: accesstoken, refreshtoken: refreshtoken}
      await setRedisData(userId, data);
      console.log('username ',data.username)
      res.locals.username = data.username;
      next()


}

export const handleLogout =  async (req:Request,res:Response,next:NextFunction) => {
  const userId = req.cookies.user_id;
  const userSession = await getRedisData(userId);

  const userName = userSession.username;
  const { status, headers, body }  = await serverFetch('https://portal.svkm.ac.in/api-gateway/auth/mobile/auth/logout', {
    method: 'POST',
    data : JSON.stringify(userName),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const userData = await deleteRedisData(userId);
  if(userData.status === 200){
    res.clearCookie('session');
    return res.status(200).json({status:200,message:'Logged Out Successfully !'})
  }

  return res.status(401).json({status:200,message:'Failed To Logout !'})

}