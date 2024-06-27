import { getLogger } from '$config/logger-context';
import { insertIPRModel } from '$model/insert-ipr-model';
import { IPRDetails }  from 'types/research.types';

export const insertIPRService = async (iprDetails: IPRDetails) => {
    const logger = getLogger();
    logger.info('INSIDE IPR  SERVICES');
 
    const data = await insertIPRModel(iprDetails);
 
    return data;
}