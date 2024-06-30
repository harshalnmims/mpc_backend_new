import { infiniteScrollQueryBuilder,paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { journalArticleDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
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

