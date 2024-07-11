import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { caseStudyDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { number } from 'zod'; 

export const getCaseStudyModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await paginationQueryBuilder<Session>({
      baseQuery: `WITH paper_details AS (
                     SELECT 
                        jpa.id,
                        jpa.journal_name,
                        jpa.publisher,
                        jpa.impact_factor,
                        jpa.publish_year,
                        jpa.total_authors
                     FROM journal_paper_article jpa
                     WHERE jpa.active=TRUE
                  ),
                  school_details AS (
                     SELECT
                        jpa.id AS paper_id,
                        JSON_AGG(DISTINCT js.school_name) AS nmims_school
                     FROM journal_paper_article jpa
                     INNER JOIN journal_paper_school js ON js.journal_paper_lid = jpa.id
                     WHERE jpa.active=TRUE AND js.active=TRUE
                     GROUP BY jpa.id
                  ),
                  campus_details AS (
                     SELECT
                        jpa.id AS paper_id,
                        JSON_AGG(DISTINCT jc.campus_name) AS nmims_campus
                     FROM journal_paper_article jpa
                     INNER JOIN journal_paper_campus jc ON jc.journal_paper_lid = jpa.id
                     WHERE jpa.active=TRUE AND jc.active=TRUE
                     GROUP BY jpa.id
                  ),
                  policy_details AS (
                     SELECT
                        jpa.id AS paper_id,
                        JSON_AGG(DISTINCT pc.policy_name) AS policy_cadre
                     FROM journal_paper_article jpa
                     INNER JOIN journal_policy_cadre jpc ON jpc.journal_paper_lid = jpa.id
                     INNER JOIN policy_cadre pc ON pc.id = jpc.policy_cadre_lid
                     WHERE jpa.active=TRUE AND jpc.active=TRUE AND pc.active=TRUE
                     GROUP BY jpa.id
                  )

                  SELECT
                     pd.id,
                     pd.journal_name,
                     pd.publisher,
                     pd.impact_factor,
                     pd.publish_year,
                     pd.total_authors,
                     sd.nmims_school,
                     cd.nmims_campus,
                     pcd.policy_cadre
                  FROM paper_details pd
                  LEFT JOIN school_details sd ON pd.id = sd.paper_id
                  LEFT JOIN campus_details cd ON pd.id = cd.paper_id
                  LEFT JOIN policy_details pcd ON pd.id = pcd.paper_id
`,

      filters: {
         // 'usi.program_lid': filters.programLid,
         // 'usi.session_lid': filters.sessionLid,
         // 'usi.subject_lid': filters.subjectLid,
      },
      page : page,
      pageSize: 10 ,
      search: search || '',
      searchColumns: ['pd.publisher', 'sd.nmims_school', 'cd.nmims_campus','pcd.policy_cadre','pd.total_authors','pd.publish_year','pd.journal_name'],
      sort: {
         column: sort || 'pd.id',
         order: order || 'desc',
      },
   });

   return data;
 };

 export const CaseStudyPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await paginationQueryBuilder<Session>({
      baseQuery: `SELECT 
                    c.id,
                    COALESCE(c.title, 'No Data Filled!') AS title,
                    COALESCE(NULLIF(c.edition, ''), 'No Data Filled!') AS edition,
                    COALESCE(c.publisher, 'No Data Filled!') AS publisher,
                    COALESCE(c.publish_year, 0) AS publish_year,
                    COALESCE(c.volume_no, 'No Data Filled!') AS volume_no,
                    COALESCE(JSON_AGG(DISTINCT md.name), '[]') AS all_authors
                FROM case_study c
                INNER JOIN case_study_authors ca ON ca.case_study_lid = c.id
                INNER JOIN master_input_data md ON md.id = ca.author_lid 
                WHERE c.active = TRUE AND ca.active = TRUE AND md.active = TRUE
                GROUP BY c.id
`,

      filters: {
         // 'usi.program_lid': filters.programLid,
         // 'usi.session_lid': filters.sessionLid,
         // 'usi.subject_lid': filters.subjectLid,
      },
      page : page,
      pageSize: 10 ,
      search: search || '',
      searchColumns: ['title','edition','publisher','publish_year','volume_no','all_authors'],
      sort: {
         column: sort || 'c.id',
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

export const CaseStudyViewModel = async (caseStudyId : number) => {
    console.log('caseStudyId in  models  ====>>>>>>', caseStudyId);
    
    const data = await sql `SELECT 
                    c.id,
                    COALESCE(c.title, 'No Data') AS title,
                    COALESCE(NULLIF(c.edition, ''), 'No Data Filled!') AS edition,
                    COALESCE(c.publisher, 'No Data') AS publisher,
                    COALESCE(c.publish_year, 0) AS publish_year,
                    COALESCE(c.volume_no, 'No Data') AS volume_no,
					COALESCE(c.publisher_category, 0) AS publisher_category,
					COALESCE(c.url, 'No Data Filled!') AS url,
					COALESCE(NULLIF(c.edition, ''), 'No Data Filled!') AS page_no,
					COALESCE(c.nmims_authors_count, 0) AS nmims_authors_count,
                    COALESCE(JSON_AGG(DISTINCT md.name), '[]') AS all_authors,
					COALESCE(JSON_AGG(DISTINCT mi.name), '[]') AS nmims_authors,
					COALESCE(JSON_AGG(DISTINCT cs.school_name), '[]') AS nmims_school,
					COALESCE(JSON_AGG(DISTINCT cc.campus_name), '[]') AS nmims_campus,
					COALESCE(JSON_AGG(DISTINCT csd.filename), '[]') AS supporting_documents
                FROM case_study c
                INNER JOIN case_study_authors ca ON ca.case_study_lid = c.id
                INNER JOIN master_input_data md ON md.id = ca.author_lid 
				INNER JOIN case_study_school cs ON cs.case_study_lid = c.id
				INNER JOIN case_study_campus cc ON cc.case_study_lid = c.id
                INNER JOIN case_study_nmims_authors cna ON cna.case_study_lid = c.id
                INNER JOIN master_input_data mi ON mi.id = cna.author_lid
				INNER JOIN case_study_documents csd ON csd.case_study_lid = c.id
                WHERE c.active = TRUE AND ca.active = TRUE AND md.active = TRUE AND 
				cs.active = TRUE AND cc.active = TRUE AND cna.active = TRUE AND mi.active = TRUE 
				AND csd.active = TRUE AND c.id = ${caseStudyId}
                GROUP BY c.id`; 
    return data;
};


export const CaseStudyUpdateViewModel = async(caseStudyId : number) => {
    const data = await sql`SELECT 
    c.id,
    c.title,
	c.edition,
	c.publisher,
	c.publish_year,
	c.volume_no,
	c.page_no,
	c.publisher_category,
	c.url,
	c.nmims_authors_count,
    COALESCE(JSON_AGG(DISTINCT cs.school_name), '[]'::json) AS nmims_school,
    COALESCE(JSON_AGG(DISTINCT cc.campus_name), '[]'::json) AS nmims_campus,
    COALESCE(
        (SELECT 
            JSONB_AGG(row_to_json(author_data))
        FROM (
            SELECT 
                mi.id,
                mi.name
            FROM 
                case_study_authors ca
            INNER JOIN 
                master_input_data mi 
            ON 
                ca.author_lid = mi.id
            WHERE 
                ca.case_study_lid = c.id
                AND ca.active = TRUE
                AND mi.active = TRUE
        ) AS author_data), 
        '[]'::jsonb
    ) AS all_authors,
    COALESCE(
        (SELECT 
            JSONB_AGG(row_to_json(nmims_data))
        FROM (
             SELECT 
                mi.id,
                mi.name
            FROM 
                case_study_nmims_authors ca
            INNER JOIN 
                master_input_data mi 
            ON 
                ca.author_lid = mi.id
            WHERE 
                ca.case_study_lid = c.id
                AND ca.active = TRUE
                AND mi.active = TRUE
        ) AS nmims_data), 
        '[]'::jsonb
    ) AS nmims_authors
  
FROM 
    case_study c
    INNER JOIN case_study_school cs ON cs.case_study_lid = c.id
    INNER JOIN case_study_campus cc ON cc.case_study_lid = c.id
WHERE 
    c.id = ${caseStudyId} AND c.active=TRUE AND cs.active = TRUE AND cc.active=TRUE
GROUP BY c.id`;
    return data;
}

export const caseStudyFiles = async(caseStudyId : number) => {
    const data = await sql`SELECT document_name FROM case_study_documents WHERE case_study_lid=${caseStudyId} AND active = TRUE`;
    return data;
}

