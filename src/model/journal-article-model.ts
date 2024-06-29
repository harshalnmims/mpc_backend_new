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

 export const journalPaginateModal = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   console.log('filter ',JSON.stringify(filters))
   const data = await paginationQueryBuilder<Session>({
      baseQuery: `    SELECT jpa.id, jpa.publisher, jpa.impact_factor, jpa.publish_year, jpa.total_authors,
      JSON_AGG(DISTINCT js.school_name) AS school_name,
      JSON_AGG(DISTINCT jc.campus_name) AS campus_name,
      JSON_AGG(DISTINCT pc.policy_name) AS policy_cadre,
      jpa.total_authors
    FROM journal_paper_article jpa 
    INNER JOIN journal_paper_school js ON js.journal_paper_lid = jpa.id
    INNER JOIN journal_paper_campus jc ON jc.journal_paper_lid = jpa.id 
    INNER JOIN journal_policy_cadre jpc ON jpc.journal_paper_lid = jpa.id
    INNER JOIN policy_cadre pc ON pc.id = jpc.policy_cadre_lid
    GROUP BY jpa.id
`,

      filters: {
         'usi.program_lid': filters.programLid,
         'usi.session_lid': filters.sessionLid,
         'usi.subject_lid': filters.subjectLid,
      },
      page : page,
      pageSize: limit,
      search: search || '',
      searchColumns: ['jpa.publisher', 'school_name', 'campus_name','policy_cadre','jpa.total_authors'],
      sort: {
         column: sort || 'jpa.id',
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
