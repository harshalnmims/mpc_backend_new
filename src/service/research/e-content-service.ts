import { getLogger } from '$config/logger-context';
import { insertEContent, updateEContent, deleteEContent } from "$model/econtent-model";
import { EContent } from "types/research.types";

export const insertEContentService = async (eContent: EContent) => {
    const logger = getLogger();
    logger.info('INSIDE E-CONTENT SERVICES');

    const data = await insertEContent(eContent);
    return data;
}

export const updateEContentService = async (eContent: EContent) => {
    const logger = getLogger();
    logger.info('UPDATE E-CONTENT SERVICES');
    const data = await updateEContent(eContent);

    return data;
}

export const deleteEContentService = async (eContentId: number) => {
    const logger = getLogger();
    logger.info('DELETE E-CONTENT SERVICES');
    const data = await deleteEContent(eContentId);
    return data;
}