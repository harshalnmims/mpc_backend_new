import { EContent } from 'types/research.types';
import sql from '$config/db';
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { paginationDefaultType } from 'types/db.default';

export const insertEContent = async (eContent: EContent) => {
    const data =  await sql`INSERT INTO e_content_development(faculty_name, module, module_platform, launching_date, document_link, media_link, facility_list, created_by, modified_by) VALUES (${eContent.faculty_name}, ${eContent.module}, ${eContent.module_platform}, ${eContent.launching_date}, ${eContent.document_link}, ${eContent.media_link}, ${eContent.facility_list}, '1', '1')`;
    return data.count > 0 ? {
        status:200,
        message:'Inserted Successfully !'
    } : {
        status:400,
        message:'Failed To Insert !'
    }
}

export const updateEContent = async (eContent: EContent,eContentId : number) => {

    const data = await sql`
    UPDATE e_content_development
    SET 
      faculty_name = ${eContent.faculty_name}, 
      module = ${eContent.module},
      module_platform = ${eContent.module_platform}, 
      launching_date = ${eContent.launching_date},
      document_link = ${eContent.document_link}, 
      media_link = ${eContent.media_link},
      facility_list = ${eContent.facility_list},
      modified_date=now(),
      modified_by = '1'
      WHERE id = ${eContentId}
  `;
     return data.count > 0 ? 
     {
        status:200,
        message:`Updated Successfully !'`
     }
     :
     {
        status:400,
        message:'Failed To Update !'
     }

 }


export const deleteEContent = async (eContentId: number) => {
    const data = await sql`
        UPDATE e_content_development
        SET active = false, modified_date = now(), modified_by = '1'
        WHERE id = ${eContentId}
    `;
    return data.count > 0 ?
    {
      status : 200,
      message : 'Deleted Successfully !'
    }
    :
    {
      status : 403,
      message : 'Failed to delete !'
    };            }


export const eContentPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
    console.log('filter ',JSON.stringify(filters) , { page , limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilder<Session>({
       baseQuery: `SELECT 
                    id,
                    faculty_name,module,module_platform,document_link,media_link,facility_list
                    FROM e_content_development WHERE active = true
 `,
 
       filters: {
          // 'usi.program_lid': filters.programLid,
          // 'usi.session_lid': filters.sessionLid,
          // 'usi.subject_lid': filters.subjectLid,
       },
       page : page,
       pageSize: 10 ,
       search: search || '',
       searchColumns: ['faculty_name','module','module_platform','document_link','media_link','facility_list'],
       sort: {
          column: sort || 'id',
          order: order || 'desc',
       },
    });
 
    return data;
 };

 export const eContentViewModel = async (eContentId : number) => {
    const data = await sql`SELECT id,faculty_name,module,module_platform,document_link,media_link,facility_list,launching_date
                           FROM e_content_development WHERE id = ${eContentId} AND active = TRUE`;
   return data;           
 }
 
