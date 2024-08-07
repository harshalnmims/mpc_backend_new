import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { researchAwardDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { number } from 'zod'; 
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';

export const getResearchAwardModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
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

//  export const researchAwardPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
//     console.log('filter ',JSON.stringify(filters) , { page , limit, sort, order, search, filters });
 
//     const data = await paginationQueryBuilder<Session>({
//        baseQuery: `SELECT 
//                 r.id,
//                 COALESCE(JSON_AGG(DISTINCT ras.school_name), '[]') AS nmims_school,
// 				COALESCE(JSON_AGG(DISTINCT rac.campus_name), '[]') AS nmims_campus, 
//                 COALESCE(r.faculty_name, 'No Data Filled!') AS faculty_name,
//                 COALESCE(r.award_name, 'No Data Filled!') AS award_name,
//                 COALESCE(r.award_details, 'No Data Filled!') AS award_details,
//                 COALESCE(r.award_organization, 'No Data Filled!') AS award_organization
//                 FROM research_award r
//                 INNER JOIN research_award_school ras ON ras.research_award_lid = r.id
//                 INNER JOIN research_award_campus rac ON ras.research_award_lid = r.id
//                 WHERE r.active = TRUE AND rac.active = TRUE AND ras.active = TRUE
//                 GROUP BY r.id
//  `,
 
//        filters: {
//           // 'usi.program_lid': filters.programLid,
//           // 'usi.session_lid': filters.sessionLid,
//           // 'usi.subject_lid': filters.subjectLid,
//        },
//        page : page,
//        pageSize: 10 ,
//        search: search || '',
//        searchColumns: ['faculty_name','award_name','award_details','award_organization','nmims_school','nmims_campus'],
//        sort: {
//           column: sort || 'r.id',
//           order: order || 'desc',
//        },
//     });
 
//     return data;
//  };
 
export const researchAwardPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType,username:string) => {
    console.log('filter ',JSON.stringify(filters) , { page , limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilderWithPlaceholder<Session>({
       baseQuery: `SELECT 
                r.id,
                COALESCE(JSON_AGG(DISTINCT ras.school_name), '[]') AS nmims_school,
				COALESCE(JSON_AGG(DISTINCT rac.campus_name), '[]') AS nmims_campus, 
                COALESCE(r.faculty_name, 'No Data Filled!') AS faculty_name,
                COALESCE(r.award_name, 'No Data Filled!') AS award_name,
                COALESCE(r.award_details, 'No Data Filled!') AS award_details,
                COALESCE(r.award_organization, 'No Data Filled!') AS award_organization,
                r.created_by,
                CASE WHEN fs.status_lid = 3 THEN (SELECT abbr FROM status WHERE abbr = 're')  
                    ELSE CASE 
                        WHEN fs.status_lid = 2 AND fs.level_lid = 2 THEN (SELECT abbr FROM status WHERE abbr = 'cp') 
                        ELSE (SELECT abbr FROM status WHERE abbr = 'pd')
                    END
                END AS status,
                fs.id AS form_status_lid
                FROM research_award r
                INNER JOIN research_award_school ras ON ras.research_award_lid = r.id
                INNER JOIN research_award_campus rac ON ras.research_award_lid = r.id
                LEFT JOIN form_status fs ON fs.id = r.form_status_lid
                WHERE r.active = TRUE AND rac.active = TRUE AND ras.active = TRUE
                AND r.created_by = '${username}'
                {{whereClause}}
                GROUP BY r.id, fs.id ORDER BY r.id desc
 `,
 
 placeholders: [
    {
        placeholder: '{{whereClause}}',
        filters: {
        //     'pp.program_name': filters.programName,
        //     'ss.subject_name': filters.subjectName,
        //     'ms.abbr': filters.abbr
        },
        searchColumns: ['r.faculty_name','r.award_name','r.award_details','r.award_organization','ras.school_name','rac.campus_name'],
        // orderBy: {
        // column: sort || 'r.id',
        // order: order || 'desc',
        // },
    }
],
       page : page,
       pageSize: 10 ,
       search: search || '',
    //    searchColumns: ['faculty_name','award_name','award_details','award_organization','nmims_school','nmims_campus'],
    //    sort: {
    //       column: sort || 'r.id',
    //       order: order || 'desc',
    //    },
    });
 
    return data;
 };

export const insertResearchAwardModel = async(researchAwardData : researchAwardDetails,username:string) => {
    console.log('researchAwardData ===>>>>>', researchAwardData)
    
    const data = await sql`SELECT * FROM insert_research_award(${JSON.parse(JSON.stringify(researchAwardData))}, ${username});`;
    return data;

} 

export const updateResearchAwardModel = async(updateResearchAwardData : researchAwardDetails,username:string) => {
    
    const data = await sql`SELECT * FROM upsert_research_award(${JSON.parse(JSON.stringify(updateResearchAwardData))}, ${username});`;
    return data;

} 

export const deleteResearchAwardModel = async(awardId : number,username:string) => {
    console.log('awardId in  models  ====>>>>>>', awardId);
    
    const data = await sql`UPDATE research_award SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${awardId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }


}

export const researchAwardViewModel = async(awardId : number) => {
    console.log('awardId in  models  ====>>>>>>', awardId);
    
    const data = await sql`SELECT 
                    r.id,
                    COALESCE(r.faculty_name, 'No Data') AS faculty_name,
                    COALESCE(r.award_name, 'No Data') AS award_name,
                    COALESCE(r.award_details, 'No Data') AS award_details,
                    COALESCE(r.award_place, 'No Data') AS award_place,
                    COALESCE(r.award_organization, 'No Data') AS award_organization,
					r.award_category,
				    COALESCE(r.award_date, NULL) AS award_date,
					COALESCE(JSON_AGG(DISTINCT rs.school_name), '[]') AS nmims_school,
					COALESCE(JSON_AGG(DISTINCT rc.campus_name), '[]') AS nmims_campus,
					COALESCE(JSON_AGG(DISTINCT rsd.filename), '[]') AS supporting_documents
                FROM research_award r
				INNER JOIN research_award_school rs ON rs.research_award_lid = r.id
				INNER JOIN research_award_campus rc ON rc.research_award_lid = r.id
				INNER JOIN research_award_documents rsd ON rsd.research_award_lid = r.id
                WHERE r.active = TRUE  AND rc.active = TRUE AND rsd.active = TRUE AND r.id = ${awardId}
                GROUP BY r.id`;
    return data


}

export const researchAwardUpdateViewModel = async(awardId : number) => {
    console.log('awardId in  models  ====>>>>>>', awardId);
    
    const data = await sql`SELECT 
                    r.id,
                    COALESCE(r.faculty_name, 'No Data') AS faculty_name,
                    COALESCE(r.award_name, 'No Data') AS award_name,
                    COALESCE(r.award_details, 'No Data') AS award_details,
                    COALESCE(r.award_place, 'No Data') AS award_place,
                    COALESCE(r.award_organization, 'No Data') AS award_organization,
					r.award_category,
				    COALESCE(r.award_date, NULL) AS award_date,
					COALESCE(JSON_AGG(DISTINCT rs.school_name), '[]'::json) AS nmims_school,
					COALESCE(JSON_AGG(DISTINCT rc.campus_name), '[]'::json) AS nmims_campus
                FROM research_award r
				INNER JOIN research_award_school rs ON rs.research_award_lid = r.id
				INNER JOIN research_award_campus rc ON rc.research_award_lid = r.id
                WHERE r.active = TRUE  AND rc.active = TRUE AND  r.id = ${awardId}
                GROUP BY r.id`;
    return data


}

export const awardFiles = async (awardId : number) => {
    const data = await sql`SELECT * FROM research_award_documents WHERE research_award_lid=${awardId} AND active= TRUE`;
    return data;
} 
