import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { EditedBookPublicationDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import editedbookRoutes from '$routes/research-routes/edited-book-routes';

export const getEditedBookPublicationModels = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await infiniteScrollQueryBuilder<Session>({
       baseQuery: `select distinct concat(pu.first_name,' ',pu.last_name) AS full_name, pu.id as user_lid, pu.username 
                       from mpc_user_role mur 
                      INNER JOIN user_session_info usi on usi.user_lid = mur.user_lid 
                      INNER JOIN mpc_role mr ON mr.id = mur.mpc_role_lid
                      INNER JOIN public.user pu on pu.id = usi.user_lid
                      WHERE mr.abbr = 'ca' `,
 
       filters: {
          'usi.program_lid': filters.programLid,
          'usi.session_lid': filters.sessionLid,
          'usi.subject_lid': filters.subjectLid,
       },
       cursor: {
          column: 'pu.id',
          value: Number(filters.cursor)
       },
       limit: limit.toString(),
       search: search || '',
       searchColumns: ['pu.username', 'pu.first_name', 'pu.last_name'],
       sort: {
          column: sort || 'pu.id',
          order: order || 'desc',
       },
    });
 
    return data;
 };


export const insertEditedBookPublicationModel = async (editedBookPublicationData: EditedBookPublicationDetails,username:string) => {
    console.log('editedBookPublicationData ===>>>>>', editedBookPublicationData)
    
    const data = await sql`SELECT * FROM insert_edited_publications(${JSON.parse(JSON.stringify(editedBookPublicationData))}, ${username});`;
    return data;
 }; 

export const updateEditedBookModel = async (updateEditedBookPublicationData: EditedBookPublicationDetails,username:string) => {
    console.log('updateEditedBookPublicationData ===>>>>>', updateEditedBookPublicationData)
    
    const data = await sql`SELECT * FROM upsert_edited_publication(${JSON.parse(JSON.stringify(updateEditedBookPublicationData))}, ${username});`;
    return data;

 }

export const deleteEditedBookModel = async (editedbookId : number,username:string) => {
    console.log('editedbookId models  ====>>>>>>', editedbookId);
    
    const data = await sql`UPDATE edited_book_publication SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${editedbookId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
}

