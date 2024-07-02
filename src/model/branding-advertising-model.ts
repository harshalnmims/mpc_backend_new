import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { brandingDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { number } from 'zod'; 


export const getBrandingModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
    const data = await infiniteScrollQueryBuilder<Session>({
       baseQuery: `select distinct concat(pu.first_name,' ',pu.last_name) AS full_name, pu.id as user_lid, pu.username 
                       from mpc_user_role mur 
                      INNER JOIN user_session_info usi on usi.user_lid = mur.user_lid 
                      INNER JOIN mpc_role mr ON mr.id = mur.mpc_role_lid
                      INNER JOIN public.user pu on pu.id = usi.user_lid
                      WHERE mr.abbr = 'ca' `,
 
       filters: {
          'usi.program_lid': filters.programLid,
          'usi.session_lid': filters.sessionLid,
          'usi.subject_lid': filters.subjectLid,
       },
       cursor: {
          column: 'pu.id',
          value: Number(filters.cursor)
       },
       limit: limit.toString(),
       search: search || '',
       searchColumns: ['pu.username', 'pu.first_name', 'pu.last_name'],
       sort: {
          column: sort || 'pu.id',
          order: order || 'desc',
       },
    });
 
    return data;
 };


export const insertBrandingModel  = async(brandingData : brandingDetails) => {
    console.log('brandingData ===>>>>>', brandingData)
    
    const data = await sql`SELECT * FROM insert_branding_advertising(${JSON.parse(JSON.stringify(brandingData))}, '1');`;
    return data;

};

export const updateBrandingModel  = async(updateBrandingData : brandingDetails) => {
    console.log('updateBrandingData ===>>>>>', updateBrandingData)
    
    const data = await sql`SELECT * FROM upsert_branding_advertisement(${JSON.parse(JSON.stringify(updateBrandingData))}, '1');`;
    return data;

};

export const deleteBrandingModel = async (brandingId : number) => {
    console.log('brandingId in  models  ====>>>>>>', brandingId);
    
    const data = await sql`UPDATE branding_advertisement SET active = false,modified_date=now(),modified_by='1' WHERE id = ${brandingId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
};