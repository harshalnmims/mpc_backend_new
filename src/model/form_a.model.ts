import sql from '$config/db';
import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, MeetingDetails, Program, Session } from 'types/base.types';
import { paginationDefaultType } from 'types/db.default';

export const submitFormAModel = async (FormAJson: MeetingDetails) => {
   const data = await sql`SELECT * FROM create_form_a(${JSON.stringify(FormAJson)}, 1);`;
   return data;
};

export const viewFormAModel = async (meetingId: string) => {
   const data = await sql<MeetingDetails[]>`WITH campus_data AS (
         SELECT 
            pm.id AS point_id, 
            pm.point, 
            pm.sub_point, 
            cc.id AS campus_id, 
            cc.campus_name, 
            CASE WHEN fa."text" IS NULL 
            OR fa."text" = '' THEN '-----' ELSE fa."text" END AS point_text, 
            fa.id AS form_a_id 
         FROM 
            point_master pm CROSS 
            JOIN master_form mf 
            INNER JOIN user_session_info usi ON usi.subject_lid = mf.subject_lid 
            INNER JOIN campus cc ON usi.campus_lid = cc.id 
            LEFT JOIN form_a fa ON fa.campus_lid = cc.id 
            AND fa.point_lid = pm.id 
            AND fa.active = TRUE 
         WHERE 
            mf.id = 125
         ) 
         SELECT 
         jsonb_build_object(
            'meeting_id', 
            117, 
            'form_a', 
            jsonb_agg(
               jsonb_build_object(
               'point_id', 
               point_id, 
               'point', 
               point, 
               'sub_point', 
               sub_point, 
               'campus_array', 
               (
                  SELECT 
                     jsonb_agg(
                     jsonb_build_object(
                        'campus_id', campus_id, 'campus_name', 
                        campus_name, 'point_text', point_text, 
                        'form_a_id', form_a_id
                     )
                     ) 
                  FROM 
                     campus_data cd2 
                  WHERE 
                     cd2.point_id = cd1.point_id
               )
               )
            )
         ) 
         FROM 
         (
            SELECT 
               DISTINCT point_id, 
               point, 
               sub_point 
            FROM 
               campus_data
         ) cd1;
         `;

   return data;
};

export const updateFormAModel = async (formAJson: MeetingDetails) => {
   const data = await sql`SELECT * FROM create_form_a(${JSON.stringify(formAJson)}, 1);`;
   return data;
};
