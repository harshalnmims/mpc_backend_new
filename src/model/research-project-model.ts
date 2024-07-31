import { Campus, Program, Session } from 'types/base.types';
import { researchProjectDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import { number } from 'zod';
import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';

export const ResearchProjectPaginateModel = async ({
   page,
   limit,
   sort,
   order,
   search,
   filters,
}: paginationDefaultType) => {
   console.log('filter', JSON.stringify(filters), { page, limit, sort, order, search, filters });

   const data = await paginationQueryBuilder<Session>({
      baseQuery: `WITH research_project_details AS (
                            SELECT 
                                rp.id,
                                rp.title,
                                rp.funding_amount,
                                rp.funding_agency,
                                rp.thrust_area
                            FROM research_project rp
                            WHERE rp.active = TRUE
                        ),
                        school_details AS (
                            SELECT
                                rp.id AS research_project_id,
                                JSON_AGG(DISTINCT rps.school_name) AS nmims_school
                            FROM research_project rp
                            INNER JOIN research_project_school rps ON rps.research_project_lid = rp.id
                            WHERE rp.active = TRUE AND rps.active = TRUE
                            GROUP BY rp.id
                        ),
                        campus_details AS (
                            SELECT
                                rp.id AS research_project_id,
                                JSON_AGG(DISTINCT rpc.campus_name) AS nmims_campus
                            FROM research_project rp
                            INNER JOIN research_project_campus rpc ON rpc.research_project_lid = rp.id
                            WHERE rp.active = TRUE AND rpc.active = TRUE
                            GROUP BY rp.id
                        )
                        SELECT
                            rpd.id,
                            rpd.title,
                            rpd.funding_amount,
                            rpd.funding_agency,
                            rpd.thrust_area,
                            sd.nmims_school,
                            cd.nmims_campus
                        FROM research_project_details rpd
                        LEFT JOIN school_details sd ON rpd.id = sd.research_project_id
                        LEFT JOIN campus_details cd ON rpd.id = cd.research_project_id`,
      filters: {
         // Define any necessary filters here
      },
      page: page,
      pageSize: limit || 10,
      search: search || '',
      searchColumns: ['rpd.title', 'sd.nmims_school', 'cd.nmims_campus', 'rpd.funding_agency', 'rpd.thrust_area'],
      sort: {
         column: sort || 'rpd.id',
         order: order || 'desc',
      },
   });

   return data;
};

export const insertResearchProjectModel = async (researchData: researchProjectDetails,username:string) => {
   console.log('researchData ===>>>>>', researchData);                                               

   const data = await sql`SELECT * FROM insert_research_project(${JSON.parse(JSON.stringify(researchData))}, ${username});`;
   return data;
};

export const researchProjectEditViewModel = async (researchProjectId: number) => {
   const data = await sql`SELECT                        
                    rp.id AS research_project_id,
                    rp.title,
                    rp.thrust_area,
                    rp.grant_proposal,
                    rp.grant_type,
                    rp.funding_amount,
                    rp.funding_agency,
                    rp.scheme,
                    rp.received_amount,
					rp.grant_date,
					rp.duration,
					rp.payment_date,
                    rp.research_status  AS status_id,
                    rs.status as research_status,
                    COALESCE(JSON_AGG(DISTINCT rps.school_name), '[]'::json) AS nmims_school,
                    COALESCE(JSON_AGG(DISTINCT rpc.campus_name), '[]'::json) AS nmims_campus,
                    COALESCE(JSON_AGG(DISTINCT rpd.filename), '[]'::json) AS supporting_documents,
                     		  COALESCE(
                (SELECT 
                    JSONB_AGG(row_to_json(faculty_data))
                FROM (
                    SELECT 
                        f.id,
                        f.faculty_name,
                        ft.abbr
                    FROM 
                        research_project_faculty rpf
                    INNER JOIN 
                        faculties f
                    ON 
                        rpf.faculty_lid = f.id
                    INNER JOIN 
                        faculty_type ft
                    ON 
                        f.faculty_type_lid = ft.id
                    WHERE 
                        rpf.research_project_lid = rp.id
                        AND f.faculty_type_lid IN (SELECT id FROM faculty_type WHERE abbr='int' AND ACTIVE = TRUE)
                        AND rpf.active = TRUE
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
                         research_project_faculty rpf
                    INNER JOIN 
                        faculties f
                    ON 
                        rpf.faculty_lid = f.id
                    INNER JOIN 
                        faculty_type ft
                    ON 
                        f.faculty_type_lid = ft.id
                    WHERE 
                        rpf.research_project_lid = rp.id
                        AND f.faculty_type_lid IN (SELECT id FROM faculty_type WHERE abbr='ext' AND ACTIVE = TRUE)
                        AND rpf.active = TRUE
                        AND f.active = TRUE
                ) AS faculty_data),'[]') AS external_faculty
                    
                    
                FROM 
                    research_project rp
                INNER JOIN research_project_school rps ON rps.research_project_lid = rp.id
                INNER JOIN research_project_campus rpc ON rpc.research_project_lid = rp.id
                LEFT JOIN research_project_documents rpd ON rpd.research_project_lid = rp.id
                INNER JOIN research_project_status rs ON rs.id = rp.research_status AND rs.active = TRUE
                WHERE 
                    rp.id =  ${researchProjectId}
                    AND rps.active = TRUE 
                    AND rpc.active = TRUE 
                GROUP BY 
                    rp.id,
                    rs.status`;
   return data;
};

export const updateResearchProjectModel = async (updateResearchData: researchProjectDetails,username:string) => {
   console.log('updateResearchData ===>>>>>', updateResearchData);

   const data =
      await sql`SELECT * FROM upsert_research_project(${JSON.parse(JSON.stringify(updateResearchData))}, ${username});`;
   return data;
};

export const viewResearchProjectModel = async (researchProjectId: number,username:string) => {
   const data = await sql`SELECT                        
            		rp.id AS research_project_id,
                    rp.title,
                    rp.thrust_area,
                    rp.grant_proposal,
                    rp.grant_type,
                    rp.funding_amount,
                    rp.funding_agency,
                    rp.scheme,
                    rp.received_amount,
					rp.grant_date,
					rp.duration,
					rp.payment_date,
                    rp.research_status  AS status_id,
                    rs.status as research_status,
            COALESCE(JSON_AGG(DISTINCT rps.school_name) FILTER (WHERE rps.active = TRUE), '[]'::json) AS nmims_school,
            COALESCE(JSON_AGG(DISTINCT rpc.campus_name) FILTER (WHERE rpc.active = TRUE), '[]'::json) AS nmims_campus,
            COALESCE(JSON_AGG(DISTINCT rpd.filename) FILTER (WHERE rpd.active = TRUE), '[]'::json) AS supporting_documents,
            COALESCE(JSON_AGG(DISTINCT f.faculty_name) FILTER (WHERE ft.abbr = 'int'), '["No Data Found"]'::json) AS internal_faculty_details,
			COALESCE(JSON_AGG(DISTINCT f.faculty_name) FILTER (WHERE ft.abbr = 'ext'), '["No Data Found"]'::json) AS external_faculty_details
            
         FROM 
                    research_project rp
         INNER JOIN research_project_school rps ON rps.research_project_lid = rp.id
         INNER JOIN research_project_campus rpc ON rpc.research_project_lid = rp.id
         LEFT JOIN research_project_documents rpd ON rpd.research_project_lid = rp.id
         INNER JOIN research_project_status rs ON rs.id = rp.research_status AND rs.active = TRUE
        LEFT JOIN research_project_faculty rpf ON rpf.research_project_lid = rp.id AND rpf.active = TRUE
        LEFT JOIN faculties f ON rpf.faculty_lid = f.id AND f.active = TRUE
        LEFT JOIN faculty_type ft ON f.faculty_type_lid = ft.id
        WHERE 
            rp.id = ${researchProjectId}
            AND rps.active = TRUE 
            AND rpc.active = TRUE 
        GROUP BY 
            rp.id,
            rs.status`;
   return data;
};

export const deleteResearchProjectModel = async (researchProjectId: number,username:string) => {
   console.log('researchprojectId in  models  ====>>>>>>', researchProjectId);

   const data =
      await sql`UPDATE research_project SET active = false,modified_date=now(),modified_by= ${username} WHERE id = ${researchProjectId}`;

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

export const downloadResearchProjectFilesModel = async (researchProjectId: number) => {
   const data =
      await sql`SELECT * FROM research_project_documents WHERE research_project_lid = ${researchProjectId} AND active=TRUE`;
   return data;
}; 



export const researchProjectFiles = async (researchProjectId: number) => {
    const data = await sql`SELECT * FROM research_project_documents WHERE research_project_lid = ${researchProjectId} AND active=TRUE`;
    return data;
 };