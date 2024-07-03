import { getLogger } from '$config/logger-context';
import { insertIPRModel, updateIPRModel, deleteIPRModel } from '$model/ipr-model';
import { IPRDetails }  from 'types/research.types';


export const insertIPRService = async (iprDetails: IPRDetails) => {
    const logger = getLogger();
    logger.info('INSIDE IPR  SERVICES');
 
    const data = await insertIPRModel(iprDetails);
 
    return data;
}
export const updateIPRService = async (iprDetails: IPRDetails) => {
    const logger = getLogger();
    logger.info('UPDATE IPR SERVICES');
    const data = await updateIPRModel(iprDetails);

    return data;
}
export const deleteIPRService = async (iprId: number) => {
    const logger = getLogger();
    logger.info('DELETE IPR SERVICES');
    const data = await deleteIPRModel(iprId);
    return data;
}