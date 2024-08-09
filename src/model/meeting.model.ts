
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { MeetingStakeholders } from 'types/research.types';

export const getPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType,username:string) => {
    const data = await paginationQueryBuilder<Session>({
        baseQuery: `SELECT 
                     m.id,
                     COALESCE(ranking, 'No Data Filled!') AS ranking,
                     COALESCE(accreditation, 'No Data Filled!') AS accreditation,
                     COALESCE(achievements, 'No Data Filled!') AS achievements,
                     COALESCE(convocation, 'No Data Filled!') AS convocation,
                     COALESCE(inaugral_program, 'No Data Filled!') AS inaugral_program,
                     COALESCE(events, 'No Data Filled!') AS events,
                     m.created_by,
                     CASE 
                     WHEN fs.status_lid = 3 THEN (SELECT abbr FROM status WHERE abbr = 're')  
                     ELSE CASE 
                           WHEN fs.status_lid = 2 AND fs.level_lid = 1 THEN (SELECT abbr FROM status WHERE abbr = 'cp') 
                           ELSE (SELECT abbr FROM status WHERE abbr = 'pd')
                     END
                  END AS status,
                  fs.id AS form_status_lid,
                  COALESCE(fs.remarks,'No Remarks Found !') AS remarks
                  FROM meeting_stackholders m
                  LEFT JOIN form_status fs ON fs.id = m.form_status_lid
                  WHERE m.active = true AND m.created_by = '${username}'`,
  
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

export const insertMeetingModel = async (meetingDetails : MeetingStakeholders,username:string) => {
   const data = await sql`SELECT * FROM insert_meeting_stackholder(${JSON.parse(JSON.stringify(meetingDetails))}, ${username});`
   console.log('inserted data ',JSON.stringify(data))

   return data;
}

export const updateMeetingModel = async (meetingDetails : MeetingStakeholders,username:string) => {
   const data = await sql`SELECT * FROM upsert_meeting_stackholder(${JSON.parse(JSON.stringify(meetingDetails))}, ${username});`
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

export const updateViewData = async(meetingId : number) => {
   const data = await sql`SELECT ranking,ranking_link,accreditation,accreditation_link,achievements,achievements_link,
   convocation,convocation_link,inaugral_program,inaugral_program_link,events,events_link FROM meeting_stackholders WHERE active=TRUE AND id=${meetingId}`;
   return data;
} 

export const getParticularInputs = async (type: string) => {
   const data = await sql`SELECT * FROM meeting_stackholders_inputs WHERE abbr=${type}`;
   return data;
}


export const meetingFiles = async (meetingId: number,abbr:string) => {
   const data = await sql`SELECT * FROM meeting_stackholders_documents WHERE meeting_lid=${meetingId} AND input_lid IN (SELECT id FROM meeting_stackholders_inputs 
   WHERE abbr=${abbr} AND active = TRUE) AND active = TRUE`;
   return data;
}

export async function getMeetingFiles(meetingId : number){
const data = await sql`SELECT mt.document_name,mt.filename,mi.abbr FROM meeting_stackholders_documents mt
INNER JOIN meeting_stackholders_inputs mi ON mt.input_lid = mi.id WHERE mt.meeting_lid = ${meetingId}
AND mt.active = TRUE AND mi.active = TRUE`;
   return data;
}