import {
    getMasterPaginateService, masterInputTypeService, masterDataScrollPaginateService, insertMasterInputService,
    masterDataEditViewService,
    upsertMasterInputService, viewMasterDataService, deleteMasterDataService
 } from '$service/research/master-data-service';
 import { getLogger } from '$config/logger-context';
 import { Request, Response, NextFunction } from 'express';
 import { validateWithZod } from '$middleware/validation.middleware';
 import { filesArraySchema, updMasterDetails } from '$validations/research.valid';
 import { masterDataObj } from '$validations/research.valid';
 
 

 export const masterDataPaginate = async (req: Request, res: Response, next: NextFunction) => {
    const {
       page = 1,
 
       limit = 10,
 
       sort = '',
 
       order = 'desc',
 
       search = '',
 
       ...filters
    } = { ...req.body, ...req.params, ...req.query };

    let username = res.locals.username;
 
    const data = await getMasterPaginateService({
       page,
 
       limit,
 
       search,
 
       sort,
 
       order,
 
       filters,
    },username);
 
    console.log('data responce in controller ====>>>>>', data);
 
    return res.status(200).json(data);
 }; 



export const masterDataScrollPaginate = async (req: Request, res: Response, next: NextFunction) => {
   const {
      page = 1,

      limit = 10,

      sort = '',

      order = 'desc',

      search = '',

      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   let username = res.locals.username;

   const data = await masterDataScrollPaginateService({
      page,

      limit,

      search,

      sort,

      order,

      filters,
   },username);

   console.log('data responce in controller ====>>>>>', data);

   return res.status(200).json(data);
};
 
export const renderMasterData = async (req: Request, res: Response, next: NextFunction) => {
    let username = res.locals.username;
    const data = await masterInputTypeService(username);
 
    console.log('master data response', data);

 
    return res.status(200).json(data);
 }; 


export const insertMasterInput = async(req: Request, res: Response, next: NextFunction) => {
   
   let masterData = req.body;
   console.log('masterData ankit ===>>>>>', masterData);
   let data;
   
   let result = validateWithZod(masterDataObj, masterData.master_data[0]);
   let username = res.locals.username;
   console.log('result ===>>>>>>', result);
   if (result.success) {
      data = await insertMasterInputService(masterData,username);
   }
   return res.status(200).json(data);
   
 
} 

export const masterDataEditViewForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const id = req.query.id;
   const masterId = Number(id);

   const data = await masterDataEditViewService(masterId);

   console.log('data response in controller ====>>>>', data);
   return res.status(200).json(data);
};

export const updateMasterInput = async (req: Request, res: Response, next: NextFunction) => {
   const masterData : any = req.body;
   let data;
   let result = validateWithZod(updMasterDetails, masterData.master_data);
   let username = res.locals.username;
   console.log('result ===>>>>>>', result);
   
   if (result.success) {
     data = await upsertMasterInputService(masterData,username);
   }
   return res.status(200).json(data);
} 

export const viewMasterDataForm = async(req: Request, res: Response, next: NextFunction) => {
   const id = req.query.id;
   const masterId = Number(id);
   console.log('masterId ===>>>>', masterId);
   const data = await viewMasterDataService(masterId);

   console.log('data respoinse in controller ===>>>>>', data);

   return res.status(200).json(data);

}

export const deleteMasterDataForm = async(req: Request, res: Response, next: NextFunction) =>  {
   const id = req.query.id;
   const masterId = Number(id);
   console.log('masterId ===>>>>', masterId);
   
   const data = await deleteMasterDataService(masterId);
   console.log('data respoinse in controller ===>>>>>', data);

   return res.status(200).json(data);

}





