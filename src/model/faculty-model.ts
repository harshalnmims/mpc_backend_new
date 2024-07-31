import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { facultyDetails, facultyUpdateDetails } from 'types/research.types';


export const facultyPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
    console.log('filter ',JSON.stringify(filters) , { page , limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilder<Session>({
       baseQuery: `SELECT 
                    f.id,
                    f.faculty_name,
                    f.institute_name,
                    f.address,
                    f.designation,
                    ft.faculty_type
                    FROM faculties f 
                    INNER JOIN faculty_type ft ON f.faculty_type_lid = ft.id
                    WHERE f.active = TRUE AND ft.active = TRUE
 `,
 
       filters: {
          // 'usi.program_lid': filters.programLid,
          // 'usi.session_lid': filters.sessionLid,
          // 'usi.subject_lid': filters.subjectLid,
       },
       page : page,
       pageSize: 10 ,
       search: search || '',
       searchColumns: ['f.faculty_name','f.institute_name','f.address','f.designation','ft.faculty_type'],
       sort: {
          column: sort || 'f.id',
          order: order || 'desc',
       },
    });
 
    return data;
 };

 export const facultyScrollPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Session>({
      baseQuery: `SELECT DISTINCT u.id,u.first_name,u.last_name,u.username FROM public.user u INNER JOIN user_role ur ON u.id = ur.user_lid 
      WHERE ur.role_lid = 2 AND u.active = TRUE AND ur.active = TRUE 
      AND u.id NOT IN (SELECT DISTINCT faculty_lid FROM faculties WHERE active = TRUE AND faculty_lid IS NOT NULL)`,

      filters: {
         // 'usi.program_lid': filters.programLid,
         // 'usi.session_lid': filters.sessionLid,
         // 'usi.subject_lid': filters.subjectLid,
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

export const facultyRenderModel = async () => {
   const data = await sql`SELECT faculty_type,id FROM faculty_type WHERE active = TRUE `;
   return data;
}

export const insertFacultyModel = async (facultyDetails : facultyDetails,username:string) => {
   const data = await sql`SELECT * FROM insert_faculty_master(${JSON.parse(JSON.stringify(facultyDetails))}, ${username});`;
    return data;
}

export const facultyViewModel = async (facultyId : number) => {
   const data =  await sql`SELECT 
                           u.first_name,
                           u.last_name,
                           u.username,
                           f.institute_name,
                           f.address,
                           f.designation,
                           ft.faculty_type
                           FROM faculties f 
                           INNER JOIN public.user u ON f.faculty_lid = u.id
                           INNER JOIN faculty_type ft ON ft.id = f.faculty_type_lid 
                           WHERE f.active = TRUE AND u.active = TRUE AND ft.active = TRUE
                           AND f.id = ${facultyId};`;
    return data;
}

export const facultyDeleteModel = async (facultyId : number) => {
   const data =  await sql`UPDATE faculties SET active = FALSE WHERE id = ${facultyId}`;
    return data.count > 0 ?
    {
     status : 200,
     message : 'Deleted Successfully !'
    } 
    :
    {
     status : 403,
     message : 'Failed To Delete !'
    };
}

export const facultyUpdateViewModel = async (facultyId : number) => {
   const data =  await sql`SELECT 
                           f.id,
                           f.faculty_name,
                           f.institute_name,
                           f.address,
                           f.designation,
                           f.faculty_type_lid AS faculty_type
                           FROM faculties f 
                           WHERE f.active = TRUE
                           AND f.id = ${facultyId}
`;
    return data;
}

export const updateFacultyModel = async (facultyDetails : facultyUpdateDetails,username:string) => {
   const data = await sql`UPDATE faculties 
                          SET faculty_name=${facultyDetails.faculty_name},
                          address = ${facultyDetails.address},
                          designation = ${facultyDetails.designation},
                          institute_name = ${facultyDetails.institute},
                          faculty_type_lid = ${facultyDetails.faculty_type},
                          modified_date = NOW(),
                          modified_by = ${username}
                          WHERE id=${facultyDetails.faculty_id}`;
    return data;
}