import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';


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