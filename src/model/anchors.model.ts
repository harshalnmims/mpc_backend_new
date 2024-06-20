import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { paginationDefaultType } from 'types/db.default';

export const getCourseAnchorModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
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
export const getProgramAnchorModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Session>({
      baseQuery: `select distinct concat(pu.first_name,' ',pu.last_name) AS full_name, pu.id as user_lid, pu.username 
                     from mpc_user_role mur 
                     INNER JOIN user_session_info usi on usi.user_lid = mur.user_lid 
                     INNER JOIN mpc_role mr ON mr.id = mur.mpc_role_lid
                     INNER JOIN public.user pu on pu.id = usi.user_lid
                     WHERE mr.abbr = 'pa' `,
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
export const getAttendeesModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Session>({
      baseQuery: `select distinct concat(pu.first_name,' ',pu.last_name) AS full_name, pu.id AS user_lid, pu.username
                  from user_session_info usi
                  INNER JOIN public.user pu on pu.id = usi.user_lid`,

      filters: {
         'usi.program_lid': filters.programlid,
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
