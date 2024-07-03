import { EContent } from 'types/research.types';
import sql from '$config/db';

export const insertEContent = async (eContent: EContent) => {
    const data =  await sql`INSERT INTO e_content_development(faculty_name, module, module_platform, launching_date, document_link, media_link, facilitylist, created_by, modified_by) VALUES (${eContent.faculty_name}, ${eContent.module}, ${eContent.module_platform}, ${eContent.launching_date}, ${eContent.document_link}, ${eContent.media_link}, ${eContent.facility_list}, '1', '1'`;

    return data;
}

export const updateEContent = async (eContent: EContent) => {
    const data = await sql`
        UPDATE e_content_development
        SET
            faculty_name = ${eContent.faculty_name}, module = ${eContent.module},
            module_platform = ${eContent.module_platform}, launching_date = ${eContent.launching_date},
            document_link = ${eContent.document_link}, media_link = ${eContent.media_link},
            facility_list = ${eContent.facility_list}, modified_by = '1'
        WHERE id = ${eContent.eContentId}
    `;
    return data;
}

export const deleteEContent = async (eContentId: number) => {
    const data = await sql`
        UPDATE e_content_development
        SET active = false, modified_date = now(), modified_by = '1'
        WHERE id = ${eContentId}
    `;
    return data;
}

