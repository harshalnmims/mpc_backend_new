import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { TeachingExcellance } from 'types/research.types';

export const getPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await paginationQueryBuilder<Session>({
        baseQuery: `SELECT 
                     id,
                     COALESCE(pedagogy_innovation, 'No Data Filled!') AS pedagogy_innovation,
                     COALESCE(fdp_program, 'No Data Filled!') AS fdp_program,
                     COALESCE(student_workshops, 'No Data Filled!') AS student_workshops,
                     COALESCE(niche, 'No Data Filled!') AS niche,
                     COALESCE(program_orientation, 'No Data Filled!') AS program_orientation
                  FROM teaching_excellance
                  WHERE active = true`,
  
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

export const insertTeachingModel = async (teachingDetails : TeachingExcellance) => {
   const data = await sql`SELECT * FROM insert_teaching_excellance(${JSON.parse(JSON.stringify(teachingDetails))}, '1');`
   console.log('inserted data ',JSON.stringify(data))

   return data;
}

export const deleteTeachingModel = async (teachingId : number) => {
   const data = await sql`UPDATE teaching_excellance SET active = false WHERE id=${teachingId}`;
   return data.count > 0 ? 
   {
     status : 200,
     message : 'Deleted Successfully'  
   } : {
     status : 403,
     message : 'Failed To Delete!'
   }
}