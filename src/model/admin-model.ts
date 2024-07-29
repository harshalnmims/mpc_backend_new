import sql from "$config/db";
import { infiniteScrollQueryBuilder } from "$utils/db/query-builder";
import { Session } from "types/base.types";
import { paginationDefaultType } from "types/db.default";

export const getAdminCampus = async (username :string) => {
  const data = await sql`SELECT 
                         DISTINCT c.id,c.campus_name
                         FROM public.user u 
                         INNER JOIN user_campus uc ON u.id = uc.user_lid 
                         INNER JOIN campus c ON uc.campus_lid = c.id
                         WHERE u.username=${username} AND u.active = TRUE AND uc.active = TRUE
                         AND c.active = TRUE `;  
  return data;  
}

export const getAdminSchool = async (username : string) => {
  const data = await sql`SELECT
                        DISTINCT o.id,o.organization_name
                        FROM public.user u
                        INNER JOIN user_campus uc ON u.id = uc.user_lid
                        INNER JOIN campus c ON uc.campus_lid = c.id
                        INNER JOIN organization o ON c.organization_lid = o.id
                        WHERE u.username=${username} AND u.active = TRUE AND uc.active = TRUE
                        AND c.active = TRUE AND o.active = TRUE;`;
  return data;
}

export const adminPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
  console.log('admin filters ',filters)
    
    if(filters.campus === 'All'){
      delete filters.campus
    }

    if(filters.school === 'All'){
      delete filters.school
    }


  const data = await infiniteScrollQueryBuilder<Session>({
     baseQuery: `SELECT 
    DISTINCT u.id,
    u.first_name,
	  u.last_name,
	  u.username
    FROM public.user u 
    INNER JOIN user_role ur ON ur.user_lid = u.id
    INNER JOIN journal_form_status jfs ON jfs.faculty_lid = u.id
    INNER JOIN user_campus uc ON uc.user_lid = u.id
    INNER JOIN campus c ON uc.campus_lid = c.id
    INNER JOIN user_organization uo ON uo.user_lid = u.id
    INNER JOIN organization o ON uo.organization_lid = o.id
    WHERE ur.role_lid = 2
      AND jfs.level_lid = (
          SELECT level 
          FROM form_level 
          WHERE role_lid = 3 AND active = TRUE
      )
      AND jfs.status_lid = (
          SELECT id 
          FROM form_status 
          WHERE abbr = 'pd' AND active = TRUE
      )
      AND ur.active = TRUE
      AND jfs.active = TRUE
      AND c.active = TRUE
      AND uc.active = TRUE
      AND uo.active = TRUE
      AND o.active = TRUE
`,

     filters: {
        'c.id': filters.campus ,
        'o.id': filters.school ,
     },
     
     cursor: {
        column: 'u.id',
        value: Number(filters.cursor)
     },
     limit: limit.toString(),
     search: search || '',
     searchColumns: ['u.username', 'u.first_name', 'u.last_name'],
     sort: {
        column: sort || 'u.id',
        order: order || 'desc',
     },
  });

  return data;
};
