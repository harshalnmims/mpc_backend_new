import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { patentDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { number } from 'zod';


export const getpatentSubmission = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
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

export const insertPatentSubmissionModel = async(patentData : patentDetails,username:string) => {
    console.log('patentData ===>>>>>', patentData)
    
    const data = await sql`SELECT * FROM insert_patent_grant(${JSON.parse(JSON.stringify(patentData))}, ${username});`;
    return data;

} 


export const updatePatentSubmissionModel = async(updatePatentData : patentDetails,username:string) => {
    console.log('updatePatentData ===>>>>>', updatePatentData)
    
    const data = await sql`SELECT * FROM upsert_patent_grant(${JSON.parse(JSON.stringify(updatePatentData))},  ${username});`;
    return data;

} 

export const deletePatentSubmissionModel = async(patentId : number,username:string) => {
    console.log('patentId in  models  ====>>>>>>', patentId);
    
    const data = await sql`UPDATE patent_submission_grant SET active = false,modified_date=now(),modified_by= ${username} WHERE id = ${patentId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }


}



