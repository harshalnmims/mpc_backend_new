import { infiniteScrollQueryBuilder,paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { BookPublicationDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';



export const getBookDetailsPaginateModel = async({ page, limit, sort, order, search, filters }: paginationDefaultType) =>{
   console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });

   const data = await paginationQueryBuilder<Session>({
      baseQuery: `WITH book_publication_details AS (
                     SELECT 
                        bp.id,
                        bp.publish_year,
                        bp.title,
                        bp.isbn_no,
                        bp.publisher
                     FROM book_publication bp
                  ),
                  school_details AS (
                     SELECT
                        bp.id AS book_id,
                        JSON_AGG(DISTINCT bps.school_name) AS nmims_school
                     FROM book_publication bp
                     INNER JOIN book_publication_school bps ON bps.publication_lid = bp.id
                     GROUP BY bp.id
                  ),
                  campus_details AS (
                     SELECT
                        bp.id AS book_id,
                        JSON_AGG(DISTINCT bpc.campus_name) AS nmims_campus
                     FROM book_publication bp
                     INNER JOIN book_publication_campus bpc ON bpc.publication_lid = bp.id
                     GROUP BY bp.id
                  ),
                  all_authors AS (
                     SELECT
                        bp.id AS book_id,
                        JSON_AGG(DISTINCT f.faculty_name) AS all_authors
                     FROM book_publication bp
                     INNER JOIN book_publication_all_authors bpaa ON bpaa.publication_lid = bp.id
                     INNER JOIN faculties f ON f.id = bpaa.author_lid
                     GROUP BY bp.id
                  )
                  SELECT 
                     bpd.id,
                     bpd.publish_year,
                     bpd.title,
                     bpd.isbn_no,
                     bpd.publisher,
                     sd.nmims_school,
                     cd.nmims_campus,
                     aa.all_authors
                  FROM book_publication_details bpd
                  LEFT JOIN school_details sd ON sd.book_id = bpd.id
                  LEFT JOIN campus_details cd ON cd.book_id = bpd.id
                  LEFT JOIN all_authors aa ON aa.book_id = bpd.id`,
      filters: {
         // Add your filters here
         // Example: 'bp.publisher_category': filters.publisherCategory,
      },
      page: page || 1,
      pageSize: limit || 10,
      search: search || '',
      searchColumns: ['bpd.publisher', 'sd.nmims_school', 'cd.nmims_campus', 'bpd.title', 'bpd.publish_year', 'aa.faculty_names'],
      sort: {
         column: sort || 'bpd.id',
         order: order || 'desc',
      },
   });

   return data;
}


export const getBookPublication = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
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


export const insertBookPublicationModel = async (bookPublicationData: BookPublicationDetails) => {
    console.log('bookPublicationData ===>>>>>', bookPublicationData)
    
    const data = await sql`SELECT * FROM insert_book_publication(${JSON.parse(JSON.stringify(bookPublicationData))}, '1');`;
    return data;
 }; 


export const updateBookPublicationModel = async (updateBookDetails: BookPublicationDetails) => {
    console.log('updateBookDetails in models  ===>>>>>', updateBookDetails)
    
    const data = await sql`SELECT * FROM upsert_book_publication(${JSON.parse(JSON.stringify(updateBookDetails))}, '1');`;
    return data;
 };
 


 export const deleteBookPublicationModel = async (bookPublicationId: number) => {
    console.log('bookPublicationId models  ====>>>>>>', bookPublicationId);
    
    const data = await sql`UPDATE book_publication SET active = false,modified_date=now(),modified_by='1' WHERE id = ${bookPublicationId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
   
};
