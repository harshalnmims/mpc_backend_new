import { infiniteScrollQueryBuilder,paginationQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { conferenceDetails } from 'types/research.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db'; 
import { number } from 'zod';



export const getConferenceModel = async({ page, limit, sort, order, search, filters }: paginationDefaultType) =>{
    console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilder<Session>({
       baseQuery: `WITH conference_details AS (
                            SELECT 
                                c.id,
                                c.paper_title,
                                c.conference_name,
                                c.proceeding_published,
                                c.issn_no
                            FROM conference c
                            WHERE c.active = true
                        ),
                        school_details AS (
                            SELECT
                                c.id AS conference_id,
                                JSON_AGG(DISTINCT cs.school_name) AS nmims_school
                            FROM conference c
                            INNER JOIN conference_school cs ON cs.conference_lid = c.id
                            WHERE cs.active = true AND c.active = true
                            GROUP BY c.id
                        ),
                        campus_details AS (
                            SELECT
                                c.id AS conference_id,
                                JSON_AGG(DISTINCT cnc.campus_name) AS nmims_campus
                            FROM conference c
                            INNER JOIN conference_campus cnc ON cnc.conference_lid = c.id
                            WHERE cnc.active = true AND c.active = true
                            GROUP BY c.id
                        )
                        SELECT 
                            cnd.id,
                            cnd.paper_title,
                            cnd.conference_name,
                            cnd.proceeding_published,
                            cnd.issn_no,
                            sd.nmims_school,
                            cd.nmims_campus
                        FROM conference_details cnd
                        LEFT JOIN school_details sd ON sd.conference_id = cnd.id
                        LEFT JOIN campus_details cd ON cd.conference_id = cnd.id
                                        `,
       filters: {
     
       },
       page: page || 1,
       pageSize: limit || 10,
       search: search || '',
       searchColumns: ['cnd.paper_title', 'sd.nmims_school', 'cd.nmims_campus', 'cnd.isbn_no', 'cnd.conference_name', 'cnd.proceeding_published'],
       sort: {
          column: sort || 'cnd.id',
          order: order || 'desc',
       },
    });
 
    return data;
 }

export const insertConferenceModel = async(conferenceData : conferenceDetails) => {
    console.log('conferenceData ===>>>>>', conferenceData)
    
    const data = await sql`SELECT * FROM insert_conference(${JSON.parse(JSON.stringify(conferenceData))}, '1');`;
    return data;
 }


export const updateConferencemodels = async(updateConferenceData : conferenceDetails) => {
    console.log('updateConferenceData in models  ===>>>>>', updateConferenceData)
    
    const data = await sql`SELECT * FROM upsert_conference(${JSON.parse(JSON.stringify(updateConferenceData))}, '1');`;
    return data;

}

export const deleteConferenceModel = async(conferenceId : number) => {
    console.log('conferenceId models  ====>>>>>>', conferenceId);
    
    const data = await sql`UPDATE conference SET active = false,modified_date=now(),modified_by='1' WHERE id = ${conferenceId}`;

    return data.count > 0 ? {
        status:200,
        message:'Deleted Successfully !'
    } : {
        status:400,
        message:'Failed To Delete !'
    }
}

