import { getLogger } from '$config/logger-context';
import { insertIPRModel, updateIPRModel, deleteIPRModel } from '$model/ipr-model';
import { IPRDetails }  from 'types/research.types';


export const insertIPRService = async (iprDetails: IPRDetails,username:string) => {
    const logger = getLogger();
    logger.info('INSIDE IPR  SERVICES');
 
    const data = await insertIPRModel(iprDetails,username);
 
    return data;
}
export const updateIPRService = async (iprDetails: IPRDetails,username:string) => {
    const logger = getLogger();
    logger.info('UPDATE IPR SERVICES');
    const data = await updateIPRModel(iprDetails,username);

    return data;
}
export const deleteIPRService = async (iprId: number,username:string) => {
    const logger = getLogger();
    logger.info('DELETE IPR SERVICES');
    const data = await deleteIPRModel(iprId,username);
    return data;
}