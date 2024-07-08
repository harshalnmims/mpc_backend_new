
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { MeetingStakeholders } from 'types/research.types';

export const getPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await paginationQueryBuilder<Session>({
        baseQuery: `SELECT 
                     id,
                     COALESCE(ranking, 'No Data Filled!') AS ranking,
                     COALESCE(accreditation, 'No Data Filled!') AS accreditation,
                     COALESCE(achievements, 'No Data Filled!') AS achievements,
                     COALESCE(convocation, 'No Data Filled!') AS convocation,
                     COALESCE(inaugral_program, 'No Data Filled!') AS inaugral_program,
                     COALESCE(events, 'No Data Filled!') AS events
                  FROM meeting_stackholders
                  WHERE active = true`,
  
        filters: {
           // 'usi.program_lid': filters.programLid,
           // 'usi.session_lid': filters.sessionLid,
           // 'usi.subject_lid': filters.subjectLid,
        },
        page : page,
        pageSize: 10 ,
        search: search || '',
        searchColumns: ['ranking','accreditation,achievements','convocation','inaugral_program','events'],
        sort: {
           column: sort || 'id',
           order: order || 'desc',
        },
     });

     return data;
  
}

export const meetingViewData = async() => {
   const data = await sql`SELECT * FROM meeting_stackholders_inputs WHERE active = TRUE`;
   return data.count > 0 ? {
      status:200,
      message:data
  } : {
      status:400,
      message:'Failed To Fetch!'
  }
} 

export const insertMeetingModel = async (meetingDetails : MeetingStakeholders) => {
   const data = await sql`SELECT * FROM insert_meeting_stackholder(${JSON.parse(JSON.stringify(meetingDetails))}, '1');`
   console.log('inserted data ',JSON.stringify(data))

   return data;
}

export const deleteMeetingModel =  async(meetingId :number) => {
   const data = await sql`UPDATE meeting_stackholders SET active=false WHERE id=${meetingId};`;
   return data.count > 0 ? 
   {
    status:200,
    message:'Deleted Successfully!'
   }
   :{
    status:403,
    message:'Failed To Delete!'
   }
}