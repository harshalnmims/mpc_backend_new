import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { seminarDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { number } from 'zod'; 

export const getResearchSeminarModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
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

 export const ResearchSeminarPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await paginationQueryBuilder<Session>({
       baseQuery: `SELECT 
                    r.id,
                    r.publisher,
                    TO_CHAR(r.research_date, 'YYYY-MM-DD') AS research_date,
                    r.journal_name,
					COALESCE(JSON_AGG(DISTINCT rs.school_name), '[]') AS nmims_school,
					COALESCE(JSON_AGG(DISTINCT rc.campus_name), '[]') AS nmims_campus,
                    COALESCE(JSON_AGG(DISTINCT md.name), '[]') AS nmims_authors
                FROM research_seminar r
				INNER JOIN research_seminar_school rs ON rs.research_seminar_lid = r.id
				INNER JOIN research_seminar_campus rc ON rc.research_seminar_lid = r.id
                INNER JOIN research_seminar_authors ra ON ra.research_seminar_lid = r.id
                INNER JOIN master_input_data md ON md.id = ra.author_lid 
                WHERE r.active = TRUE AND ra.active = TRUE AND md.active = TRUE AND rs.active = TRUE AND rc.active = TRUE
                GROUP BY r.id `,
 
       filters: {
        //   'usi.program_lid': filters.programLid,
        //   'usi.session_lid': filters.sessionLid,
        //   'usi.subject_lid': filters.subjectLid,
       },
        page : page,
        pageSize: 10 ,
        search: search || '',
        searchColumns: ['r.publisher', 'research_date', 'r.journal_name','r.nmims_school','r.nmims_campus','r.nmims_authors'],
        sort: {
          column: sort || 'r.id',
          order: order || 'desc',
       },
    });
 
    return data;
 };


export const insertResearchSeminarModel = async(researchSeminarData : seminarDetails) => {
    console.log('researchSeminarData ===>>>>>', researchSeminarData)
    
    const data = await sql`SELECT * FROM insert_research_seminar(${JSON.parse(JSON.stringify(researchSeminarData))}, '1');`;
    return data;

} 

export const updateResearchSeminarModel = async(updateResearchSeminarData : seminarDetails) => {
    console.log('updateResearchSeminarData ===>>>>>', updateResearchSeminarData)
    
    const data = await sql`SELECT * FROM upsert_research_seminar(${JSON.parse(JSON.stringify(updateResearchSeminarData))}, '1');`;
    return data;

};

export const deleteResearchSeminarModel = async (seminarId : number) => {
    console.log('seminarId in  models  ====>>>>>>', seminarId);
    
    const data = await sql`UPDATE research_seminar SET active = false,modified_date=now(),modified_by='1' WHERE id = ${seminarId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
}