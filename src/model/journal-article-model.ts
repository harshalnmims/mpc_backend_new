import { infiniteScrollQueryBuilder,paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { journalArticleDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import { HTTP_STATUS } from '$constants/http.constant';
import { CustomError } from '$utils/error/customError';
import sql from '$config/db';

export const getJournalArticlePublished = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
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

 export const journalPaginateModal = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
   console.log('filter ',JSON.stringify(filters) , { page , limit, sort, order, search, filters });

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
                  ),
                  school_details AS (
                     SELECT
                        jpa.id AS paper_id,
                        JSON_AGG(DISTINCT js.school_name) AS nmims_school
                     FROM journal_paper_article jpa
                     INNER JOIN journal_paper_school js ON js.journal_paper_lid = jpa.id
                     GROUP BY jpa.id
                  ),
                  campus_details AS (
                     SELECT
                        jpa.id AS paper_id,
                        JSON_AGG(DISTINCT jc.campus_name) AS nmims_campus
                     FROM journal_paper_article jpa
                     INNER JOIN journal_paper_campus jc ON jc.journal_paper_lid = jpa.id
                     GROUP BY jpa.id
                  ),
                  policy_details AS (
                     SELECT
                        jpa.id AS paper_id,
                        JSON_AGG(DISTINCT pc.policy_name) AS policy_cadre
                     FROM journal_paper_article jpa
                     INNER JOIN journal_policy_cadre jpc ON jpc.journal_paper_lid = jpa.id
                     INNER JOIN policy_cadre pc ON pc.id = jpc.policy_cadre_lid
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


export const insertJournalArticleModel = async (journalDetails: journalArticleDetails) => {
    console.log('journalDetails ===>>>>>', journalDetails)
    
    const data = await sql`SELECT * FROM insert_journal_article(${JSON.parse(JSON.stringify(journalDetails))}, '1');`;
    return data;
 }; 


export const updateJournalArticleModel = async (updateJournalDetails: journalArticleDetails) => {
    console.log('updateJournalDetails in models  ===>>>>>', updateJournalDetails)
    
    const data = await sql`SELECT * FROM upsert_journal_article(${JSON.parse(JSON.stringify(updateJournalDetails))}, '1');`;
    return data;
 };
 


 export const deleteJournalArticleModel = async (journalPaperId: number) => {
    console.log('journalPaperId models  ====>>>>>>', journalPaperId);
    
    const data = await sql`UPDATE journal_paper_article SET active = false,modified_date=now(),modified_by='1' WHERE id = ${journalPaperId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
   
};

export const journalViewData = async (journalpaperId:number) => {
   const data = await sql`SELECT
    jpa.id AS journal_paper_id,
    jpa.journal_name,
    jpa.title,
    jpa.publish_year,
    jpa.total_authors,
    jpa.nmims_authors AS nmims_authors_count,
    jpa.uid,
    jpa.publisher,
    jpa.publishing_date,
    jpa.issn_no,
    jpa.scopus_site_score,
    jpa.gs_indexed,
    jpa.journal_type,
    jpa.ugc_indexed,
    jpa.scs_indexed,
    jpa.wos_indexed,
    jpa.page_no,
    jpa.foreign_authors_count,
    jpa.student_authors_count,
    jpa.impact_factor,
    jpa.doi_no,
    jpa.abdc_indexed,
    pt.paper_name,
    at.abdc_type,
    JSON_AGG(DISTINCT jns.school_name) AS nmims_school,
    JSON_AGG(DISTINCT jnc.campus_name) AS nmims_campus,
    JSON_AGG(DISTINCT pc.policy_name) AS policy_names,
    JSON_AGG(DISTINCT fa.faculty_name) FILTER (WHERE jaa.faculty_lid IS NOT NULL) AS all_authors,
    JSON_AGG(DISTINCT fa.faculty_name) FILTER (WHERE jaa.faculty_lid IS NOT NULL AND fa.active = TRUE) AS nmims_authors,
    JSON_AGG(DISTINCT ffa.name) FILTER (WHERE jfa.author_lid IS NOT NULL) AS foreign_authors,
    JSON_AGG(DISTINCT o.name) FILTER (WHERE joa.author_lid IS NOT NULL AND joa.active = TRUE) AS other_authors,
    JSON_AGG(DISTINCT sa.name) FILTER (WHERE jsa.author_lid IS NOT NULL AND jsa.active = TRUE) AS student_authors,
    JSON_AGG(DISTINCT jsd.document_name) FILTER (WHERE jsd.active = TRUE) AS supporting_documents
FROM
    journal_paper_article jpa
LEFT JOIN
    journal_policy_cadre jpc ON jpa.id = jpc.journal_paper_lid
LEFT JOIN
    policy_cadre pc ON pc.id = jpc.policy_cadre_lid
LEFT JOIN
    journal_all_authors jaa ON jpa.id = jaa.journal_paper_lid
LEFT JOIN
    faculties fa ON fa.id = jaa.faculty_lid
LEFT JOIN
    journal_nmims_authors jna ON jpa.id = jna.journal_paper_lid
LEFT JOIN
    journal_foreign_authors jfa ON jpa.id = jfa.journal_paper_lid
LEFT JOIN
    master_input_data ffa ON ffa.id = jfa.author_lid
LEFT JOIN
    journal_other_authors joa ON jpa.id = joa.journal_paper_lid
LEFT JOIN
    master_input_data o ON o.id = joa.author_lid
LEFT JOIN
    journal_student_authors jsa ON jpa.id = jsa.journal_paper_lid
LEFT JOIN
    master_input_data sa ON sa.id = jsa.author_lid
LEFT JOIN
    journal_supporting_documents jsd ON jpa.id = jsd.journal_paper_lid
LEFT JOIN
    paper_type pt ON pt.id = jpa.paper_type -- corrected to use jpa.paper_type
LEFT JOIN
    journal_paper_school jns ON jns.journal_paper_lid = jpa.id
LEFT JOIN
    journal_paper_campus jnc ON jnc.journal_paper_lid = jpa.id
LEFT JOIN
    abdc_types at ON at.id = jpa.abdc_indexed	    
WHERE
    jpa.id = ${journalpaperId}
    AND jpa.active = TRUE
    AND jpc.active = TRUE
    AND jsa.active = TRUE
    AND joa.active = TRUE
    AND jfa.active = TRUE
    AND jna.active = TRUE
    AND jaa.active = TRUE
    AND pt.active = TRUE
    AND jnc.active = TRUE
    AND jns.active = TRUE
    AND at.active = TRUE
GROUP BY
    jpa.id,pt.paper_name ,at.abdc_type
`;
   return data;
}

