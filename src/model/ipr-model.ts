import { IPRDetails } from 'types/research.types';

import sql from '$config/db';

import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';

import { Campus, Program, Session } from 'types/base.types';

import { paginationDefaultType } from 'types/db.default';

import { HTTP_STATUS } from '$constants/http.constant';

import { CustomError } from '$utils/error/customError';
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';

// export const iprPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
//    console.log('filter', JSON.stringify(filters), { page, limit, sort, order, search, filters });

//    const data = await paginationQueryBuilder<Session>({
//       baseQuery: `WITH ipr_details AS (

//                         SELECT 

//                             ipr.id,

//                             ipr.title,

//                             ipr.appln_no,

//                             ipr.filed_date,

//                             ipr.institute_affiliation

//                         FROM ipr ipr

//                         WHERE ipr.active = TRUE

//                     ),

//                     school_details AS (

//                         SELECT

//                             ipr.id AS ipr_id,

//                             JSON_AGG(DISTINCT ips.school_name) AS nmims_school

//                         FROM ipr ipr

//                         INNER JOIN ipr_school ips ON ips.ipr_lid = ipr.id

//                         WHERE ipr.active = TRUE AND ips.active = TRUE

//                         GROUP BY ipr.id

//                     ),

//                     campus_details AS (

//                         SELECT

//                             ipr.id AS ipr_id,

//                             JSON_AGG(DISTINCT ic.campus_name) AS nmims_campus

//                         FROM ipr ipr

//                         INNER JOIN ipr_campus ic ON ic.ipr_lid = ipr.id

//                         WHERE ipr.active = TRUE AND ic.active = TRUE

//                         GROUP BY ipr.id

//                     )

//                     SELECT

//                         ipd.id,

//                         ipd.title,

//                         ipd.appln_no,

//                         TO_CHAR(ipd.filed_date, 'YYYY-MM-DD') AS filed_date,

//                         ipd.institute_affiliation,

//                         sd.nmims_school,

//                         cd.nmims_campus

//                     FROM ipr_details ipd

//                     INNER JOIN school_details sd ON ipd.id = sd.ipr_id

//                     INNER JOIN campus_details cd ON ipd.id = cd.ipr_id

//         `,

//       filters: {
//          // Define any necessary filters here
//          // 'usi.program_lid': filters.programLid,
//          // 'usi.session_lid': filters.sessionLid,
//          // 'usi.subject_lid': filters.subjectLid,
//       },

//       page: page,

//       pageSize: limit || 10,

//       search: search || '',

//       searchColumns: [
//          'ipr.title',

//          'sd.nmims_school',

//          'cd.nmims_campus',

//          'ipr.appln_no',

//          'ipr.filed_date',

//          'ipr.institute_affiliation',
//       ],

//       sort: {
//          column: sort || 'ipd.id',

//          order: order || 'desc',
//       },
//    });

//    return data;
// };

export const iprPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType,username:string) => {
    console.log('filter', JSON.stringify(filters), { page, limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilderWithPlaceholder<Session>({
       baseQuery: `WITH ipr_details AS (
 
                         SELECT 
 
                             ipr.id,
 
                             ipr.title,
 
                             ipr.appln_no,
 
                             ipr.filed_date,
 
                             ipr.institute_affiliation,
                             ipr.created_by,
                             ipr.form_status_lid
 
                         FROM ipr ipr
 
                         WHERE ipr.active = TRUE
 
                     ),
 
                     school_details AS (
 
                         SELECT
 
                             ipr.id AS ipr_id,
 
                             JSON_AGG(DISTINCT ips.school_name) AS nmims_school
 
                         FROM ipr ipr
 
                         INNER JOIN ipr_school ips ON ips.ipr_lid = ipr.id
 
                         WHERE ipr.active = TRUE AND ips.active = TRUE
 
                         GROUP BY ipr.id
 
                     ),
 
                     campus_details AS (
 
                         SELECT
 
                             ipr.id AS ipr_id,
 
                             JSON_AGG(DISTINCT ic.campus_name) AS nmims_campus
 
                         FROM ipr ipr
 
                         INNER JOIN ipr_campus ic ON ic.ipr_lid = ipr.id
 
                         WHERE ipr.active = TRUE AND ic.active = TRUE
 
                         GROUP BY ipr.id
 
                     )
 
                     SELECT
 
                         ipd.id,
 
                         ipd.title,
 
                         ipd.appln_no,
 
                         TO_CHAR(ipd.filed_date, 'YYYY-MM-DD') AS filed_date,
 
                         ipd.institute_affiliation,
 
                         sd.nmims_school,
 
                         cd.nmims_campus,
                         CASE 
                            WHEN fs.status_lid = 3 THEN (SELECT abbr FROM status WHERE abbr = 're')  
                            ELSE CASE 
                                WHEN fs.status_lid = 2 AND fs.level_lid = 2 THEN (SELECT abbr FROM status WHERE abbr = 'cp') 
                                ELSE (SELECT abbr FROM status WHERE abbr = 'pd')
                            END
                        END AS status,
                        fs.id AS form_status_lid
 
                     FROM ipr_details ipd
 
                     INNER JOIN school_details sd ON ipd.id = sd.ipr_id
 
                     INNER JOIN campus_details cd ON ipd.id = cd.ipr_id
                     LEFT JOIN form_status fs ON fs.id = ipd.form_status_lid
                     WHERE ipd.created_by='${username}'
                     {{whereClause}} ORDER BY ipd.id desc
 
         `,
 
         placeholders: [
            {
                placeholder: '{{whereClause}}',
                filters: {
                //     'pp.program_name': filters.programName,
                //     'ss.subject_name': filters.subjectName,
                //     'ms.abbr': filters.abbr
                },
                searchColumns: ['ipd.title',
 
          'sd.nmims_school',
 
          'cd.nmims_campus',
 
          'ipd.appln_no',
 
          'ipd.filed_date',
 
          'ipd.institute_affiliation'],
                // sort: {
                // column: sort || 'ipd.id',
                // order: order || 'desc',
                // },
            }
        ],
 
       page: page,
 
       pageSize: limit || 10,
 
       search: search || '',
 
    //    searchColumns: [
    //       'ipr.title',
 
    //       'sd.nmims_school',
 
    //       'cd.nmims_campus',
 
    //       'ipr.appln_no',
 
    //       'ipr.filed_date',
 
    //       'ipr.institute_affiliation',
    //    ],
 
    //    sort: {
    //       column: sort || 'ipd.id',
 
    //       order: order || 'desc',
    //    },
    });
 
    return data;
 };

export const insertIPRModel = async (iprDetails: IPRDetails,username:string) => {
   const data = await sql`SELECT * FROM insert_ipr(${JSON.parse(JSON.stringify(iprDetails))}, ${username});`;

   return data;
};

export const iprEditViewModel = async (iprId: number) => {
   const data = await sql`SELECT                        
                    ipr.id AS ipr_id,
                    ipr.title,
                    ipr.appln_no,
                    ipr.filed_date,
                    ipr.grant_date,
                    ipr.published_date,
                    ipr.publication_no,
                    ipr.granted_no,
                    ipr.institute_affiliation,
                    ipr.invention_type AS invention_id,
                    ipr.patent_status  AS status_id,
                    ivt.invention_type,
                    ps.patent_status,
                    COALESCE(JSON_AGG(DISTINCT ips.school_name), '[]'::json) AS nmims_school,
                    COALESCE(JSON_AGG(DISTINCT ipc.campus_name), '[]'::json) AS nmims_campus,
                    COALESCE(JSON_AGG(DISTINCT ipd.filename), '[]'::json) AS supporting_documents,
                    
					  COALESCE(
                (SELECT 
                    JSONB_AGG(row_to_json(faculty_data))
                FROM (
                    SELECT 
                        f.id,
                        f.faculty_name,
                        ft.abbr
                    FROM 
                        ipr_faculty ipf
                    INNER JOIN 
                        faculties f
                    ON 
                        ipf.faculty_lid = f.id
                    INNER JOIN 
                        faculty_type ft
                    ON 
                        f.faculty_type_lid = ft.id
                    WHERE 
                        ipf.ipr_lid = ipr.id
                        AND f.faculty_type_lid IN (SELECT id FROM faculty_type WHERE abbr='int' AND ACTIVE = TRUE)
                        AND ipf.active = TRUE
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
                         ipr_faculty ipf
                    INNER JOIN 
                        faculties f
                    ON 
                        ipf.faculty_lid = f.id
                    INNER JOIN 
                        faculty_type ft
                    ON 
                        f.faculty_type_lid = ft.id
                    WHERE 
                        ipf.ipr_lid = ipr.id
                        AND f.faculty_type_lid IN (SELECT id FROM faculty_type WHERE abbr='ext' AND ACTIVE = TRUE)
                        AND ipf.active = TRUE
                        AND f.active = TRUE
                ) AS faculty_data),'[]') AS external_faculty,
                    COALESCE(
                        (SELECT 
                            JSONB_AGG(row_to_json(sdg_goals_data))
                        FROM (
                            SELECT 
                                sg.id,
                                sg.goals_name
                            FROM 
                                ipr_sdg_goals isg
                            INNER JOIN 
                                sdg_goals sg 
                            ON 
                                isg.goals_lid = sg.id
                            WHERE 
                                isg.ipr_lid = ipr.id
                                AND isg.active = TRUE
                                AND sg.active = TRUE
                        ) AS sdg_goals_data), 
                        '[]'::jsonb
                    ) AS sdg_goals,
                    COALESCE(
                        (SELECT 
                            JSONB_AGG(row_to_json(applicant_data))
                        FROM (
                            SELECT 
                                ma.id,
                                ma.name
                            FROM 
                                ipr_applicants ipra
                            INNER JOIN 
                                master_input_data ma 
                            ON 
                                ipra.applicant_lid = ma.id
                            WHERE 
                                ipra.ipr_lid = ipr.id
                                AND ipra.active = TRUE
                                AND ma.active = TRUE
                        ) AS applicant_data), 
                        '[]'::jsonb
                    ) AS applicant_names
                FROM 
                    ipr
                INNER JOIN ipr_school ips ON ips.ipr_lid = ipr.id
                INNER JOIN ipr_campus ipc ON ipc.ipr_lid = ipr.id
                LEFT JOIN ipr_documents ipd ON ipd.ipr_lid = ipr.id
                INNER JOIN invention_type ivt ON ivt.id = ipr.invention_type AND ivt.active = TRUE
                INNER JOIN patent_status ps ON ps.id = ipr.patent_status AND ps.active = TRUE
                WHERE 
                    ipr.id = ${iprId}
                    AND ips.active = TRUE 
                    AND ipc.active = TRUE 
                GROUP BY 
                    ipr.id,
                    ivt.invention_type,
                    ps.patent_status`;
   return data;
};

export const updateIPRModel = async (updateIprDetails: IPRDetails,username:string) => {
   const data = await sql`SELECT * FROM upsert_ipr(${JSON.parse(JSON.stringify(updateIprDetails))}, ${username});`;

   return data;
};

export const viewIprModel = async (iprId: number) => {
   const data = await sql`SELECT                        
                            ipr.id AS ipr_id,
                            ipr.title,
                            ipr.appln_no,
                            COALESCE(ipr.filed_date, NULL) AS filed_date,
                            COALESCE(ipr.grant_date, NULL) AS grant_date,
                            COALESCE(ipr.published_date, NULL) AS published_date,
                            ipr.publication_no,
                            ipr.granted_no,
                            ipr.institute_affiliation,
                            ipr.invention_type AS invention_id,
                            ipr.patent_status  AS status_id,
                            ivt.invention_type,
                            ps.patent_status,
                            COALESCE(JSON_AGG(DISTINCT ips.school_name) FILTER (WHERE ips.active = TRUE), '[]'::json) AS nmims_school,
                            COALESCE(JSON_AGG(DISTINCT ipc.campus_name) FILTER (WHERE ipc.active = TRUE), '[]'::json) AS nmims_campus,
                            COALESCE(JSON_AGG(DISTINCT ipd.filename) FILTER (WHERE ipd.active = TRUE), '[]'::json) AS supporting_documents,
                            COALESCE(
                                JSON_AGG(DISTINCT f.faculty_name) FILTER (WHERE ft.abbr = 'int'), 
                                '["No Data Found"]'::json
                            ) AS internal_faculty_details,
                            COALESCE(
                                JSON_AGG(DISTINCT f.faculty_name) FILTER (WHERE ft.abbr = 'ext'), 
                                '["No Data Found"]'::json
                            ) AS external_faculty_details,
                            COALESCE(
                                JSON_AGG(DISTINCT sg.goals_name) FILTER (WHERE isg.active = TRUE AND sg.active = TRUE), 
                                '["No Data Found"]'::json
                            ) AS sdg_goals,
                            COALESCE(
                                JSON_AGG(DISTINCT ma.name) FILTER (WHERE ipra.active = TRUE AND ma.active = TRUE), 
                                '["No Data Found"]'::json
                            ) AS applicants_names
                        FROM 
                            ipr
                        INNER JOIN ipr_school ips ON ips.ipr_lid = ipr.id
                        INNER JOIN ipr_campus ipc ON ipc.ipr_lid = ipr.id
                        LEFT JOIN ipr_documents ipd ON ipd.ipr_lid = ipr.id
                        INNER JOIN invention_type ivt ON ivt.id = ipr.invention_type AND ivt.active = TRUE
                        INNER JOIN patent_status ps ON ps.id = ipr.patent_status AND ps.active = TRUE
                        LEFT JOIN ipr_faculty ipf ON ipf.ipr_lid = ipr.id AND ipf.active = TRUE
                        LEFT JOIN faculties f ON ipf.faculty_lid = f.id AND f.active = TRUE
                        LEFT JOIN faculty_type ft ON f.faculty_type_lid = ft.id
                        LEFT JOIN ipr_sdg_goals isg ON isg.ipr_lid = ipr.id AND isg.active = TRUE
                        LEFT JOIN sdg_goals sg ON isg.goals_lid = sg.id AND sg.active = TRUE
                        LEFT JOIN ipr_applicants ipra ON ipra.ipr_lid = ipr.id AND ipra.active = TRUE
                        LEFT JOIN master_input_data ma ON ipra.applicant_lid = ma.id AND ma.active = TRUE
                        WHERE 
                            ipr.id = ${iprId}
                            AND ips.active = TRUE 
                            AND ipc.active = TRUE 
                        GROUP BY 
                            ipr.id,
                            ivt.invention_type,
                            ps.patent_status`;

   return data;
};

export const deleteIPRModel = async (iprId: number,username:string) => {
   const data = await sql`UPDATE ipr SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${iprId}`;

    return data.count > 0 ? {
    status:200,
    message:'Deleted Successfully !'
} : {
    status:400,
    message:'Failed To Delete !'
};
};

export const downloadIprFilesModel = async (iprId: number) => {
   const data = await sql`SELECT * FROM ipr_documents WHERE ipr_lid = ${iprId} AND active=TRUE`;
   return data;
}; 

export const iprFiles = async (iprId: number) => {
    const data = await sql`SELECT * FROM ipr_documents WHERE ipr_lid = ${iprId} AND active=TRUE`;
    return data;
 };
 
