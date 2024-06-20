import sql from '$config/db';
import { ProgramAnalytics, SchoolListAnalytics, subjectListAnalytics } from 'types/base.types';

export const analyticsAllProgramsModal = async (acad_year: string) => {
   const data = await sql<ProgramAnalytics[]>`SELECT 
                    mf.program_lid, 
                    pp.program_name, 
                    COUNT(DISTINCT mf.id) AS meeting_count,
                    ((COUNT(DISTINCT fu.id) * 100) / COUNT(DISTINCT fu1.id)) AS avg_attendance,
                    AVG(fa.text::INT) AS ica_percentage,
                    jsonb_agg(
                        DISTINCT jsonb_build_object(
                            'user_lid', fu2.user_lid,
                            'profile_url', 'ABC'
                        )
                    ) AS program_anchor,
                    jsonb_agg(
                        DISTINCT jsonb_build_object(
                            'user_lid', fu3.user_lid,
                            'profile_url', 'ABC'
                        )
                    ) AS course_anchor
                FROM 
                    program pp 
                INNER JOIN 
                    master_form mf ON pp.id = mf.program_lid
                INNER JOIN 
                    form_user fu ON fu.form_lid = mf.id
                INNER JOIN 
                    form_user fu1 ON fu1.form_lid = mf.id
                INNER JOIN 
                    form_user fu2 ON fu2.form_lid = mf.id
                INNER JOIN 
                    form_user fu3 ON fu3.form_lid = mf.id
                INNER JOIN 
                    form_a fa ON fa.form_lid = mf.id
                WHERE 
                    mf.parent_id IS NULL 
                    AND fu.mpc_role_lid = (SELECT id FROM mpc_role WHERE abbr = 'att') 
                    AND fu1.mpc_role_lid IN (SELECT id FROM mpc_role WHERE abbr = 'att' OR abbr = 'abs')  
                    AND fu2.mpc_role_lid = (SELECT id FROM mpc_role WHERE abbr = 'ca') 
                    AND fu3.mpc_role_lid = (SELECT id FROM mpc_role WHERE abbr = 'pa')  
                    AND fa.point_lid = (SELECT id FROM point_master WHERE point = 'Evaluation / ICA' AND sub_point = '% ICA Completed')
                    AND mf.acad_year = ${acad_year}
                GROUP BY 
                    mf.program_lid, 
                    pp.program_name;`;

   return data;
};

export const analyticsAllProgramsByIdModal = async (programId: number) => {
   const data = await sql<ProgramAnalytics[]>`SELECT 
                    mf.program_lid, 
                    pp.program_name, 
                    COUNT(DISTINCT mf.id) AS meeting_count,
                    ((COUNT(DISTINCT fu.id) * 100) / COUNT(DISTINCT fu1.id)) AS avg_attendance,
                    AVG(fa.text::INT) AS ica_percentage,
                    jsonb_agg(
                        DISTINCT jsonb_build_object(
                            'user_lid', fu2.user_lid,
                            'profile_url', 'ABC'
                        )
                    ) AS program_anchor,
                    jsonb_agg(
                        DISTINCT jsonb_build_object(
                            'user_lid', fu3.user_lid,
                            'profile_url', 'ABC'
                        )
                    ) AS course_anchor
                FROM 
                    program pp 
                INNER JOIN 
                    master_form mf ON pp.id = mf.program_lid
                INNER JOIN 
                    form_user fu ON fu.form_lid = mf.id
                INNER JOIN 
                    form_user fu1 ON fu1.form_lid = mf.id
                INNER JOIN 
                    form_user fu2 ON fu2.form_lid = mf.id
                INNER JOIN 
                    form_user fu3 ON fu3.form_lid = mf.id
                INNER JOIN 
                    form_a fa ON fa.form_lid = mf.id
                WHERE 
                    mf.parent_id IS NULL 
                    AND fu.mpc_role_lid = (SELECT id FROM mpc_role WHERE abbr = 'att') 
                    AND fu1.mpc_role_lid IN (SELECT id FROM mpc_role WHERE abbr = 'att' OR abbr = 'abs')  
                    AND fu2.mpc_role_lid = (SELECT id FROM mpc_role WHERE abbr = 'ca') 
                    AND fu3.mpc_role_lid = (SELECT id FROM mpc_role WHERE abbr = 'pa')  
                    AND fa.point_lid = (SELECT id FROM point_master WHERE point = 'Evaluation / ICA' AND sub_point = '% ICA Completed')
                    AND mf.program_lid = ${programId}
                GROUP BY 
                    mf.program_lid, 
                    pp.program_name;`;

   return data;
};

export const schoolListModal = async (user_lid: number) => {
   const data = await sql<SchoolListAnalytics[]>`SELECT
                json_build_object(
                    'school', og.organization_name,
                    'campus', json_agg(distinct c.campus_name),
                    'meeting_count', COUNT(mf.id)
                ) AS result
            FROM
                master_form mf
            INNER JOIN
                campus c ON c.id = mf.campus_lid
            INNER JOIN
                organization og ON og.id = c.organization_lid
            GROUP BY
                og.organization_name;`;

   return data;
};

export const subjectListByProgramAndYearModal = async (programLid: number, acad_year: string) => {
   const data = await sql<subjectListAnalytics[]>`SELECT
                 json_build_object(
                     'school', og.organization_name,
                     'campus', json_agg(distinct c.campus_name),
                     'meeting_count', COUNT(mf.id)
                 ) AS result
             FROM
                 master_form mf
             INNER JOIN
                 campus c ON c.id = mf.campus_lid
             INNER JOIN
                 organization og ON og.id = c.organization_lid
             GROUP BY
                 og.organization_name;`;

   return data;
};

export const campusByProgramModal = async (programLid: number) => {
   const data = await sql<subjectListAnalytics[]>`SELECT
                        m.campus_lid,c.campus_name,
                        ((COUNT(DISTINCT fu.id) * 100) / COUNT(DISTINCT fu1.id)) AS avg_attendance,
                        AVG(fa.text::INT) AS ica_percentage
                        FROM program_campus pc
                        INNER JOIN master_form m ON m.campus_lid = pc.campus_lid
                        INNER JOIN campus c ON c.id = pc.campus_lid
                        INNER JOIN form_user fu ON fu.form_lid = m.id
                        INNER JOIN form_user fu1 ON fu1.form_lid = m.id
                        INNER JOIN form_a fa ON fa.form_lid = m.id
                        WHERE pc.program_lid = ${programLid} AND
                        fu.mpc_role_lid IN (SELECT id FROM mpc_role WHERE abbr = 'att') AND
                        fu.mpc_role_lid IN (SELECT id FROM mpc_role WHERE abbr IN ('att','abs'))
                        AND fa.point_lid IN (SELECT id FROM point_master WHERE point = 'Evaluation / ICA' AND sub_point = '% ICA Completed')
                        AND pc.active=true AND m.active=true AND c.active=true AND fu.active=true AND
                        fu1.active=true AND fa.active=true
                        GROUP BY m.campus_lid,c.campus_name`;

   return data;
};
