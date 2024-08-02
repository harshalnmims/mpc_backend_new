import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { seminarDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { number } from 'zod'; 
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';

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

//  export const ResearchSeminarPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
//     const data = await paginationQueryBuilder<Session>({
//        baseQuery: `SELECT 
//                     r.id,
//                     r.publisher,
//                     TO_CHAR(r.research_date, 'YYYY-MM-DD') AS research_date,
//                     r.journal_name,
// 					COALESCE(JSON_AGG(DISTINCT rs.school_name), '[]') AS nmims_school,
// 					COALESCE(JSON_AGG(DISTINCT rc.campus_name), '[]') AS nmims_campus,
//                     COALESCE(JSON_AGG(DISTINCT md.name), '[]') AS nmims_authors
//                 FROM research_seminar r
// 				INNER JOIN research_seminar_school rs ON rs.research_seminar_lid = r.id
// 				INNER JOIN research_seminar_campus rc ON rc.research_seminar_lid = r.id
//                 INNER JOIN research_seminar_authors ra ON ra.research_seminar_lid = r.id
//                 INNER JOIN master_input_data md ON md.id = ra.author_lid 
//                 WHERE r.active = TRUE AND ra.active = TRUE AND md.active = TRUE AND rs.active = TRUE AND rc.active = TRUE
//                 GROUP BY r.id `,
 
//        filters: {
//         //   'usi.program_lid': filters.programLid,
//         //   'usi.session_lid': filters.sessionLid,
//         //   'usi.subject_lid': filters.subjectLid,
//        },
//         page : page,
//         pageSize: 10 ,
//         search: search || '',
//         searchColumns: ['r.publisher', 'research_date', 'r.journal_name','r.nmims_school','r.nmims_campus','r.nmims_authors'],
//         sort: {
//           column: sort || 'r.id',
//           order: order || 'desc',
//        },
//     });
 
//     return data;
//  };


export const ResearchSeminarPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await paginationQueryBuilderWithPlaceholder<Session>({
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
               {{whereClause}}
                GROUP BY r.id `,
 
                placeholders: [
                    {
                        placeholder: '{{whereClause}}',
                        filters: {
                        //     'pp.program_name': filters.programName,
                        //     'ss.subject_name': filters.subjectName,
                        //     'ms.abbr': filters.abbr
                        },
                        searchColumns: ['r.publisher', 'r.research_date', 'r.journal_name','rs.school_name','rc.campus_name','md.name'],
                        orderBy: {
                          column: sort || 'r.id',
                          order: order || 'desc',
                       },
                    }
                ],
        page : page,
        pageSize: 10 ,
        search: search || '',
    //     searchColumns: ['r.publisher', 'research_date', 'r.journal_name','r.nmims_school','r.nmims_campus','r.nmims_authors'],
    //     sort: {
    //       column: sort || 'r.id',
    //       order: order || 'desc',
    //    },
    });
 
    return data;
 };


export const insertResearchSeminarModel = async(researchSeminarData : seminarDetails,username:string) => {
    console.log('researchSeminarData ===>>>>>', researchSeminarData)
    
    const data = await sql`SELECT * FROM insert_research_seminar(${JSON.parse(JSON.stringify(researchSeminarData))}, ${username});`;
    return data;

} 

export const updateResearchSeminarModel = async(updateResearchSeminarData : seminarDetails,username:string) => {
    console.log('updateResearchSeminarData ===>>>>>', updateResearchSeminarData)
    
    const data = await sql`SELECT * FROM upsert_research_seminar(${JSON.parse(JSON.stringify(updateResearchSeminarData))},  ${username});`;
    return data;

};

export const deleteResearchSeminarModel = async (seminarId : number,username:string) => {
    console.log('seminarId in  models  ====>>>>>>', seminarId);
    
    const data = await sql`UPDATE research_seminar SET active = false,modified_date=now(),modified_by= ${username} WHERE id = ${seminarId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
}

export const researchSeminarViewModel = async (seminarId : number) => {
    const data = await sql`SELECT
    r.id,
    r.journal_name,
    r.topic,
    COALESCE(NULLIF(r.resource_person, ''), 'No Data Filled!') AS resource_person,
    r.paper_title,
    r.uid,
    r.publisher,
    r.publication_date,
    r.research_date,
    COALESCE(NULLIF(r.issn_no, ''), 'No Data Filled!') AS issn_no,
    COALESCE(NULLIF(r.scopus_site_score, ''), 'No Data Filled!') AS scopus_site_score,
    COALESCE(NULLIF(r.gs_indexed, ''), 'No Data Filled!') AS gs_indexed,
    r.publisher_category,
    r.ugc_indexed,
    COALESCE(NULLIF(r.scs_indexed, ''), 'No Data Filled!') AS scs_indexed,
    r.wos_indexed,
    COALESCE(NULLIF(r.volume_no, ''), 'No Data Filled!') AS volume_no,
    r.impact_factor,
    COALESCE(r.doi_no, 'No Data Filled!') AS doi_no,
    CASE 
        WHEN r.abdc_indexed IS NULL THEN 'No Data Filled!'
        ELSE at.abdc_type
    END AS abdc_indexed,
    COALESCE(JSON_AGG(DISTINCT rss.school_name) FILTER (WHERE rss.school_name IS NOT NULL), '[]') AS nmims_school,
    COALESCE(JSON_AGG(DISTINCT rsc.campus_name) FILTER (WHERE rsc.campus_name IS NOT NULL), '[]') AS nmims_campus,
    COALESCE(JSON_AGG(DISTINCT mi.name) FILTER (WHERE mi.name IS NOT NULL), '[]') AS nmims_authors,
    COALESCE(JSON_AGG(DISTINCT rsd.filename) FILTER (WHERE rsd.filename IS NOT NULL), '[]'::json) AS filename
FROM
    research_seminar r
LEFT JOIN
    research_seminar_authors rs ON rs.research_seminar_lid = r.id
LEFT JOIN
    master_input_data mi ON mi.id = rs.author_lid
LEFT JOIN
    research_seminar_school rss ON rss.research_seminar_lid = r.id 
LEFT JOIN 
    research_seminar_campus rsc ON rsc.research_seminar_lid = r.id 
LEFT JOIN
    research_seminar_documents rsd ON rsd.research_seminar_lid = r.id 
LEFT JOIN
    abdc_types at ON r.abdc_indexed = at.id 
WHERE 
    r.id =  ${seminarId} AND r.active = TRUE AND mi.active = TRUE AND rss.active = TRUE AND rsc.active = TRUE AND rsd.active = TRUE
GROUP BY 
    r.id, r.journal_name, r.topic, r.resource_person, r.paper_title, r.uid, r.publisher, r.publication_date, r.research_date, 
    r.issn_no, r.scopus_site_score, r.gs_indexed, r.publisher_category, r.ugc_indexed, r.scs_indexed, r.wos_indexed, 
    r.volume_no, r.impact_factor, r.doi_no, r.abdc_indexed,
	at.abdc_type`;
    return data;
}

export const researchSeminarUpdViewModel = async (seminarId : number) => {
    const data = await sql`SELECT 
    r.id,
    r.journal_name,
    r.paper_title,
	r.topic,
	r.resource_person,
    r.uid,
    r.publisher,
    r.publication_date,
	r.research_date,
    r.issn_no,
    r.scopus_site_score,
    r.gs_indexed,
    r.publisher_category,
    r.ugc_indexed,
    r.scs_indexed,
    r.wos_indexed,
    r.volume_no,
    r.impact_factor,
    r.doi_no,
    COALESCE(JSON_AGG(DISTINCT rs.school_name), '[]'::json) AS nmims_school,
    COALESCE(JSON_AGG(DISTINCT rc.campus_name), '[]'::json) AS nmims_campus,
    COALESCE(
        (SELECT 
            JSONB_AGG(row_to_json(nmims_data))
        FROM (
            SELECT 
                mi.id,
                mi.name
            FROM 
                research_seminar_authors rsa
            INNER JOIN 
                master_input_data mi
            ON 
                mi.id= rsa.author_lid
            WHERE 
                rsa.research_seminar_lid = r.id
                AND rsa.active = TRUE
                AND r.active = TRUE
        ) AS nmims_data), 
        '[]'::jsonb
    ) AS nmims_authors,
    COALESCE(
        (SELECT 
            JSONB_AGG(row_to_json(abdc))
        FROM (
            SELECT 
                at.id,
                at.abdc_type
            FROM 
                research_seminar rss
            INNER JOIN 
                abdc_types at 
            ON 
                at.id = rss.abdc_indexed
            WHERE 
                rss.id = r.id
			    AND rss.abdc_indexed IS NOT NULL  
                AND rss.active = TRUE
                AND at.active = TRUE
        ) AS abdc), 
        '[]'::jsonb
    ) AS abdc_indexed
    
FROM 
    research_seminar r
    INNER JOIN research_seminar_school rs ON rs.research_seminar_lid = r.id
    INNER JOIN research_seminar_campus rc ON rc.research_seminar_lid = r.id
WHERE 
    r.id = ${seminarId} AND r.active=TRUE AND rs.active = TRUE AND rc.active=TRUE
GROUP BY r.id
`;
    return data;
}

export const seminarFiles = async (seminarId : number) => {
    const data = await sql`SELECT * FROM research_seminar_documents WHERE research_seminar_lid = ${seminarId} AND active = TRUE`;
    return data;
}