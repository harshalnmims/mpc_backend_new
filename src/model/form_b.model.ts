import sql from '$config/db';
import { infiniteScrollQueryBuilder } from '$utils/db/query-builder';
import { Campus, Program, Session } from 'types/base.types';
import { paginationDefaultType } from 'types/db.default';

export const submitFormBModel = async (formBJson:any) => {
   const data = await sql`SELECT * FROM ;`;
   return data;
};

export const viewFormBModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Session>({
      baseQuery: `select distinct concat(pu.first_name,' ',pu.last_name),pu.id as full_name from mpc_user_role mur INNER JOIN user_session_info usi
                    on usi.user_lid=mur.user_lid 
                    INNER JOIN public.user pu on pu.id=usi.user_lid`,

      filters: {
         'usi.program_lid': filters.programlid,
         'usi.session_lid': filters.sessionLid,
         'usi.subjectLid': filters.subjectLid,
      },
      cursor: {
         column: 'pu.id',
         value: Number(filters.cursor),
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
export const updateFormBModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await sql`SELECT * FROM ;`;
   return data;
};
