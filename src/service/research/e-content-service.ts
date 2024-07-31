import { getLogger } from '$config/logger-context';
import { insertEContent, updateEContent, deleteEContent , eContentPaginateModel ,
    eContentViewModel
} from "$model/econtent-model";
import { paginationDefaultType } from 'types/db.default';
import { EContent } from "types/research.types";

export const insertEContentService = async (eContent: EContent,username :string) => {

    const data = await insertEContent(eContent,username);
    return data;
}

export const updateEContentService = async (eContent: EContent, username: string) => {
   
    const eContentId = eContent.eContentId ? Number( eContent.eContentId ) : 0;
    console.log('e content id ',eContentId)
    const data = await updateEContent(eContent,eContentId,username);
    return data;
}

export const deleteEContentService = async (eContentId: number,username:string) => {
    const logger = getLogger();
    logger.info('DELETE E-CONTENT SERVICES');
    const data = await deleteEContent(eContentId,username);
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