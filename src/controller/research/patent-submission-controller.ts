import { getLogger } from '$config/logger-context';
import {
    getBookPatentService, insertPatentSubmissionService, updatePatentSubmissionService,
    deletePatentSubmissionService, PatentRenderService, patentEditViewService, viewPatentService,
    patentDownloadFilesService
   } from '$service/research/patent-submission-service';
import { Request, Response, NextFunction } from 'express';

import { validateWithZod } from '$middleware/validation.middleware';

import { filesArraySchema } from '$validations/research.valid';
import { patentDetails } from '$validations/research.valid';

export const getpatentSubmissionData = async (req : Request,res : Response , next : NextFunction) => {

    const {

           page = 1,

           limit = 10,

           sort = '',

           order = 'desc',

           search = '',

           ...filters

        } = { ...req.body, ...req.params, ...req.query };

 

    const data = await getBookPatentService({
        page ,
        limit,
        search,  
        sort,
        order,
        filters,

     });


     console.log('data responce in controller ====>>>>>', data)
     return res.status(200).json(data); 

   

  } 



export const patentRenderList = async (req : Request , res : Response , next  : NextFunction) => {

    const data = await PatentRenderService();

    console.log('journal data ',JSON.stringify(data));

    return res.status(200).json(data);

  };


export const insertPatentSubmissionForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();


    let patentData = JSON.parse(req.body.patent_data);
    console.log('patentData  ===>>>>>', patentData)
    let data;
    let files = req.files;
    console.log('files ===>>>>>', files);
    let result = validateWithZod(patentDetails,patentData);
    let fileResult = validateWithZod(filesArraySchema, files);
    console.log('result ===>>>>>>', result);
    if(result.success && fileResult.success){
        data = await insertPatentSubmissionService(patentData, files);
    }


    return res.status(200).json(data);



    

}


export const patentEditViewForm = async(req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    const id =  req.query.id;
    const patentId = Number(id);

    const data = await patentEditViewService(patentId);

    console.log('data response in controller ====>>>>', data)
    return res.status(200).json(data);
  }

export const updatePatentSubmissionForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();


    let updatePatentData = JSON.parse(req.body.update_patent_data);
    let patentId = JSON.parse(req.body.patent_id);
    console.log('iprData ankit ===>>>>>', updatePatentData);
    console.log('patentId  ===>>>>>', patentId)
    let data;
    let files = req.files;
    console.log('files ===>>>>>', files);
    let result = validateWithZod(patentDetails,updatePatentData);
    let fileResult = validateWithZod(filesArraySchema, files);
    console.log('result ===>>>>>>', result);
    if(result.success && fileResult.success){
        data = await updatePatentSubmissionService(patentId, updatePatentData, files);
    }

    console.log('data responce in controller ===>>>>', data)

    return res.status(200).json(data);

  

}

export const viewPatentForm = async (req: Request, res: Response, next: NextFunction) => {

    const logger = getLogger();

    const id =  req.query.id;
    const patentId = Number(id);
    console.log('patentId ===>>>>', patentId)
    const data = await viewPatentService(patentId);

    console.log('data respoinse in controller ===>>>>>', data);

    return res.status(200).json(data);

}


export const deletePatentSubmissionForm = async(req : Request, res : Response, next : NextFunction) => {
    const logger = getLogger();
    const id =  req.query.id;
    const patentId = Number(id);
    console.log('patentId ===>>>>', patentId)
    

    const data = await deletePatentSubmissionService(patentId);

    console.log(' data response in case of delete controller ===>>>>', data);

    return res.status(200).json(data)

} 


export const downloadPatentFiles = async (req : Request , res : Response , next  : NextFunction) => {

    const patentId = req.query.id;
    console.log('patentId ',patentId)
 
     await patentDownloadFilesService(Number(patentId), req, res);
 
  }