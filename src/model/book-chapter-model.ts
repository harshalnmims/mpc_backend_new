import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { bookChapterDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';

import sql from '$config/db';
import { number } from 'zod';
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';

// export const getBookChapterPublication = async ({
//    page,
//    limit,
//    sort,
//    order,
//    search,
//    filters,
// }: paginationDefaultType) => {
//    console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });

//    const data = await paginationQueryBuilder<Session>({
//       baseQuery: `WITH book_chapter_details AS (
//                     SELECT 
//                         bcp.id,
//                         bcp.publish_year,
//                         bcp.book_title,
//                         bcp.isbn_no,
//                         bcp.publisher,
//                         bcp.created_by
//                     FROM book_chapter_publication bcp
//                     WHERE bcp.active = true
//                 ),
//                 school_details AS (
//                     SELECT
//                         bcp.id AS book_chapter_id,
//                         JSON_AGG(DISTINCT bcs.school_name) AS nmims_school
//                     FROM book_chapter_publication bcp
//                     INNER JOIN book_chapter_publication_school bcs ON bcs.publication_lid = bcp.id
//                     WHERE bcs.active = true AND bcp.active = true
//                     GROUP BY bcp.id
//                 ),
//                 campus_details AS (
//                     SELECT
//                         bcp.id AS book_chapter_id,
//                         JSON_AGG(DISTINCT bcc.campus_name) AS nmims_campus
//                     FROM book_chapter_publication bcp
//                     INNER JOIN book_chapter_publication_campus bcc ON bcc.publication_lid = bcp.id
//                     WHERE bcc.active = true AND bcp.active = true
//                     GROUP BY bcp.id
//                 ),
//                 all_authors AS (
//                     SELECT
//                         bcp.id AS book_chapter_id,
//                         JSON_AGG(DISTINCT mi.name) AS all_authors
//                     FROM book_chapter_publication bcp
//                     INNER JOIN book_chapter_publication_all_authors bcaa ON bcaa.publication_lid = bcp.id
//                     INNER JOIN master_input_data mi ON mi.id = bcaa.author_lid
//                     WHERE mi.active = true AND bcaa.active = true AND bcp.active = true
//                     GROUP BY bcp.id
//                 ),
//                 editors AS (
//                     SELECT
//                         bcp.id AS book_chapter_id,
//                         JSON_AGG(DISTINCT mid.name) AS all_editors
//                     FROM book_chapter_publication bcp
//                     INNER JOIN book_chapter_editors e ON e.publication_lid = bcp.id
//                     INNER JOIN master_input_data mid ON mid.id = e.editor_lid
//                     WHERE e.active = true AND mid.active = true AND bcp.active = true
//                     GROUP BY bcp.id
//                 )
//                 SELECT 
//                     bcd.id,
//                     bcd.publish_year,
//                     bcd.book_title,
//                     bcd.isbn_no,
//                     bcd.publisher,
//                     sd.nmims_school,
//                     cd.nmims_campus,
//                     aa.all_authors,
//                     e.all_editors
//                 FROM book_chapter_details bcd
//                 LEFT JOIN school_details sd ON sd.book_chapter_id = bcd.id
//                 LEFT JOIN campus_details cd ON cd.book_chapter_id = bcd.id
//                 LEFT JOIN all_authors aa ON aa.book_chapter_id = bcd.id
//                 LEFT JOIN editors e ON e.book_chapter_id = bcd.id
//                    `,
//       filters: {
//          // Add your filters here
//          // Example: 'bp.publisher_category': filters.publisherCategory,
//       },
//       page: page || 1,
//       pageSize: limit || 10,
//       search: search || '',
//       searchColumns: [
//          'bcd.publisher',
//          'sd.nmims_school',
//          'cd.nmims_campus',
//          'bcd.book_title',
//          'bcd.publish_year',
//          'bcd.isbn_no',
//          'aa.faculty_names',
//       ],
//       sort: {
//          column: sort || 'bcd.id',
//          order: order || 'desc',
//       },
//    });

//    return data;
// };

export const getBookChapterPublication = async ({
    page,
    limit,
    sort,
    order,
    search,
    filters,
 }: paginationDefaultType,username : string) => {
    console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilderWithPlaceholder<Session>({
       baseQuery: ` WITH book_chapter_details AS (
                     SELECT 
                         bcp.id,
                         bcp.publish_year,
                         bcp.book_title,
                         bcp.isbn_no,
                         bcp.publisher,
                         bcp.created_by
                     FROM book_chapter_publication bcp
                     WHERE bcp.active = true
                 ),
                 school_details AS (
                     SELECT
                         bcp.id AS book_chapter_id,
                         JSON_AGG(DISTINCT bcs.school_name) AS nmims_school
                     FROM book_chapter_publication bcp
                     INNER JOIN book_chapter_publication_school bcs ON bcs.publication_lid = bcp.id
                     WHERE bcs.active = true AND bcp.active = true
                     GROUP BY bcp.id
                 ),
                 campus_details AS (
                     SELECT
                         bcp.id AS book_chapter_id,
                         JSON_AGG(DISTINCT bcc.campus_name) AS nmims_campus
                     FROM book_chapter_publication bcp
                     INNER JOIN book_chapter_publication_campus bcc ON bcc.publication_lid = bcp.id
                     WHERE bcc.active = true AND bcp.active = true
                     GROUP BY bcp.id
                 ),
                 all_authors AS (
                     SELECT
                         bcp.id AS book_chapter_id,
                         JSON_AGG(DISTINCT mi.name) AS all_authors
                     FROM book_chapter_publication bcp
                     INNER JOIN book_chapter_publication_all_authors bcaa ON bcaa.publication_lid = bcp.id
                     INNER JOIN master_input_data mi ON mi.id = bcaa.author_lid
                     WHERE mi.active = true AND bcaa.active = true AND bcp.active = true
                     GROUP BY bcp.id
                 ),
                 editors AS (
                     SELECT
                         bcp.id AS book_chapter_id,
                         JSON_AGG(DISTINCT mid.name) AS all_editors
                     FROM book_chapter_publication bcp
                     INNER JOIN book_chapter_editors e ON e.publication_lid = bcp.id
                     INNER JOIN master_input_data mid ON mid.id = e.editor_lid
                     WHERE e.active = true AND mid.active = true AND bcp.active = true
                     GROUP BY bcp.id
                 )
                 SELECT 
                     bcd.id,
                     bcd.publish_year,
                     bcd.book_title,
                     bcd.isbn_no,
                     bcd.publisher,
                     sd.nmims_school,
                     cd.nmims_campus,
                     aa.all_authors,
                     e.all_editors
                 FROM book_chapter_details bcd
                 INNER JOIN school_details sd ON sd.book_chapter_id = bcd.id
                 INNER JOIN campus_details cd ON cd.book_chapter_id = bcd.id
                 INNER JOIN all_authors aa ON aa.book_chapter_id = bcd.id
                 INNER JOIN editors e ON e.book_chapter_id = bcd.id	
                 WHERE bcd.created_by = '${username}'
                 {{whereClause}} ORDER BY bcd.id desc
                    `,
                    placeholders: [
                        {
                            placeholder: '{{whereClause}}',
                            filters: {
                            //     'pp.program_name': filters.programName,
                            //     'ss.subject_name': filters.subjectName,
                            //     'ms.abbr': filters.abbr
                            },
                            searchColumns: ['bcd.publisher',
                                            'sd.nmims_school',
                                            'cd.nmims_campus',
                                            'bcd.book_title',
                                            'bcd.publish_year',
                                            'bcd.isbn_no',
                                            'aa.all_authors'],
                            // orderBy: {
                            // column: sort || 'bcd.id',
                            // order: order || 'desc',
                            // },
                        }
                    ],
       page: page || 1,
       pageSize: limit || 10,
       search: search || '',
    //    searchColumns: [
    //       'bcd.publisher',
    //       'sd.nmims_school',
    //       'cd.nmims_campus',
    //       'bcd.book_title',
    //       'bcd.publish_year',
    //       'bcd.isbn_no',
    //       'aa.faculty_names',
    //    ],
    //    sort: {
    //       column: sort || 'bcd.id',
    //       order: order || 'desc',
    //    },
    });
 
    return data;
 };


export const insertBookChapterModel = async(bookChapterData: bookChapterDetails, username: string) => {
    console.log('bookChapterData ===>>>>>', bookChapterData)
    
    const data = await sql`SELECT * FROM insert_book_chapter(${JSON.parse(JSON.stringify(bookChapterData))} ,${username});`;
    return data;

}

export const booChapterEditViewModel = async(booChapterId : number) => {
        const data = await sql`
            SELECT 
            bcp.id AS book_chapter_id,
            bcp.book_title,
            bcp.chapter_title,
            bcp.edition,
            bcp.volume_no,
            bcp.chapter_page_no,
            bcp.publisher,
            bcp.publish_year,
            bcp.publisher_category,
            bcp.web_link,
            bcp.isbn_no,
            bcp.doi_no,
            bcp.publication_place,
            bcp.nmims_authors_count,
            JSON_AGG(DISTINCT bcps.school_name) AS nmims_school,
            JSON_AGG(DISTINCT bcpc.campus_name) AS nmims_campus,
            (SELECT 
                JSONB_AGG(row_to_json(author_data))
            FROM (
                SELECT 
                    mi.id,
                    mi.name
                FROM 
                    book_chapter_publication_all_authors bcpaa
                INNER JOIN 
                    master_input_data mi 
                ON 
                    bcpaa.author_lid = mi.id
                WHERE 
                    bcpaa.publication_lid = bcp.id
                    AND bcpaa.active = TRUE
                    AND mi.active = TRUE
            ) AS author_data) AS all_authors,
            (SELECT JSONB_AGG(row_to_json(nmims_data))
            FROM (
                SELECT 
                    mi.id,
                    mi.name
                FROM 
                    book_chapter_publication_authors bcpna
                INNER JOIN 
                    master_input_data mi 
                ON 
                    bcpna.author_lid = mi.id
                WHERE 
                    bcpna.publication_lid = bcp.id
                    AND bcpna.active = TRUE
                    AND mi.active = TRUE
            ) AS nmims_data) AS nmims_authors,
            (SELECT JSONB_AGG(row_to_json(editor_data))
            FROM (
                SELECT 
                    mid.id,
                    mid.name AS editor_name
                FROM 
                    book_chapter_editors bce
                INNER JOIN 
                    master_input_data mid 
                ON 
                    bce.editor_lid = mid.id
                WHERE 
                    bce.publication_lid = bcp.id
                    AND bce.active = TRUE
            ) AS editor_data) AS book_editors
        FROM 
            book_chapter_publication bcp
        INNER JOIN 
            book_chapter_publication_school bcps ON bcps.publication_lid = bcp.id
        INNER JOIN 
            book_chapter_publication_campus bcpc ON bcpc.publication_lid = bcp.id
        WHERE 
            bcp.id = ${booChapterId}
            AND bcp.active = TRUE 
            AND bcpc.active = TRUE 
            AND bcps.active = TRUE
        GROUP BY 
            bcp.id				`;
   return data;
};

export const updateBookChapterModel = async(updateBookChapterData: bookChapterDetails, username: string) => {
    console.log('updateBookChapterData ===>>>>>', updateBookChapterData)
    
    const data = await sql`SELECT * FROM upsert_book_chapter(${JSON.parse(JSON.stringify(updateBookChapterData))}, ${username});`;
    return data;
}

export const deleteBookChapterModel = async(bookChapterId: number, username: string) => {
    console.log('bookChapterId in  models  ====>>>>>>', bookChapterId);
    
    const data = await sql`UPDATE book_chapter_publication SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${bookChapterId}`;

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

export const bookChapterPublicationFormviewModel = async (bookChapterId: number) => {
   console.log('bookChapterId in case of form view ===>>>>>', bookChapterId);
   const data = await sql`SELECT 
            bcp.id AS book_chapter_id,
            bcp.book_title,
            bcp.chapter_title,
            bcp.edition,
            bcp.volume_no,
            bcp.chapter_page_no,
            bcp.publisher,
            bcp.publish_year,
            bcp.publisher_category,
            bcp.web_link,
            bcp.isbn_no,
            bcp.doi_no,
            bcp.publication_place,
            bcp.nmims_authors_count,
            bcp.active,
            COALESCE(JSON_AGG(DISTINCT bcps.school_name), '[]'::json) AS nmims_school,
            COALESCE(JSON_AGG(DISTINCT bcpc.campus_name), '[]'::json) AS nmims_campus,
            COALESCE(JSON_AGG(DISTINCT mi.name), '[]'::json) AS all_authors,
            COALESCE(JSON_AGG(DISTINCT md.name), '[]'::json) AS nmims_authors,
            COALESCE(JSON_AGG(DISTINCT bcpd.filename), '[]'::json) AS supporting_documents,
            COALESCE(JSON_AGG(DISTINCT mid.name),'[]'::json) AS book_editors
        FROM 
            book_chapter_publication bcp
        LEFT JOIN book_chapter_publication_school bcps ON bcp.id = bcps.publication_lid
        LEFT JOIN book_chapter_publication_campus bcpc ON bcp.id = bcpc.publication_lid
        LEFT JOIN book_chapter_publication_all_authors bcpa ON bcp.id = bcpa.publication_lid
        LEFT JOIN master_input_data mi ON mi.id = bcpa.author_lid AND mi.active = TRUE
        LEFT JOIN book_chapter_publication_authors bcpa2 ON bcp.id = bcpa2.publication_lid
		LEFT JOIN master_input_data md ON md.id = bcpa2.author_lid AND md.active = TRUE
        LEFT JOIN bookchapter_publication_documents bcpd ON bcp.id = bcpd.publication_lid
        LEFT JOIN book_chapter_editors bce ON bcp.id = bce.publication_lid
        LEFT JOIN master_input_data mid ON bce.editor_lid = mid.id

        WHERE 	
            bcp.id = ${bookChapterId} AND 
            bcp.active = TRUE AND 
            bcpc.active = TRUE AND 
            bcpa.active = TRUE AND 
            bcpa2.active = TRUE AND 
            bcpd.active = TRUE
        GROUP BY 
            bcp.id		
 
 `;

   return data;
};

export const bookChapterPublicationFiles = async (bookChapterId: number) => {
   const data =
      await sql`SELECT * FROM bookchapter_publication_documents WHERE publication_lid = ${bookChapterId} AND active=TRUE`;
   return data;
};
