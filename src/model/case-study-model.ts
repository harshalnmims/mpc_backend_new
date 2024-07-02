import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { caseStudyDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { number } from 'zod'; 

export const getCaseStudyModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
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


export const insertCaseStudyModel = async(caseStudyData : caseStudyDetails) => {
    console.log('caseStudyData ===>>>>>', caseStudyData)
    
    const data = await sql`SELECT * FROM insert_case_study(${JSON.parse(JSON.stringify(caseStudyData))}, '1');`;
    return data;

};

export const updateCaseStudyModel = async(updateCaseStudyData : caseStudyDetails) => {
    console.log('updateCaseStudyData ===>>>>>', updateCaseStudyData)
    
    const data = await sql`SELECT * FROM upsert_case_study(${JSON.parse(JSON.stringify(updateCaseStudyData))}, '1');`;
    return data;

};

export const deleteCaseStudyModel = async (caseStudyId : number) => {
    console.log('caseStudyId in  models  ====>>>>>>', caseStudyId);
    
    const data = await sql`UPDATE case_study SET active = false,modified_date=now(),modified_by='1' WHERE id = ${caseStudyId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
};

