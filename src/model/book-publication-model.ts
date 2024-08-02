import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { BookPublicationDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';

// export const getBookDetailsPaginateModel = async ({
//    page,
//    limit,
//    sort,
//    order,
//    search,
//    filters,
// }: paginationDefaultType) => {
//    console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });

//    const data = await paginationQueryBuilder<Session>({
//       baseQuery: `WITH book_publication_details AS (
//                      SELECT 
//                         bp.id,
//                         bp.publish_year,
//                         bp.title,
//                         bp.isbn_no,
//                         bp.publisher
//                      FROM book_publication bp
//                       WHERE bp.active = true
//                   ),
//                   school_details AS (
//                      SELECT
//                         bp.id AS book_id,
//                         JSON_AGG(DISTINCT bps.school_name) AS nmims_school
//                      FROM book_publication bp
//                      INNER JOIN book_publication_school bps ON bps.publication_lid = bp.id
//                      WHERE  bps.active = true AND bp.active = true
//                      GROUP BY bp.id
//                   ),
//                   campus_details AS (
//                      SELECT
//                         bp.id AS book_id,
//                         JSON_AGG(DISTINCT bpc.campus_name) AS nmims_campus
//                      FROM book_publication bp
//                      INNER JOIN book_publication_campus bpc ON bpc.publication_lid = bp.id
//                       WHERE  bpc.active = true AND bp.active = true
//                      GROUP BY bp.id
//                   ),
//                   all_authors AS (
//                      SELECT
//                         bp.id AS book_id,
//                         JSON_AGG(DISTINCT mi.name) AS all_authors
//                      FROM book_publication bp
//                      INNER JOIN book_publication_all_authors bpaa ON bpaa.publication_lid = bp.id
//                      INNER JOIN master_input_data mi ON mi.id = bpaa.author_lid
//                      WHERE mi.active = true AND bpaa.active = true AND bp.active = true
//                      GROUP BY bp.id
//                   )
//                   SELECT 
//                      bpd.id,
//                      bpd.publish_year,
//                      bpd.title,
//                      bpd.isbn_no,
//                      bpd.publisher,
//                      sd.nmims_school,
//                      cd.nmims_campus,
//                      aa.all_authors
//                   FROM book_publication_details bpd
//                   LEFT JOIN school_details sd ON sd.book_id = bpd.id
//                   LEFT JOIN campus_details cd ON cd.book_id = bpd.id
//                   LEFT JOIN all_authors aa ON aa.book_id = bpd.id 	 
//                   `,
//       filters: {
//          // Add your filters here
//          // Example: 'bp.publisher_category': filters.publisherCategory,
//       },
//       page: page || 1,
//       pageSize: limit || 10,
//       search: search || '',
//       searchColumns: [
//          'bpd.publisher',
//          'sd.nmims_school',
//          'cd.nmims_campus',
//          'bpd.title',
//          'bpd.publish_year',
//          'aa.faculty_names',
//       ],
//       sort: {
//          column: sort || 'bpd.id',
//          order: order || 'desc',
//       },
//    });

//    return data;
// };

export const getBookDetailsPaginateModel = async ({
   page,
   limit,
   sort,
   order,
   search,
   filters,
}: paginationDefaultType) => {
   console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });

   const data = await paginationQueryBuilderWithPlaceholder<Session>({
      baseQuery: `WITH book_publication_details AS (
                     SELECT 
                        bp.id,
                        bp.publish_year,
                        bp.title,
                        bp.isbn_no,
                        bp.publisher
                     FROM book_publication bp
                      WHERE bp.active = true
                  ),
                  school_details AS (
                     SELECT
                        bp.id AS book_id,
                        JSON_AGG(DISTINCT bps.school_name) AS nmims_school
                     FROM book_publication bp
                     INNER JOIN book_publication_school bps ON bps.publication_lid = bp.id
                     WHERE  bps.active = true AND bp.active = true
                     GROUP BY bp.id
                  ),
                  campus_details AS (
                     SELECT
                        bp.id AS book_id,
                        JSON_AGG(DISTINCT bpc.campus_name) AS nmims_campus
                     FROM book_publication bp
                     INNER JOIN book_publication_campus bpc ON bpc.publication_lid = bp.id
                      WHERE  bpc.active = true AND bp.active = true
                     GROUP BY bp.id
                  ),
                  all_authors AS (
                     SELECT
                        bp.id AS book_id,
                        JSON_AGG(DISTINCT mi.name) AS all_authors
                     FROM book_publication bp
                     INNER JOIN book_publication_all_authors bpaa ON bpaa.publication_lid = bp.id
                     INNER JOIN master_input_data mi ON mi.id = bpaa.author_lid
                     WHERE mi.active = true AND bpaa.active = true AND bp.active = true
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
                  INNER JOIN school_details sd ON sd.book_id = bpd.id
                  INNER JOIN campus_details cd ON cd.book_id = bpd.id
                  INNER JOIN all_authors aa ON aa.book_id = bpd.id 	 
                  {{whereClause}}
                  `,
      
   
                  placeholders: [
                     {
                         placeholder: '{{whereClause}}',
                         filters: {
                         //     'pp.program_name': filters.programName,
                         //     'ss.subject_name': filters.subjectName,
                         //     'ms.abbr': filters.abbr
                         },
                         searchColumns: ['bpd.publisher',
                                         'sd.nmims_school',
                                         'cd.nmims_campus',
                                         'bpd.title',
                                         'bpd.publish_year',
                                         'aa.all_authors',
                                         'bpd.isbn_no'],
                         orderBy: {
                         column: sort || 'bpd.id',
                         order: order || 'desc',
                         },
                     }
                 ],
      page: page || 1,
      pageSize: limit || 10,
      search: search || '',
      // sort: {
      //    column: sort || 'bpd.id',
      //    order: order || 'desc',
      // },
   });

   return data;
};







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
         value: Number(filters.cursor),
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


export const insertBookPublicationModel = async (bookPublicationData: BookPublicationDetails,username:string) => {
    console.log('bookPublicationData ===>>>>>', bookPublicationData)
    
    const data = await sql`SELECT * FROM insert_book_publication(${JSON.parse(JSON.stringify(bookPublicationData))}, ${username});`;
    return data;
 }; 


export const updateBookPublicationModel = async (bookPublicationData: BookPublicationDetails,username:string) => {
    console.log('bookPublicationData in models  ===>>>>>', bookPublicationData)
    
    const data = await sql`SELECT * FROM upsert_book_publication(${JSON.parse(JSON.stringify(bookPublicationData))}, ${username});`;
    return data;
 };
 


 export const deleteBookPublicationModel = async (bookPublicationId: number,username:string) => {
    console.log('bookPublicationId models  ====>>>>>>', bookPublicationId);
    
    const data = await sql`UPDATE book_publication SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${bookPublicationId}`;

   return data.count > 0
      ? {
           status: 200,
           message: 'Deleted Successfully !',
        }
      : {
           status: 400,
           message: 'Failed To Delete !',
        };
};

export const bookPublicationEditViewModel = async (bookPublicationId: number) => {
   const data = await sql`SELECT 
    bp.id AS book_pulication_id,
    bp.title,
    bp.edition,
    bp.volume_no,
    bp.publisher,
    bp.publish_year,
    bp.publisher_category,
    bp.web_link,
    bp.isbn_no,
    bp.doi_no,
    bp.publication_place,
    bp.nmims_authors_count,
    JSON_AGG(DISTINCT bps.school_name) AS nmims_school,
    JSON_AGG(DISTINCT bpc.campus_name) AS nmims_campus,
    (SELECT 
        JSONB_AGG(row_to_json(author_data))
    FROM (
        SELECT 
            mi.id,
            mi.name
        FROM 
            book_publication_all_authors bpaa
        INNER JOIN 
            master_input_data mi
        ON 
            bpaa.author_lid = mi.id
        WHERE 
            bpaa.publication_lid = bp.id
            AND bpaa.active = TRUE
            AND mi.active = TRUE
    ) AS author_data) AS all_authors,
    (SELECT JSONB_AGG(row_to_json(nmims_data))
    FROM (
        SELECT 
            mi.id,
            mi.name
        FROM 
            book_publication_authors bpna
        INNER JOIN 
            master_input_data mi 
        ON 
            bpna.author_lid = mi.id
        WHERE 
            bpna.publication_lid = bp.id
            AND bpna.active = TRUE
            AND mi.active = TRUE
    ) AS nmims_data) AS nmims_authors
FROM 
    book_publication bp
INNER JOIN 
    book_publication_school bps ON bps.publication_lid = bp.id
INNER JOIN 
    book_publication_campus bpc ON bpc.publication_lid = bp.id
WHERE 
    bp.id = ${bookPublicationId}
    AND bp.active = TRUE 
    AND bpc.active = TRUE 
    AND bps.active = TRUE
GROUP BY 
    bp.id;`;
   return data;
};

export const bookPublicationFormviewModel = async (bookPublicationId: number) => {
   console.log('bookPublicationId in case of form view ===>>>>>', bookPublicationId);
   const data = await sql`SELECT 
    bp.id AS book_publication_id,
    bp.title,
    bp.edition,
    bp.volume_no,
    bp.publisher,
    bp.publish_year,
    bp.publisher_category,
    bp.web_link,
    bp.isbn_no,
    bp.doi_no,
    bp.publication_place,
    bp.nmims_authors_count,
    bp.created_by,
    bp.modified_by,
	bp.ACTIVE,
    COALESCE(JSON_AGG(DISTINCT bps.school_name), '[]'::json) AS nmims_school,
    COALESCE(JSON_AGG(DISTINCT bpc.campus_name), '[]'::json) AS nmims_campus,
    COALESCE(JSON_AGG(DISTINCT md.name), '[]'::json) AS all_authors,
    COALESCE(JSON_AGG(DISTINCT mi.name), '[]'::json) AS nmims_authors,
    COALESCE(JSON_AGG(DISTINCT bpd.filename), '[]'::json) AS supporting_documents
FROM 
    book_publication bp
LEFT JOIN book_publication_school bps ON bp.id = bps.publication_lid
LEFT JOIN book_publication_campus bpc ON bp.id = bpc.publication_lid
LEFT JOIN book_publication_all_authors bpa ON bp.id = bpa.publication_lid
LEFT JOIN master_input_data md ON md.id = bpa.author_lid AND md.active = TRUE
LEFT JOIN book_publication_authors bpa2 ON bp.id = bpa2.publication_lid
LEFT JOIN master_input_data mi ON mi.id = bpa2.author_lid AND mi.active = TRUE
LEFT JOIN book_publication_documents bpd ON bp.id = bpd.publication_lid

WHERE 	
bp.ID = ${bookPublicationId} AND bp.ACTIVE = true AND bpc.active = true AND mi.active = true AND bpa.active = true AND bpa2.active = true AND 
bpd.active = true AND md.active = true
GROUP BY 
    bp.id, bp.title, bp.edition, bp.volume_no, bp.publisher, bp.publish_year,
    bp.publisher_category, bp.web_link, bp.isbn_no, bp.doi_no, bp.publication_place,
    bp.nmims_authors_count, bp.created_by, bp.modified_by;
`;

   return data;
};

export const bookPublicationFiles = async (bookPublicationId: number) => {
   const data =
      await sql`SELECT * FROM book_publication_documents WHERE publication_lid = ${bookPublicationId} AND active=TRUE`;
   return data;
};
