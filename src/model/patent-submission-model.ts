import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { patentDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import { number } from 'zod';
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';

// export const getPatentSubmissionModel = async ({
//    page,
//    limit,
//    sort,
//    order,
//    search,
//    filters,
// }: paginationDefaultType) => {
//    console.log('filter', JSON.stringify(filters), { page, limit, sort, order, search, filters });

//    const data = await paginationQueryBuilder<Session>({
//       baseQuery: `
//             WITH patent_details AS (
//                 SELECT 
//                     psg.id,
//                     psg.title,
//                     psg.appln_no,
//                     psg.publication_date,
//                     ivt.invention_type,
//                     ps.patent_status
//                 FROM 
//                     patent_submission_grant psg
//                     INNER JOIN invention_type ivt ON ivt.id = psg.invention_type AND ivt.active = TRUE
//                     INNER JOIN patent_status ps ON ps.id = psg.patent_status AND ps.active = TRUE
//                 WHERE 
//                     psg.active = TRUE
//             )
//             SELECT
//                 pd.id,
//                 pd.title,
//                 pd.appln_no,
//                 TO_CHAR(pd.publication_date, 'YYYY-MM-DD') AS publication_date,
//                 pd.invention_type,
//                 pd.patent_status
//             FROM patent_details pd
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
//       searchColumns: ['pd.title', 'pd.appln_no', 'pd.publication_date', 'pd.invention_type', 'pd.patent_status'],
//       sort: {
//          column: sort || 'pd.id',
//          order: order || 'desc',
//       },
//    });

//    return data;
// };


export const getPatentSubmissionModel = async ({
    page,
    limit,
    sort,
    order,
    search,
    filters,
 }: paginationDefaultType,username:string) => {
    console.log('filter', JSON.stringify(filters), { page, limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilderWithPlaceholder<Session>({
       baseQuery: `
                 SELECT 
                     psg.id,
                     psg.title,
                     psg.appln_no,
                     psg.publication_date,
                     ivt.invention_type,
                     ps.patent_status,
                     psg.created_by,
                      CASE 
                        WHEN fs.status_lid = 3 THEN (SELECT abbr FROM status WHERE abbr = 're')  
                        ELSE CASE 
                            WHEN fs.status_lid = 2 AND fs.level_lid = 2 THEN (SELECT abbr FROM status WHERE abbr = 'cp') 
                            ELSE (SELECT abbr FROM status WHERE abbr = 'pd')
                        END
                    END AS status,
                    fs.id AS form_status_lid
                    FROM 
                     patent_submission_grant psg
                     INNER JOIN invention_type ivt ON ivt.id = psg.invention_type AND ivt.active = TRUE
                     INNER JOIN patent_status ps ON ps.id = psg.patent_status AND ps.active = TRUE
                     LEFT JOIN form_status fs ON fs.id = psg.form_status_lid
                 WHERE 
                     psg.active = TRUE AND psg.created_by='${username}' {{whereClause}} ORDER BY psg.id desc
         `,
         placeholders: [
            {
                placeholder: '{{whereClause}}',
                filters: {
                //     'pp.program_name': filters.programName,
                //     'ss.subject_name': filters.subjectName,
                //     'ms.abbr': filters.abbr
                },
                searchColumns: ['psg.title', 'psg.appln_no', 'psg.publication_date', 'ivt.invention_type',
                     'psg.patent_status'],
            //    orderBy: {
            //     column: sort || 'psg.id',
            //     order: order || 'desc',
            //     },
            }
        ],
       page: page,
       pageSize: limit || 10,
       search: search || ''
    //    searchColumns: ['pd.title', 'pd.appln_no', 'pd.publication_date', 'pd.invention_type', 'pd.patent_status'],
    //    sort: {
    //       column: sort || 'pd.id',
    //       order: order || 'desc',
    //    },
    });
 
    return data;
 };



export const insertPatentSubmissionModel = async (patentData: patentDetails,username:string) => {
   console.log('patentData ===>>>>>', patentData);

   const data = await sql`SELECT * FROM insert_patent_grant(${JSON.parse(JSON.stringify(patentData))}, ${username});`;
   return data;
};

export const patentEditViewModel = async (patentId: number) => {
   const data = await sql`SELECT 
                        psg.id AS patent_id,
                        psg.title,
                        psg.appln_no,
                        psg.publication_date,
                        psg.invention_type AS invention_id,
                        psg.patent_status AS status_id,
                        ivt.invention_type,
                        ps.patent_status,
                        COALESCE(
                            (SELECT 
                                JSONB_AGG(row_to_json(faculty_data))
                            FROM (
                                SELECT 
                                    f.id,
                                    f.faculty_name,
                                    ft.abbr
                                FROM 
                                    patent_faculty psf
                                INNER JOIN 
                                    faculties f ON psf.faculty_lid = f.id
                                INNER JOIN 
                                    faculty_type ft ON f.faculty_type_lid = ft.id
                                WHERE 
                                    psf.patent_lid = psg.id
                                    AND f.faculty_type_lid IN (SELECT id FROM faculty_type WHERE abbr='int' AND active = TRUE)
                                    AND psf.active = TRUE
                                    AND f.active = TRUE
                            ) AS faculty_data), '[]'::jsonb) AS internal_faculty,
                        COALESCE(
                            (SELECT 
                                JSONB_AGG(row_to_json(faculty_data))
                            FROM (
                                SELECT 
                                    f.id,
                                    f.faculty_name,
                                    ft.abbr
                                FROM 
                                    patent_faculty psf
                                INNER JOIN 
                                    faculties f ON psf.faculty_lid = f.id
                                INNER JOIN 
                                    faculty_type ft ON f.faculty_type_lid = ft.id
                                WHERE 
                                    psf.patent_lid = psg.id
                                    AND f.faculty_type_lid IN (SELECT id FROM faculty_type WHERE abbr='ext' AND active = TRUE)
                                    AND psf.active = TRUE
                                    AND f.active = TRUE
                            ) AS faculty_data), '[]'::jsonb) AS external_faculty,
                        COALESCE(JSON_AGG(DISTINCT psd.filename), '[]'::json) AS supporting_documents,
                        COALESCE(
                            (SELECT 
                                JSONB_AGG(row_to_json(sdg_goals_data))
                            FROM (
                                SELECT 
                                    sg.id,
                                    sg.goals_name
                                FROM 
                                    patent_sdg_goals psdg
                                INNER JOIN 
                                    sdg_goals sg ON psdg.patent_goals_lid = sg.id
                                WHERE 
                                    psdg.patent_lid = psg.id
                                    AND psdg.active = TRUE
                                    AND sg.active = TRUE
                            ) AS sdg_goals_data), '[]'::jsonb) AS sdg_goals
                    FROM 
                        patent_submission_grant psg
                    LEFT JOIN 
                        patent_grant_documents psd ON psd.patent_lid = psg.id
                    INNER JOIN 
                        invention_type ivt ON ivt.id = psg.invention_type AND ivt.active = TRUE
                    INNER JOIN 
                        patent_status ps ON ps.id = psg.patent_status AND ps.active = TRUE
                    WHERE 
                        psg.id = ${patentId} AND psg.active = TRUE
                    GROUP BY 
                        psg.id,
                        ivt.invention_type,
                        ps.patent_status
                    `;
   return data;
};

export const updatePatentSubmissionModel = async (updatePatentData: patentDetails,username:string) => {
   console.log('updatePatentData ===>>>>>', updatePatentData);

   const data = await sql`SELECT * FROM upsert_patent_grant(${JSON.parse(JSON.stringify(updatePatentData))},  ${username});`;
   return data;
};

export const viewPatentModel = async (patentId: number) => {
   const data = await sql`SELECT                        
              	psg.id AS patent_id,
				psg.title,
				psg.appln_no,
				psg.publication_date,
				psg.invention_type AS invention_id,
				psg.patent_status  AS status_id,
				ivt.invention_type,
				ps.patent_status,
            COALESCE(JSON_AGG(DISTINCT psd.filename) FILTER (WHERE psd.active = TRUE), '[]'::json) AS supporting_documents,

            COALESCE(JSON_AGG(DISTINCT f.faculty_name) FILTER (WHERE ft.abbr = 'int'), '["No Data Found"]'::json) AS internal_faculty_details,
			COALESCE(JSON_AGG(DISTINCT f.faculty_name) FILTER (WHERE ft.abbr = 'ext'), '["No Data Found"]'::json) AS external_faculty_details,
            COALESCE( JSON_AGG(DISTINCT sg.goals_name) FILTER (WHERE psdg.active = TRUE AND sg.active = TRUE), 
                '[]'::json) AS sdg_goals
        FROM 
    		patent_submission_grant psg
		LEFT JOIN 
    		patent_grant_documents psd ON psd.patent_lid = psg.id
        INNER JOIN invention_type ivt ON ivt.id = psg.invention_type AND ivt.active = TRUE
        INNER JOIN patent_status ps ON ps.id = psg.patent_status AND ps.active = TRUE
        LEFT JOIN patent_faculty psf ON psf.patent_lid = psg.id AND psf.active = TRUE
        LEFT JOIN faculties f ON psf.faculty_lid = f.id AND f.active = TRUE
        LEFT JOIN faculty_type ft ON f.faculty_type_lid = ft.id
        LEFT JOIN patent_sdg_goals psdg ON psdg.patent_lid = psg.id AND psdg.active = TRUE
        LEFT JOIN sdg_goals sg ON psdg.patent_goals_lid = sg.id AND sg.active = TRUE
        
        WHERE 
            psg.id = ${patentId}
            AND psg.active = TRUE 
        GROUP BY 
            psg.id,
            ivt.invention_type,
            ps.patent_status                        
            `;
   return data;
};

export const deletePatentSubmissionModel = async (patentId: number,username:string) => {
   console.log('patentId in  models  ====>>>>>>', patentId);

   const data =
      await sql`UPDATE patent_submission_grant SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${patentId}`;

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

export const downloadPatentFilesModel = async (patentId: number) => {
    console.log('patentId ==>>>>', patentId)
   const data = await sql`SELECT * FROM patent_grant_documents WHERE patent_lid = ${patentId} AND active=TRUE`;
   return data;
}; 


export const patentFiles = async (patentId: number) => {
    const data = await sql`SELECT * FROM patent_grant_documents WHERE patent_lid = ${patentId} AND active=TRUE`;
    return data;
 };
