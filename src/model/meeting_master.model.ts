import sql from '$config/db';
import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, MasterMeeting, MeetingList, Program, Session } from 'types/base.types';
import { paginationDefaultType } from 'types/db.default';

export const insertMasterFormModel = async (Json: MasterMeeting) => {
   const data = await sql`SELECT * FROM create_meeting(${JSON.stringify(Json)}, 1);`;
   return data;
};

export const viewMasterFormModel = async (meetingId: string) => {};

export const viewMasterFormModelList = async (username: string) => {
   const data = await sql<MeetingList[]>`SELECT jsonb_build_object(
                        'meeting_list',
                        jsonb_agg(
                            jsonb_build_object(
                                'program_id', subject_details.program_lid,
                                'subject_id', subject_details.subject_lid,
                                'program_name', subject_details.program_name,
                                'subject_name', subject_details.subject_name || '(' || subject_details.subject_abbr || ')',
                                'subject_meeting_details', subject_details.subject_meeting_details
                            )
                        )
                    ) AS meeting_json
                FROM (
                    SELECT mf.program_lid,
                        mf.subject_lid,
                        pp.program_name,
                        ss.subject_name,
                        ss.subject_abbr,
                        jsonb_agg(
                            jsonb_build_object(
                                'meeting_id', mf.id,
                                'meeting_name', pp.program_name,
                                'meeting_date', mf.meeting_date,
                                'acad_session', sm.acad_session, 
                                'status', ms.status_name
                            )
                        ) AS subject_meeting_details
                    FROM master_form mf
                    INNER JOIN program pp ON mf.program_lid = pp.id
                    INNER JOIN subject ss ON mf.subject_lid = ss.id
                    INNER JOIN session_master sm ON mf.session_lid = sm.id
                    INNER JOIN campus cc ON mf.campus_lid = cc.id
                    INNER JOIN meeting_status ms ON mf.meeting_status_lid = ms.id
                    WHERE mf.parent_id IS NULL
                    GROUP BY mf.program_lid, mf.subject_lid, pp.program_name, ss.subject_name, ss.subject_abbr
                ) AS subject_details;`;
   return data;
};

export const updateMasterFormModel = async (Json: MasterMeeting) => {
   const data = await sql`SELECT * FROM update_meeting(${JSON.stringify(Json)}, 1);`;
   return data;
};
