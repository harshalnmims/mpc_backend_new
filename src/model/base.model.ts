import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';

export const getProgramsModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Program>({
      baseQuery: `SELECT DISTINCT p.id as value, CONCAT(p.program_name, ' - ', p.program_code, ' - ', p.program_abbr, ' (', p.program_id, ')') as label, p.id, p.program_id, p.program_name, p.program_code, p.program_abbr 
                    FROM PROGRAM p 
                    INNER JOIN program_campus pc ON pc.program_lid = p.id`,
      filters: {
         'p.id': filters.programLid,
         'p.program_id': filters.programId,
         'p.acad_year': filters.acadYear,
         'pc.campus_lid': filters.campusLid,
      },
      cursor: {
         column: "p.id",
         value: Number(filters.cursor)
      },
      limit: limit.toString(),
      search: search || '',
      searchColumns: ['program_id', 'program_code', 'program_name', 'program_abbr'],
      sort: {
         column: sort || 'p.id',
         order: order || 'desc',
      },
   });

   return data;
};

export const getCampusModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Campus>({
      baseQuery: `SELECT DISTINCT cc.id as value, CONCAT(cc.campus_name, ' - ', cc.campus_abbr, ' (' , cc.campus_id, ')') as label, cc.id, cc.campus_id , CONCAT(cc.campus_name, ' - ', cc.campus_abbr ) AS campus_name FROM user_session_info usi
                    INNER JOIN program_campus pc ON pc.program_lid = usi.program_lid
                    INNER JOIN campus cc ON cc.id = pc.campus_lid`,
      filters: {
         'cc.id': filters.campusLid,
         'cc.campus_id': filters.campusId,
         'cc.campus_name': filters.campusName,
         'usi.user_lid': filters.userLid,
      },
      cursor: {
         column: 'cc.id',
         value: Number(filters.cursor)
      },
      limit: limit.toString(),
      search: search || '',
      searchColumns: ['campus_id', 'campus_name'],
      sort: {
         column: sort || 'cc.id',
         order: order || 'desc',
      },
   });

   return data;
};

export const getAcadSessionModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Session>({
      baseQuery: `SELECT DISTINCT sm.id AS value, sm.acad_session AS label, sm.id, sm.acad_session AS session_name
                    FROM session_master sm 
                    INNER JOIN user_session_info usi ON usi.session_lid = sm.id`,
      filters: {
         'usi.program_lid': filters.programLid,
         'sm.id': filters.sessionId,
         'sm.acad_session': filters.sessionName,
      },
      cursor: {
         column: 'sm.id',
         value: Number(filters.cursor)
      },
      limit: limit.toString(),
      search: search || '',
      searchColumns: ['id', 'acad_session'],
      sort: {
         column: sort || 'sm.id',
         order: order || 'desc',
      },
   });

   return data;
};

export const getSubjectModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Session>({
      baseQuery: `SELECT DISTINCT ss.id AS value, CONCAT(ss.subject_name, ' - ', ss.subject_abbr, ' (', ss.subject_id, ')') AS label, ss.id, CONCAT(ss.subject_name, ' ( ', ss.subject_abbr, ' )') AS subject_name, ss.subject_id
                    FROM subject ss
                    INNER JOIN user_session_info usi ON usi.subject_lid = ss.id`,
      filters: {
         'ss.acad_year': filters.acadYear,
         'usi.program_lid': filters.programLid,
         'usi.session_lid': filters.sessionLid,
         'ss.id': filters.subjectLid,
         'ss.subject_name': filters.subjectName,
         'ss.subject_abbr': filters.subjectAbbr,
      },
      cursor: {
         column: 'ss.id',
         value: Number(filters.cursor)
      },
      limit: limit.toString(),
      search: search || '',
      searchColumns: ['ss.subject_name', 'ss.subject_abbr', 'ss.subject_id'],
      sort: {
         column: sort || 'ss.id',
         order: order || 'desc',
      },
   });

   return data;
};
