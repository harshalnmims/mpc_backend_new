import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { conferenceDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import { number } from 'zod';
import confereRoutes from '$routes/research-routes/conference-routes';
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';

// export const getConferenceModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
//    console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });

//    const data = await paginationQueryBuilder<Session>({
//       baseQuery: `WITH conference_details AS (
//                             SELECT 
//                                 c.id,
//                                 c.paper_title,
//                                 c.conference_name,
//                                 c.proceeding_published,
//                                 c.issn_no
//                             FROM conference c
//                             WHERE c.active = true
//                         ),
//                         school_details AS (
//                             SELECT
//                                 c.id AS conference_id,
//                                 JSON_AGG(DISTINCT cs.school_name) AS nmims_school
//                             FROM conference c
//                             INNER JOIN conference_school cs ON cs.conference_lid = c.id
//                             WHERE cs.active = true AND c.active = true
//                             GROUP BY c.id
//                         ),
//                         campus_details AS (
//                             SELECT
//                                 c.id AS conference_id,
//                                 JSON_AGG(DISTINCT cnc.campus_name) AS nmims_campus
//                             FROM conference c
//                             INNER JOIN conference_campus cnc ON cnc.conference_lid = c.id
//                             WHERE cnc.active = true AND c.active = true
//                             GROUP BY c.id
//                         )
//                         SELECT 
//                             cnd.id,
//                             cnd.paper_title,
//                             cnd.conference_name,
//                             cnd.proceeding_published,
//                             cnd.issn_no,
//                             sd.nmims_school,
//                             cd.nmims_campus
//                         FROM conference_details cnd
//                         LEFT JOIN school_details sd ON sd.conference_id = cnd.id
//                         LEFT JOIN campus_details cd ON cd.conference_id = cnd.id
//                                         `,
//       filters: {},
//       page: page || 1,
//       pageSize: limit || 10,
//       search: search || '',
//       searchColumns: [
//          'cnd.paper_title',
//          'sd.nmims_school',
//          'cd.nmims_campus',
//          'cnd.isbn_no',
//          'cnd.conference_name',
//          'cnd.proceeding_published',
//       ],
//       sort: {
//          column: sort || 'cnd.id',
//          order: order || 'desc',
//       },
//    });

//    return data;
// };

export const getConferenceModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
    console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilderWithPlaceholder<Session>({
       baseQuery: `WITH conference_details AS (
                             SELECT 
                                 c.id,
                                 c.paper_title,
                                 c.conference_name,
                                 c.proceeding_published,
                                 c.issn_no
                             FROM conference c
                             WHERE c.active = true
                         ),
                         school_details AS (
                             SELECT
                                 c.id AS conference_id,
                                 JSON_AGG(DISTINCT cs.school_name) AS nmims_school
                             FROM conference c
                             INNER JOIN conference_school cs ON cs.conference_lid = c.id
                             WHERE cs.active = true AND c.active = true
                             GROUP BY c.id
                         ),
                         campus_details AS (
                             SELECT
                                 c.id AS conference_id,
                                 JSON_AGG(DISTINCT cnc.campus_name) AS nmims_campus
                             FROM conference c
                             INNER JOIN conference_campus cnc ON cnc.conference_lid = c.id
                             WHERE cnc.active = true AND c.active = true
                             GROUP BY c.id
                         )
                         SELECT 
                             cnd.id,
                             cnd.paper_title,
                             cnd.conference_name,
                             cnd.proceeding_published,
                             cnd.issn_no,
                             sd.nmims_school,
                             cd.nmims_campus
                         FROM conference_details cnd
                         INNER JOIN school_details sd ON sd.conference_id = cnd.id
                         INNER JOIN campus_details cd ON cd.conference_id = cnd.id
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
                                                searchColumns: ['cnd.paper_title',
                                                    'sd.nmims_school',
                                                    'cd.nmims_campus',
                                                    'cnd.issn_no',
                                                    'cnd.conference_name',
                                                    'cnd.proceeding_published',],
                                                orderBy: {
                                                column: sort || 'cnd.id',
                                                order: order || 'desc',
                                                },
                                            }
                                        ],
       page: page || 1,
       pageSize: limit || 10,
       search: search || '',
    //    searchColumns: [
    //       'cnd.paper_title',
    //       'sd.nmims_school',
    //       'cd.nmims_campus',
    //       'cnd.isbn_no',
    //       'cnd.conference_name',
    //       'cnd.proceeding_published',
    //    ],
    //    sort: {
    //       column: sort || 'cnd.id',
    //       order: order || 'desc',
    //    },
    });
 
    return data;
 };



export const insertConferenceModel = async (conferenceData: conferenceDetails,username: string) => {
   console.log('conferenceData ===>>>>>', conferenceData);

   const data = await sql`SELECT * FROM insert_conference(${JSON.parse(JSON.stringify(conferenceData))}, ${username});`;
   return data;
};

export const updateConferencemodels = async (updateConferenceData: conferenceDetails,username: string) => {
   console.log('updateConferenceData in models  ===>>>>>', updateConferenceData);

   const data = await sql`SELECT * FROM upsert_conference(${JSON.parse(JSON.stringify(updateConferenceData))},  ${username});`;
   return data;
};

export const deleteConferenceModel = async (conferenceId: number, username: string) => {
   console.log('conferenceId models  ====>>>>>>', conferenceId);

   const data =
      await sql`UPDATE conference SET active = false,modified_date=now(),modified_by= ${username} WHERE id = ${conferenceId}`;

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

export const getConferenceDocumentsAbbr = async () => {
   const data = await sql`SELECT id,abbr FROM conference_documents_abbr WHERE active=TRUE`;
   return data;
};

export const conferenceEditViewModel = async (conferenceId: number) => {
   const data = await sql`
             		SELECT 
                c.id AS conference_id,
                c.paper_title,
                c.conference_name,
                c.place,
                c.presenting_author,
                c.proceeding_published,
                c.conference_type,
                c.issn_no,
                c.doi_no,
                c.publication_date,
                c.amount,
                c.sponsored,
                c.organizing_body,
                c.volume_no,
                JSON_AGG(DISTINCT ca.author_lid) AS all_authors,
                JSON_AGG(DISTINCT cc.campus_name) AS nmims_campus,
                JSON_AGG(DISTINCT cs.school_name) AS nmims_school,
                JSON_AGG(DISTINCT cd.document_name) AS conference_documents,
                COALESCE(
                (SELECT 
                    JSONB_AGG(row_to_json(faculty_data))
                FROM (
                    SELECT 
                        f.id,
                        f.faculty_name,
                        ft.abbr
                    FROM 
                        conference_faculty cf
                    INNER JOIN 
                        faculties f
                    ON 
                        cf.faculty_lid = f.id
                    INNER JOIN 
                        faculty_type ft
                    ON 
                        f.faculty_type_lid = ft.id
                    WHERE 
                        cf.conference_lid = c.id
                        AND f.faculty_type_lid IN (SELECT id FROM faculty_type WHERE abbr='int' AND ACTIVE = TRUE)
                        AND cf.active = TRUE
                        AND f.active = TRUE
                ) AS faculty_data),'[]') AS internal_faculty,
				
				COALESCE((SELECT 
                    JSONB_AGG(row_to_json(faculty_data))
                FROM (
                    SELECT 
                        f.id,
                        f.faculty_name,
                        ft.abbr
                    FROM 
                        conference_faculty cf
                    INNER JOIN 
                        faculties f
                    ON 
                        cf.faculty_lid = f.id
                    INNER JOIN 
                        faculty_type ft
                    ON 
                        f.faculty_type_lid = ft.id
                    WHERE 
                        cf.conference_lid = c.id
                        AND f.faculty_type_lid IN (SELECT id FROM faculty_type WHERE abbr='ext' AND ACTIVE = TRUE)
                        AND cf.active = TRUE
                        AND f.active = TRUE
                ) AS faculty_data),'[]') AS external_faculty,

                (SELECT 
                    JSONB_AGG(row_to_json(author_data))
                FROM (
                    SELECT 
                        mi.id,
                        mi.name
                    FROM 
                        conference_all_authors caa
                    INNER JOIN 
                        master_input_data mi
                    ON 
                        caa.author_lid = mi.id
                    WHERE 
                        caa.conference_lid = c.id
                        AND caa.active = TRUE
                        AND mi.active = TRUE
                ) AS author_data) AS all_authors,

                (SELECT 
                    JSONB_AGG(row_to_json(sponsor_data))
                FROM (
                    SELECT 
                        s.id,
                        s.name
                    FROM 
                        public.sponsored s
                    WHERE 
                        s.id = c.sponsored
                ) AS sponsor_data) AS sponsor_details
            FROM 
                public.conference c
            LEFT JOIN 
                public.conference_all_authors ca ON ca.conference_lid = c.id AND ca.active = TRUE
            LEFT JOIN 
                public.conference_campus cc ON cc.conference_lid = c.id AND cc.active = TRUE
            LEFT JOIN 
                public.conference_school cs ON cs.conference_lid = c.id AND cs.active = TRUE
            LEFT JOIN 
                public.conference_documents cd ON cd.conference_lid = c.id AND cd.active = TRUE
            WHERE 
                c.id = ${conferenceId}
                AND c.active = TRUE
            GROUP BY 
                c.id		
			
				
    `;
   return data;
};

export const conferenceViewModel = async (conferenceId: number) => {
   const data = await sql`SELECT 
                c.id AS conference_id,
                c.paper_title,
                c.conference_name,
                c.place,
                c.presenting_author,
                c.proceeding_published,
                c.conference_type,
                c.issn_no,
                c.doi_no,
                c.publication_date,
                c.amount,
                c.sponsored,
                c.organizing_body,
                c.volume_no,
                COALESCE(JSON_AGG(DISTINCT md.name), '[]'::json) AS all_authors,
                COALESCE(JSON_AGG(DISTINCT cs.school_name), '[]'::json) AS nmims_school,
                COALESCE(JSON_AGG(DISTINCT cc.campus_name), '[]'::json) AS nmims_campus,
                JSON_AGG(DISTINCT cd.filename) FILTER (WHERE cda.abbr = 'cd') AS conference_documents,
                JSON_AGG(DISTINCT cd.filename) FILTER (WHERE cda.abbr = 'ad') AS conference_awards,
                COALESCE(JSON_AGG(DISTINCT f.faculty_name) FILTER (WHERE ft.abbr = 'int'), '["No Data Found"]'::json) AS internal_faculty_details,
				COALESCE(JSON_AGG(DISTINCT f.faculty_name) FILTER (WHERE ft.abbr = 'ext'), '["No Data Found"]'::json) AS external_faculty_details,
                COALESCE(MAX(s.id), 0) AS sponsor_details
            FROM 
                public.conference c
            LEFT JOIN 
                public.conference_all_authors ca ON ca.conference_lid = c.id AND ca.active = TRUE
            LEFT JOIN 
                master_input_data md ON md.id = ca.author_lid AND md.active = TRUE
            LEFT JOIN 
                public.conference_campus cc ON cc.conference_lid = c.id AND cc.active = TRUE
            LEFT JOIN 
                public.conference_school cs ON cs.conference_lid = c.id AND cs.active = TRUE
            LEFT JOIN 
                public.conference_documents cd ON cd.conference_lid = c.id AND cd.active = TRUE
            LEFT JOIN 
                public.conference_documents_abbr cda ON cd.input_abbr = cda.id
            LEFT JOIN 
                conference_faculty cf ON cf.conference_lid = c.id AND cf.active = TRUE
            LEFT JOIN 
                faculties f ON f.id = cf.faculty_lid AND f.active = TRUE
            LEFT JOIN 
                faculty_type ft ON f.faculty_type_lid = ft.id
            LEFT JOIN 
                public.sponsored s ON s.id = c.sponsored
            WHERE 
                c.id = ${conferenceId}
                AND c.active = TRUE
            GROUP BY 
                c.id`;
   return data;
};

export const conferenceFilesModel = async (conferenceId: number, abbr: string) => {
   console.log('conferenceId in model  ===>>>', conferenceId);
   console.log('abbr in model ===>>>', abbr);

   const data = await sql`
            SELECT 
                cd.id AS document_id,
                cd.conference_lid,
                cd.document_name,
                cd.active,
                cda.abbr
            FROM 
                public.conference_documents cd
            INNER JOIN 
                public.conference_documents_abbr cda ON cd.input_abbr = cda.id
            WHERE 
                cd.conference_lid = ${conferenceId}
                AND cda.abbr = ${abbr}
                AND cd.active = TRUE
                AND cda.active = TRUE;
`;

   return data;
};


export const getConferenceFilesModel = async (conferenceId: number) => {
    const data = await sql`SELECT cd.document_name, cd.filename, cda.abbr 
        FROM conference_documents cd
        INNER JOIN conference_documents_abbr cda 
        ON cd.input_abbr = cda.id 
        WHERE cd.conference_lid = ${conferenceId} AND cd.active = TRUE AND cda.active = TRUE`;
    return data;
 }

