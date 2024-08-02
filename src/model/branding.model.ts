
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { BrandingAdvertisement } from 'types/research.types';

export const getPaginateModel = async ({ page , limit, sort, order, search, filters }: paginationDefaultType,username :string) => {
    const data = await paginationQueryBuilder<Session>({
        baseQuery: `SELECT 
                     id,
                     COALESCE(faculty_recognition, 'No Data Filled!') AS faculty_recognition,
                     COALESCE(faculty_awards, 'No Data Filled!') AS faculty_awards,
                     COALESCE(staff_awards, 'No Data Filled!') AS staff_awards,
                     COALESCE(alumni_awards, 'No Data Filled!') AS alumni_awards,
                     COALESCE(student_awards, 'No Data Filled!') AS student_awards,
                     COALESCE(international_ventures, 'No Data Filled!') AS international_ventures,
                     COALESCE(conference_participation, 'No Data Filled!') AS conference_participation,
                     COALESCE(organizing_conference, 'No Data Filled!') AS organizing_conference,
                     COALESCE(newspaper_article, 'No Data Filled!') AS newspaper_article,
                     COALESCE(student_event, 'No Data Filled!') AS student_event,
                     created_by
                     FROM branding_advertisement
                     WHERE active = true AND created_by = '${username}'`,
  
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

export const insertBrandingModel = async (brandingDetails: BrandingAdvertisement, username: string) => {
   const data = await sql`SELECT * FROM insert_branding_advertising(${JSON.parse(JSON.stringify(brandingDetails))}, ${username});`
   console.log('inserted data ',JSON.stringify(data))

   return data;
}

export const updateBrandingModel = async (brandingDetails: BrandingAdvertisement, username: string) => {
   const data = await sql`SELECT * FROM upsert_branding_advertisement(${JSON.parse(JSON.stringify(brandingDetails))}, ${username});`
   console.log('inserted data ',JSON.stringify(data))

   return data;
}

export const deleteBrandingModel = async (brandingId: number, username: string) => {
   const data = await sql`UPDATE branding_advertisement SET active = false WHERE id = ${brandingId};`
   return data.count > 0 ?
   {
     status : 200,
     message : 'Deleted Successfully'
   }
   :
   {
     status : 403,
     message : 'Failed To Delete!'
   }
}

export const updateViewData = async(brandingId : number) => {
   const data = await sql`SELECT faculty_recognition,faculty_recognition_link,faculty_awards,faculty_awards_link,
   staff_awards,staff_awards_link,alumni_awards,alumni_awards_link,student_awards,student_awards_link,
   international_ventures,international_ventures_link,conference_participation,conference_participation_link
   organizing_conference,organizing_conference_link,student_event,student_event_link,newspaper_article,newspaper_article_link
   FROM branding_advertisement WHERE active=TRUE AND id=${brandingId}`;
   return data;
} 

export const getParticularInputs = async (type: string) => {
   const data = await sql`SELECT * FROM branding_advertisement_inputs WHERE abbr=${type}`;
   return data;
}

export const brandingFiles = async (brandingId: number,abbr:string) => {
   const data = await sql`SELECT * FROM branding_advertisement_documents WHERE branding_lid=${brandingId} AND input_lid IN (SELECT id FROM branding_advertisement_inputs 
   WHERE abbr=${abbr} AND active = TRUE) AND active = TRUE`;
   return data;
}

export const getbrandingFiles = async (brandingId: number) => {
   const data = await sql`SELECT b.document_name,b.filename,bi.abbr FROM branding_advertisement_documents b
INNER JOIN branding_advertisement_inputs bi ON b.input_lid = bi.id WHERE b.branding_lid = ${brandingId} 
AND bi.active = TRUE AND b.active = TRUE 
`;
   return data;
}