import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';

export const getPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await paginationQueryBuilder<Session>({
        baseQuery: `SELECT 
                    id,
                    pedagogy_innovation,
	                fdp_program,
                    student_workshops,
                    niche,
	                program_orientation
                    FROM teaching_excellance WHERE active = true`,
  
        filters: {
           // 'usi.program_lid': filters.programLid,
           // 'usi.session_lid': filters.sessionLid,
           // 'usi.subject_lid': filters.subjectLid,
        },
        page : page,
        pageSize: 10 ,
        search: search || '',
        searchColumns: ['pedagogy_innovation','fdp_program','student_workshops','niche','program_orientation'],
        sort: {
           column: sort || 'id',
           order: order || 'desc',
        },
     });

     return data;
  
}


export const teachingViewData = async() => {
   const data = await sql`SELECT * FROM teaching_excellance_inputs WHERE active = TRUE`;
   return data.count > 0 ? {
      status:200,
      message:data
  } : {
      status:400,
      message:'Failed To Fetch!'
  }
} 