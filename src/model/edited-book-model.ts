import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { EditedBookPublicationDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import editedbookRoutes from '$routes/research-routes/edited-book-routes';
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';

export const getEditedBookPublicationModels = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
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


export const insertEditedBookPublicationModel = async (editedBookPublicationData: EditedBookPublicationDetails,username:string) => {
    console.log('editedBookPublicationData ===>>>>>', editedBookPublicationData)
    
    const data = await sql`SELECT * FROM insert_edited_publications(${JSON.parse(JSON.stringify(editedBookPublicationData))}, ${username});`;
    return data;
 }; 

export const updateEditedBookModel = async (updateEditedBookPublicationData: EditedBookPublicationDetails,username:string) => {
    console.log('updateEditedBookPublicationData ===>>>>>', updateEditedBookPublicationData)
    
    const data = await sql`SELECT * FROM upsert_edited_publication(${JSON.parse(JSON.stringify(updateEditedBookPublicationData))}, ${username});`;
    return data;

 }

export const deleteEditedBookModel = async (editedbookId : number,username:string) => {
    console.log('editedbookId models  ====>>>>>>', editedbookId);
    
    const data = await sql`UPDATE edited_book_publication SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${editedbookId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
}

// export const editedBookPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
//    console.log('filter ',JSON.stringify(filters) , { page , limit, sort, order, search, filters });

//    const data = await paginationQueryBuilder<Session>({
//       baseQuery: `WITH publication_details AS (
//                     SELECT 
//                         ebp.id,
//                         ebp.publish_year,
//                         ebp.title,
//                         ebp.isbn_no,
//                         ebp.publisher
//                     FROM edited_book_publication ebp
//                     WHERE ebp.active = TRUE
//                 ),
//                 campus_details AS (
//                     SELECT
//                         ebp.id AS publication_id,
//                         JSON_AGG(DISTINCT bpc.campus_name) AS campuses
//                     FROM edited_book_publication ebp
//                     INNER JOIN edited_book_publication_campus bpc ON ebp.id = bpc.publication_lid
//                     WHERE ebp.active = TRUE AND bpc.active = TRUE
//                     GROUP BY ebp.id
//                 ),
//                 school_details AS (
//                     SELECT
//                         ebp.id AS publication_id,
//                         JSON_AGG(DISTINCT bps.school_name) AS schools
//                     FROM edited_book_publication ebp
//                     INNER JOIN edited_book_publication_school bps ON ebp.id = bps.publication_lid
//                     WHERE ebp.active = TRUE AND bps.active = TRUE
//                     GROUP BY ebp.id
//                 ),
//                 author_details AS (
//                     SELECT
//                         ebp.id AS publication_id,
//                         JSON_AGG(DISTINCT mid.name) AS authors
//                     FROM edited_book_publication ebp
//                     INNER JOIN edited_book_publication_all_authors bpa ON ebp.id = bpa.publication_lid
//                     INNER JOIN master_input_data mid ON bpa.author_lid = mid.id
//                     WHERE ebp.active = TRUE AND bpa.active = TRUE AND mid.active = TRUE
//                     GROUP BY ebp.id
//                 )
//                 SELECT
//                     pd.id,
//                     pd.publish_year,
//                     pd.title,
//                     pd.isbn_no,
//                     pd.publisher,
//                     cd.campuses,
//                     sd.schools,
//                     ad.authors
//                 FROM publication_details pd
//                 LEFT JOIN campus_details cd ON pd.id = cd.publication_id
//                 LEFT JOIN school_details sd ON pd.id = sd.publication_id
//                 LEFT JOIN author_details ad ON pd.id = ad.publication_id`,


//                 filters: {
//                     // 'usi.program_lid': filters.programLid,
//                     // 'usi.session_lid': filters.sessionLid,
//                     // 'usi.subject_lid': filters.subjectLid,
//                  },
//                 page : page,
//                 pageSize: 10 ,
//                 search: search || '',
//                 searchColumns: ['ad.authors', 'cd.campuses', 'sd.schools','pd.publish_year','pd.title','pd.publish_year','pd.title', 'pd.isbn_no', 'pd.publisher'],
//                 sort: {
//                    column: sort || 'pd.id',
//                    order: order || 'desc',
//                 },

//    })

//    return data;

// }

export const editedBookPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType,username:string) => {
   console.log('filter ',JSON.stringify(filters) , { page , limit, sort, order, search, filters });

   const data = await paginationQueryBuilderWithPlaceholder<Session>({
      baseQuery: `WITH publication_details AS (
                    SELECT 
                        ebp.id,
                        ebp.publish_year,
                        ebp.title,
                        ebp.isbn_no,
                        ebp.publisher,
                        ebp.created_by,
                        ebp.form_status_lid
                    FROM edited_book_publication ebp
                    WHERE ebp.active = TRUE
                ),
                campus_details AS (
                    SELECT
                        ebp.id AS publication_id,
                        JSON_AGG(DISTINCT bpc.campus_name) AS campuses
                    FROM edited_book_publication ebp
                    INNER JOIN edited_book_publication_campus bpc ON ebp.id = bpc.publication_lid
                    WHERE ebp.active = TRUE AND bpc.active = TRUE
                    GROUP BY ebp.id
                ),
                school_details AS (
                    SELECT
                        ebp.id AS publication_id,
                        JSON_AGG(DISTINCT bps.school_name) AS schools
                    FROM edited_book_publication ebp
                    INNER JOIN edited_book_publication_school bps ON ebp.id = bps.publication_lid
                    WHERE ebp.active = TRUE AND bps.active = TRUE
                    GROUP BY ebp.id
                ),
                author_details AS (
                    SELECT
                        ebp.id AS publication_id,
                        JSON_AGG(DISTINCT mid.name) AS authors
                    FROM edited_book_publication ebp
                    INNER JOIN edited_book_publication_all_authors bpa ON ebp.id = bpa.publication_lid
                    INNER JOIN master_input_data mid ON bpa.author_lid = mid.id
                    WHERE ebp.active = TRUE AND bpa.active = TRUE AND mid.active = TRUE
                    GROUP BY ebp.id
                )
                SELECT
                    pd.id,
                    pd.publish_year,
                    pd.title,
                    pd.isbn_no,
                    pd.publisher,
                    cd.campuses,
                    sd.schools,
                    ad.authors,
					CASE 
					WHEN fs.status_lid = 3 THEN (SELECT abbr FROM status WHERE abbr = 're')  
					ELSE CASE 
						WHEN fs.status_lid = 2 AND fs.level_lid = 1 THEN (SELECT abbr FROM status WHERE abbr = 'cp') 
						ELSE (SELECT abbr FROM status WHERE abbr = 'pd')
					END
				END AS status,
                COALESCE(fs.remarks,'No Remarks Found !') AS remarks
                FROM publication_details pd
                INNER JOIN campus_details cd ON pd.id = cd.publication_id
                INNER JOIN school_details sd ON pd.id = sd.publication_id
                INNER JOIN author_details ad ON pd.id = ad.publication_id
                LEFT JOIN form_status fs ON fs.id = pd.form_status_lid
                WHERE pd.created_by='${username}'
                {{whereClause}} ORDER BY pd.id desc`,


                placeholders: [
                  {
                      placeholder: '{{whereClause}}',
                      filters: {
                      //     'pp.program_name': filters.programName,
                      //     'ss.subject_name': filters.subjectName,
                      //     'ms.abbr': filters.abbr
                      },
                      searchColumns: ['ad.authors', 'cd.campuses', 'sd.schools','pd.publish_year','pd.title','pd.publish_year','pd.title', 'pd.isbn_no', 'pd.publisher'],
                    //   orderBy: {
                    //   column: sort || 'pd.id',
                    //   order: order || 'desc',
                    //   },
                  }
              ],
                page : page,
                pageSize: 10 ,
                search: search || '',
               //  searchColumns: ['ad.authors', 'cd.campuses', 'sd.schools','pd.publish_year','pd.title','pd.publish_year','pd.title', 'pd.isbn_no', 'pd.publisher'],
               //  sort: {
               //     column: sort || 'pd.id',
               //     order: order || 'desc',
               //  },

   })

   return data;

}



export const editedBookPublicationEditView = async(editedBookId: number) => {
    const data = await sql`
SELECT 
    ebp.id as edited_book_publication_id,
    ebp.title,
    ebp.edition,
    ebp.publisher,
    ebp.publish_year,
    ebp.publisher_category,
    ebp.web_link,
    ebp.isbn_no,
    ebp.doi_no,
    ebp.publication_place,
    ebp.nmims_authors_count,
    JSON_AGG(DISTINCT ebps.school_name) AS nmims_school,
    JSON_AGG(DISTINCT ebpc.campus_name) AS nmims_campus,
    (SELECT JSONB_AGG(row_to_json(author_data))
     FROM (
         SELECT
             mi.id,
             mi.name
         FROM edited_book_publication_all_authors ebpaa
         INNER JOIN master_input_data mi
         ON ebpaa.author_lid = mi.id
         WHERE ebpaa.publication_lid = ebp.id
           AND ebpaa.active = TRUE
           AND mi.active = TRUE
     ) AS author_data) AS all_authors,
    (SELECT JSONB_AGG(row_to_json(nmims_data))
     FROM (
         SELECT 
             mi.id,
             mi.name
         FROM edited_book_publication_authors ebpa
         INNER JOIN master_input_data mi
         ON ebpa.author_lid = mi.id
         WHERE ebpa.publication_lid = ebp.id
           AND ebpa.active = TRUE
           AND mi.active = TRUE
     ) AS nmims_data) AS nmims_authors,
    (SELECT JSONB_AGG(row_to_json(editor_data))
     FROM (
         SELECT
             mid.id,
             mid.name AS editor_name
         FROM edited_book_publication_editors ebpe
         INNER JOIN master_input_data mid
         ON ebpe.editor_lid = mid.id
         WHERE ebpe.publication_lid = ebp.id
           AND ebpe.active = TRUE
           AND mid.active = TRUE
     ) AS editor_data) AS book_editors
        FROM 
            edited_book_publication ebp
        INNER JOIN 
            edited_book_publication_school ebps 
            ON ebps.publication_lid = ebp.id
        INNER JOIN 
            edited_book_publication_campus ebpc 
            ON ebpc.publication_lid = ebp.id
        WHERE 
            ebp.id = ${editedBookId}
            AND ebp.active = TRUE
            AND ebps.active = TRUE
            AND ebpc.active = TRUE
        GROUP BY 
            ebp.id
    `

    return data;
}

export const editedBookPublicationFile = async (editedBookId:number) => {
    const data = await sql`SELECT * FROM editedbook_publication_documents WHERE publication_lid = ${editedBookId} AND active=TRUE`;
    return data;
 }

export const editedBookPublicationFormviewModel = async (editedBookId: number) => {
    const data = await sql`
    SELECT 
            bcp.id AS edited_book_id,
            bcp.title,
            bcp.edition,
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
            edited_book_publication bcp
        LEFT JOIN edited_book_publication_school bcps ON bcp.id = bcps.publication_lid
        LEFT JOIN edited_book_publication_campus bcpc ON bcp.id = bcpc.publication_lid
        LEFT JOIN edited_book_publication_all_authors bcpa ON bcp.id = bcpa.publication_lid
        LEFT JOIN master_input_data mi ON mi.id = bcpa.author_lid AND mi.active = TRUE
        LEFT JOIN edited_book_publication_authors bcpa2 ON bcp.id = bcpa2.publication_lid
        LEFT JOIN master_input_data md ON md.id = bcpa2.author_lid AND md.active = TRUE
        LEFT JOIN editedbook_publication_documents bcpd ON bcp.id = bcpd.publication_lid
        LEFT JOIN edited_book_publication_editors bce ON bcp.id = bce.publication_lid
        LEFT JOIN master_input_data mid ON bce.editor_lid = mid.id

        WHERE   
            bcp.id = ${editedBookId} AND 
            bcp.active = TRUE AND 
            bcpc.active = TRUE AND 
            bcpa.active = TRUE AND 
            bcpa2.active = TRUE AND 
            bcpd.active = TRUE
        GROUP BY 
            bcp.id`;
        
        return data;
 }
