import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { TeachingExcellance } from 'types/research.types';

export const getPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType,username:string) => {
    const data = await paginationQueryBuilder<Session>({
        baseQuery: `SELECT 
                     t.id,
                     COALESCE(pedagogy_innovation, 'No Data Filled!') AS pedagogy_innovation,
                     COALESCE(fdp_program, 'No Data Filled!') AS fdp_program,
                     COALESCE(student_workshops, 'No Data Filled!') AS student_workshops,
                     COALESCE(niche, 'No Data Filled!') AS niche,
                     COALESCE(program_orientation, 'No Data Filled!') AS program_orientation,
                     t.created_by,
                     CASE 
                     WHEN fs.status_lid = 3 THEN (SELECT abbr FROM status WHERE abbr = 're')  
                     ELSE CASE 
                           WHEN fs.status_lid = 2 AND fs.level_lid = 2 THEN (SELECT abbr FROM status WHERE abbr = 'cp') 
                           ELSE (SELECT abbr FROM status WHERE abbr = 'pd')
                     END
                  END AS status,
                  fs.id AS form_status_lid
                  FROM teaching_excellance t
                  LEFT JOIN form_status fs ON fs.id = t.form_status_lid
                  WHERE t.created_by = '${username}' AND t.active = true`,
  
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

export const insertTeachingModel = async (teachingDetails : TeachingExcellance,username:string) => {
   const data = await sql`SELECT * FROM insert_teaching_excellance(${JSON.parse(JSON.stringify(teachingDetails))}, ${username});`
   console.log('inserted data ',JSON.stringify(data))

   return data;
}

export const updateTeachingModel = async (teachingDetails : TeachingExcellance,username:string) => {
   const data = await sql`SELECT * FROM upsert_teaching_excellance(${JSON.parse(JSON.stringify(teachingDetails))}, ${username});`
   console.log('updated data ',JSON.stringify(data))

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

export const updateViewData = async(teachingId : number) => {
   const data = await sql`SELECT pedagogy_innovation,pedagogy_link,fdp_program,fdp_link,student_workshops,workshop_link,
niche,niche_link,program_orientation,orientation_link FROM teaching_excellance WHERE active=TRUE AND id=${teachingId}`;
   return data;
} 

export const getParticularInputs = async (type: string) => {
   const data = await sql`SELECT * FROM teaching_excellance_inputs WHERE abbr=${type}`;
   return data;
}

export const teachingFiles = async (teachingId: number,abbr:string) => {
   const data = await sql`SELECT * FROM teaching_excellance_documents WHERE teaching_lid=${teachingId} AND input_lid IN (SELECT id FROM teaching_excellance_inputs 
   WHERE abbr=${abbr} AND active = TRUE) AND active = TRUE`;
   return data;
}

export const getTeachingFiles = async (teachingId: number) => {
   const data = await sql`SELECT t.document_name,t.filename,ti.abbr FROM teaching_excellance_documents t
INNER JOIN teaching_excellance_inputs ti ON t.input_lid = ti.id WHERE teaching_lid = ${teachingId} AND t.active = TRUE AND ti.active = TRUE`;
   return data;
}