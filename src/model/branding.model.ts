
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';

export const getPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await paginationQueryBuilder<Session>({
        baseQuery: `SELECT 
                    id,
                    faculty_recognition ,
                    faculty_awards ,
                    staff_awards,
                    alumni_awards ,
                    student_awards ,
                    international_ventures ,
                    conference_participation ,
                    organizing_conference ,
                    newspaper_article ,
                    student_event 
                    FROM branding_advertisement WHERE active = true`,
  
        filters: {
           // 'usi.program_lid': filters.programLid,
           // 'usi.session_lid': filters.sessionLid,
           // 'usi.subject_lid': filters.subjectLid,
        },
        page : page,
        pageSize: 10 ,
        search: search || '',
        searchColumns: ['faculty_recognition','faculty_awards','student_awards','staff_awards','alumni_awards',
        'international_ventures','conference_participation','organizing_conference','newspaper_article','student_event'     
        ],
        sort: {
           column: sort || 'id',
           order: order || 'desc',
        },
     });

     return data;
  
}

export const brandingViewData = async() => {
   const data = await sql`SELECT * FROM branding_advertisement_inputs WHERE active = TRUE`;
   return data.count > 0 ? {
      status:200,
      message:data
  } : {
      status:400,
      message:'Failed To Fetch!'
  }
} 