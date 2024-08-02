import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { facultyDetails, facultyUpdateDetails, masterDataDetails, updMasterDetails } from 'types/research.types';
import { number } from 'zod';
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';


// export const masterPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
//    console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });

//    const data = await paginationQueryBuilder<Session>({
//        baseQuery: `WITH master_details AS (
//                SELECT 
//                    mid.id AS id,
//                    mid.name AS master_input_name,
//                    mi.input_name AS input_data_type
//                FROM 
//                    public.master_input_data mid
//                INNER JOIN 
//                    public.master_inputs mi
//                ON 
//                    mid.input_type = mi.id
//                WHERE 
//                    mi.active = true AND mid.active = true
//            )

//            SELECT
//                md.id,
//                md.input_data_type AS input_data_type,
//                md.master_input_name AS master_input_name
//            FROM 
//                master_details md`,
       
//        filters: {
//            // 'usi.program_lid': filters.programLid,
//            // 'usi.session_lid': filters.sessionLid,
//            // 'usi.subject_lid': filters.subjectLid,
//        },
//        page: page,
//        pageSize: 10,
//        search: search || '',
//        searchColumns: ['md.master_input_name', 'md.input_data_type'],  // search in the CTE columns
//        sort: {
//            column: sort || 'md.id',  // sort based on the CTE columns
//            order: order || 'desc',
//        },
//    });

//    return data;
// };

export const masterPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType,username:string) => {
    console.log('filter ', JSON.stringify(filters), { page, limit, sort, order, search, filters });
 
    const data = await paginationQueryBuilderWithPlaceholder<Session>({
        baseQuery: `SELECT 
				md.id AS id,
                md.name AS master_input_name,
                mi.input_name AS input_data_type
				FROM master_input_data md
				INNER JOIN master_inputs mi ON mi.id = md.input_type
				WHERE mi.active = TRUE AND md.active AND md.created_by='${username}'
                {{whereClause}}`,
        
                placeholders: [
                    {
                        placeholder: '{{whereClause}}',
                        filters: {
                        //     'pp.program_name': filters.programName,
                        //     'ss.subject_name': filters.subjectName,
                        //     'ms.abbr': filters.abbr
                        },
                        searchColumns: ['md.name', 'mi.input_name'],
                        orderBy: {
                        column: sort || 'md.id',
                        order: order || 'desc',
                        },
                    }
                ],
        page: page,
        pageSize: 10,
        search: search || '',
        // sort: {
        //     column: sort || 'md.id',  // sort based on the CTE columns
        //     order: order || 'desc',
        // },
    });
 
    return data;
 };

 
 export const masterDataScrollPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType) => {
   const data = await infiniteScrollQueryBuilder<Session>({
      baseQuery: `SELECT DISTINCT u.id,u.first_name,u.last_name,u.username FROM public.user u INNER JOIN user_role ur ON u.id = ur.user_lid 
      WHERE ur.role_lid = 2 AND u.active = TRUE AND ur.active = TRUE 
      AND u.id NOT IN (SELECT DISTINCT faculty_lid FROM faculties WHERE active = TRUE AND faculty_lid IS NOT NULL)`,

      filters: {
         // 'usi.program_lid': filters.programLid,
         // 'usi.session_lid': filters.sessionLid,
         // 'usi.subject_lid': filters.subjectLid,
      },
      cursor: {
         column: 'u.id',
         value: Number(filters.cursor)
      },
      limit: limit.toString(),
      search: search || '',
      searchColumns: ['u.username', 'u.first_name', 'u.last_name'],
      sort: {
         column: sort || 'u.id',
         order: order || 'desc',
      },
   });

   return data;
};


export const insertMasterDataModel = async (masterData : masterDataDetails) => {
   const data = await sql`SELECT * FROM insert_master_data(${JSON.parse(JSON.stringify(masterData))}, '1');`;

   return data;
};


export const masterDataEditViewModel = async(masterId : number) => {
   console.log('masterId ====>>>>>', masterId);
   const data = await sql`SELECT 
                    mid.id AS master_id,
                    mid.name AS master_input_name,
                    mid.faculty_lid AS faculty_lid,
                    mid.input_type AS input_type,
                    mi.input_name AS input_data_type
                FROM 
                    public.master_input_data mid
                INNER JOIN 
                    public.master_inputs mi
                ON 
                    mid.input_type = mi.id
                WHERE 
					mid.id = ${masterId} AND
                    mi.active = true AND mid.active = true`;
   return data;
} 



export const upsertMasterDataModel = async (masterData : updMasterDetails, masterId: number) => {
   console.log('masterData in model ===>>>>', masterData);
   const masterDataArray = masterData.master_data;
   console.log('masterDataArray ===>>>', masterDataArray);

   const data = await sql`SELECT * FROM upsert_master_data(${JSON.parse(JSON.stringify(masterData))}, '1');`;

   return data;
};

export const viewMasterDataModel = async(masterId : number) => {
   const data = await sql`SELECT 
                    mid.id AS id,
                    mid.name AS master_input_name,
					mid.faculty_lid AS faculty_lid,
                    mi.input_name AS master_type
                FROM 
                    public.master_input_data mid
                INNER JOIN 
                    public.master_inputs mi
                ON 
                    mid.input_type = mi.id
                WHERE 
					mid.id = ${masterId} AND
                    mi.active = true AND mid.active = true`;

      return data
}


export const masterDataDelete = async(masterId : number) => {
   const data = await sql`UPDATE master_input_data SET active = false,modified_date=now(),modified_by='1' WHERE id = ${masterId}`;

   return data.count > 0 ? {
   status:200,
   message:'Deleted Successfully !'
} : {
   status:400,
   message:'Failed To Delete !'
}; 
}


