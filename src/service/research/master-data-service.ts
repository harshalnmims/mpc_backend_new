import { getLogger } from '$config/logger-context';
import { 
    masterPaginateModel, masterDataScrollPaginateModel, insertMasterDataModel, masterDataEditViewModel,
    upsertMasterDataModel, viewMasterDataModel, masterDataDelete
 } from '$model/master-data-model';
import { paginationDefaultType } from 'types/db.default';
import {getMasterDatatype, getPatentStatus
} from '$model/master-model';
import {getUploadedFile, uploadFile} from '$middleware/fileupload.middleware'
import { Request,Response } from 'express';
import { downloadFile } from '$middleware/fileupload.middleware';
import { string } from 'zod'; 
import { masterDataDetails, updMasterDetails } from 'types/research.types';


export const getMasterPaginateService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType,username:string) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');
 
    const data = await masterPaginateModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    },username);
 
    return data;
 };  


export const masterDataScrollPaginateService = async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH SERVICES');

   const data = await masterDataScrollPaginateModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
 }
 


export const masterInputTypeService = async () => {
   const masterInputData = await getMasterDatatype();
   const patentStatus = await getPatentStatus();
   console.log('masterData ====>>>>>', masterInputData)
   return {masterInputData, patentStatus}
}

export const insertMasterInputService = async(masterData : masterDataDetails ) => {
   console.log('masterData data value inside servive ===>>>', masterData);
   const data = await insertMasterDataModel(masterData);
   return data

} 


export const masterDataEditViewService = async(masterId : number ) => {
   
   console.log('masterIde inside servive ===>>>', masterId);
   const masterDataInput = await masterDataEditViewModel(masterId);
   const masterDataList = await getMasterDatatype();
   return {masterDataInput, masterDataList}

}


export const upsertMasterInputService = async(masterData : updMasterDetails) => {
   const masterDataArray : any = {
      master_data: {
        ...masterData.master_data,
        master_input_name: masterData.master_data.master_input_name,
        master_type: parseInt(masterData.master_data.master_type.value)
      }
    }; 
   console.log('masterDataArray data value inside servive ===>>>', masterDataArray);
   let masterId = Number(masterDataArray.master_data.master_id);
   console.log('masterId ==>>>>', masterId);

   const data = await upsertMasterDataModel(masterDataArray, masterId);
   return data

} 

export const viewMasterDataService = async(masterId : number) => {
   const data = await viewMasterDataModel(masterId);
   return data;
}

export const deleteMasterDataService = async(masterId : number) => {
   const data = await masterDataDelete(masterId);
   return data;
}



 

