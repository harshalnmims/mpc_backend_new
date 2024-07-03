import { EContent } from 'types/research.types';
import sql from '$config/db';

export const insertEContent = async (eContent: EContent) => {
    // const data =  await sql`INSERT INTO e_content_development(faculty_name, module, module_platform, launching_date, document_link, media_link, facilitylist, created_by, modified_by) VALUES (${eContent.faculty_name}, ${eContent.module}, ${eContent.module_platform}, ${eContent.launching_date}, ${eContent.document_link}, ${eContent.media_link}, ${eContent.facilitylist}, '1', '1'`;

    return {data:""};
}