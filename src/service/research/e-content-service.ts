import { getLogger } from '$config/logger-context';
import { insertEContent, updateEContent, deleteEContent , eContentPaginateModel ,
    eContentViewModel
} from "$model/econtent-model";
import { paginationDefaultType } from 'types/db.default';
import { EContent } from "types/research.types";

export const insertEContentService = async (eContent: EContent) => {

    const data = await insertEContent(eContent);
    return data;
}

export const updateEContentService = async (eContent: EContent) => {
   
    const eContentId = eContent.eContentId ? Number( eContent.eContentId ) : 0;
    console.log('e content id ',eContentId)
    const data = await updateEContent(eContent,eContentId);
    return data;
}

export const deleteEContentService = async (eContentId: number) => {
    const logger = getLogger();
    logger.info('DELETE E-CONTENT SERVICES');
    const data = await deleteEContent(eContentId);
    return data;
}

export const eContentPaginateService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
   
 
    const data = await eContentPaginateModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };


 export const eContentViewService = async (eContentId : number) => {
    const data = await eContentViewModel(eContentId);
    return data;
 }