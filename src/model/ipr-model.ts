import { IPRDetails } from "types/research.types"

import sql from '$config/db';

import { infiniteScrollQueryBuilder,paginationQueryBuilder } from '$utils/db/query-builder';

import { Campus, Program, Session } from 'types/base.types';

import { paginationDefaultType } from 'types/db.default';

import { HTTP_STATUS } from '$constants/http.constant';

import { CustomError } from '$utils/error/customError';








export const iprPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {

    console.log('filter', JSON.stringify(filters), { page, limit, sort, order, search, filters });




    const data = await paginationQueryBuilder<Session>({

        baseQuery: `WITH ipr_details AS (

                        SELECT 

                            ipr.id,

                            ipr.title,

                            ipr.appln_no,

                            ipr.filed_date,

                            ipr.institute_affiliation

                        FROM ipr ipr

                        WHERE ipr.active = TRUE

                    ),

                    school_details AS (

                        SELECT

                            ipr.id AS ipr_id,

                            JSON_AGG(DISTINCT ips.school_name) AS nmims_school

                        FROM ipr ipr

                        INNER JOIN ipr_school ips ON ips.ipr_lid = ipr.id

                        WHERE ipr.active = TRUE AND ips.active = TRUE

                        GROUP BY ipr.id

                    ),

                    campus_details AS (

                        SELECT

                            ipr.id AS ipr_id,

                            JSON_AGG(DISTINCT ic.campus_name) AS nmims_campus

                        FROM ipr ipr

                        INNER JOIN ipr_campus ic ON ic.ipr_lid = ipr.id

                        WHERE ipr.active = TRUE AND ic.active = TRUE

                        GROUP BY ipr.id

                    )

                    SELECT

                        ipd.id,

                        ipd.title,

                        ipd.appln_no,

                        ipd.filed_date,

                        ipd.institute_affiliation,

                        sd.nmims_school,

                        cd.nmims_campus

                    FROM ipr_details ipd

                    LEFT JOIN school_details sd ON ipd.id = sd.ipr_id

                    LEFT JOIN campus_details cd ON ipd.id = cd.ipr_id

        `,




        filters: {

            // Define any necessary filters here

            // 'usi.program_lid': filters.programLid,

            // 'usi.session_lid': filters.sessionLid,

            // 'usi.subject_lid': filters.subjectLid,

        },

        page: page,

        pageSize: limit || 10,

        search: search || '',

        searchColumns: [

            'ipr.title',

            'sd.nmims_school',

            'cd.nmims_campus',

            'ipr.appln_no',

            'ipr.filed_date',

            'ipr.institute_affiliation'

        ],

        sort: {

            column: sort || 'ipd.id',

            order: order || 'desc',

        },

    });




    return data;

};














export const insertIPRModel = async (iprDetails: IPRDetails) => {

    const data = await sql`SELECT * FROM insert_ipr(${JSON.parse(JSON.stringify(iprDetails))}, '1');`;

    return data;

}




export const updateIPRModel = async (updateIprDetails: IPRDetails) => {

    const data = await sql`SELECT * FROM upsert_ipr(${JSON.parse(JSON.stringify(updateIprDetails))}, '1');`;

    return data;

}




export const deleteIPRModel = async (iprId: number) => {

    const data = await sql`UPDATE ipr SET active = false,modified_date=now(),modified_by='1' WHERE id = ${iprId}`;

    return data;

}
