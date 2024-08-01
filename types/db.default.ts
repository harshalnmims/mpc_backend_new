import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';
import { Filter } from './db.helper';

export type paginationDefaultType = {
   page: number;
   limit: number;
   sort: string;
   order: 'asc' | 'desc';
   search: string;
   filters: Filter;
};


//Query Builder

// export const viewMasterFormModelList = async (userLid: number, { page, limit, sort, order, search, filters }: paginationDefaultType) => {
//    const data = await paginationQueryBuilderWithPlaceholder<MeetingListItem>({
//        baseQuery: `
//          WITH active_master_form AS (
//            SELECT * 
//            FROM master_form 
//            WHERE active = TRUE
//            AND parent_id IS NULL
//          ),
//          user_campus_sessions AS (
//            SELECT DISTINCT
//              campus_lid, user_lid
//            FROM user_session_info 
//            WHERE user_lid = ${userLid}
//              AND active = TRUE
//          ),
//          user_organizations AS (
//            SELECT DISTINCT 
//              id, organization_lid, user_lid
//            FROM user_organization 
//            WHERE user_lid = ${userLid}
//              AND active = TRUE
//          ),
//          user_active_campus AS (
//            SELECT DISTINCT
//              c.id AS campus_lid,
//              pc.program_lid
//            FROM campus c
//            INNER JOIN organization o ON o.id = c.organization_lid
//            INNER JOIN program_campus pc ON pc.campus_lid = c.id
//            INNER JOIN active_master_form mf ON mf.program_lid = pc.program_lid
//            LEFT JOIN user_campus_sessions usi ON usi.campus_lid = c.id
//            LEFT JOIN user_organizations uo ON 
//              CASE WHEN o.parent_id IS NULL THEN 
//                uo.organization_lid = o.id
//              ELSE
//                uo.organization_lid = o.parent_id
//              END
//            WHERE pc.active = TRUE 
//              AND c.active = TRUE AND o.active = TRUE
//              AND (usi.campus_lid IS NOT NULL OR uo.id IS NOT NULL)
//          ),
//          action_menu_details AS (
//            SELECT
//              fu.form_lid,
//              jsonb_agg(DISTINCT jsonb_build_object(
//                'label', am.label,
//                'url', am.url,
//                'icon', am.icon
//              )) AS mpc_role
//            FROM action_menu am
//            INNER JOIN form_user fu ON fu.mpc_role_lid = am.mpc_role_lid
//            INNER JOIN active_master_form mf ON mf.id = fu.form_lid
//            INNER JOIN user_active_campus uac ON mf.program_lid = uac.program_lid 
//            INNER JOIN meeting_status ms ON ms.id = mf.meeting_status_lid
//            WHERE fu.active = TRUE 
//            {{my_where_condition}}
//              AND ms.abbr = ANY (am.access_vise)
//            GROUP BY fu.form_lid
//          )
//          SELECT DISTINCT
//            mf.program_lid,
//            mf.subject_lid,
//            pp.program_name,
//            ss.subject_name,
//            ss.subject_abbr,
//            jsonb_agg(
//              DISTINCT jsonb_build_object(
//                'meeting_id', mf.id,
//                'meeting_name', mf.meeting_name,
//                'meeting_date', to_char(mf.meeting_date, 'DD Mon'' YY • HH:MI AM'),
//                'acad_session', sm.acad_session,
//                'status', ms.status_name,
//                'status_abbr', ms.abbr,
//                'mpc_role', amd.mpc_role
//              )
//            ) AS subject_meeting_details
//          FROM active_master_form mf
//          INNER JOIN user_active_campus uac ON mf.program_lid = uac.program_lid 
//          INNER JOIN program pp ON mf.program_lid = pp.id
//          INNER JOIN subject ss ON mf.subject_lid = ss.id
//          INNER JOIN session_master sm ON mf.session_lid = sm.id
//          INNER JOIN campus cc ON mf.campus_lid = cc.id
//          INNER JOIN meeting_status ms ON mf.meeting_status_lid = ms.id
//          INNER JOIN action_menu_details amd ON mf.id = amd.form_lid
//          {{whereClause}}
//          GROUP BY
//            mf.program_lid,
//            mf.subject_lid,
//            pp.program_name,
//            ss.subject_name,
//            ss.subject_abbr
//        `,
//        placeholders: [
//            {
//                placeholder: '{{whereClause}}',
//                filters: {
//                    'pp.program_name': filters.programName,
//                    'ss.subject_name': filters.subjectName,
//                    'ms.abbr': filters.abbr
//                },
//                searchColumns: ['pp.program_name', 'ss.subject_name'],
//            }
//        ],
//        page: page,
//        pageSize: limit,
//        search: search || '',
//    });


//    return data;
// };