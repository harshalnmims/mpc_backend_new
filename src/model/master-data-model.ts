import { paginationDefaultType } from 'types/db.default';
import sql from '$config/db';
import { infiniteScrollQueryBuilder, paginationQueryBuilder } from '$utils/db/query-builder';
import { Session } from 'types/base.types';
import { ApprovalDetails, facultyDetails, facultyUpdateDetails, masterDataDetails, updMasterDetails } from 'types/research.types';
import { number } from 'zod';
import { paginationQueryBuilderWithPlaceholder } from '$utils/db/query-builder-placeholder';


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
                {{whereClause}} ORDER BY md.id desc`,
        
                placeholders: [
                    {
                        placeholder: '{{whereClause}}',
                        filters: {
                        //     'pp.program_name': filters.programName,
                        //     'ss.subject_name': filters.subjectName,
                        //     'ms.abbr': filters.abbr
                        },
                        searchColumns: ['md.name', 'mi.input_name'],
                        // orderBy: {
                        // column: sort || 'md.id',
                        // order: order || 'desc',
                        // },
                    }
                ],
        page: page,
        pageSize: 10,
        search: search || '',
    });
 
    return data;
 };

 
 export const masterDataScrollPaginateModel = async ({ page, limit, sort, order, search, filters }: paginationDefaultType,username:string) => {
   const data = await infiniteScrollQueryBuilder<Session>({
      baseQuery: `SELECT DISTINCT u.id,u.first_name,u.last_name,u.username FROM public.user u 
                    INNER JOIN user_role ur ON u.id = ur.user_lid 
                    INNER JOIN user_campus uc ON uc.user_lid = u.id
                    INNER JOIN campus c ON c.id = uc.campus_lid 
                    WHERE ur.role_lid = 2 
                    AND uc.campus_lid IN (
                    SELECT 
                    DISTINCT uc.campus_lid
                    FROM public.user u 
                    INNER JOIN user_campus uc ON uc.user_lid = u.id
                    WHERE u.username = '${username}' AND u.active = TRUE AND uc.active = TRUE
                    )
                    AND u.id NOT IN (SELECT id FROM public.user WHERE username = '${username}' AND active = TRUE)
                    AND u.active = TRUE AND ur.active = TRUE AND uc.active = TRUE AND c.active = TRUE`,

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


export const insertMasterDataModel = async (masterData : masterDataDetails,username:string) => {
   const data = await sql`SELECT * FROM insert_master_data(${JSON.parse(JSON.stringify(masterData))}, ${username});`;

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



export const upsertMasterDataModel = async (masterData : updMasterDetails, masterId: number,username:string) => {
   console.log('masterData in model ===>>>>', masterData);
   const masterDataArray = masterData.master_data;
   console.log('masterDataArray ===>>>', masterDataArray);

   const data = await sql`SELECT * FROM upsert_master_data(${JSON.parse(JSON.stringify(masterData))}, ${username});`;

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


export const masterDataDelete = async(masterId : number,username:string) => {
   const data = await sql`UPDATE master_input_data SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${masterId}`;

   return data.count > 0 ? {
   status:200,
   message:'Deleted Successfully !'
} : {
   status:400,
   message:'Failed To Delete !'
}; 
}

const tableObj : any = {
    1 : 'journal_paper_article',
    2 : "book_publication",
    3 : "edited_book_publication",
    4 : "book_chapter_publication",
    5 : "conference",
    6 : "research_project",
    7 : "patent_submission_grant",
    8 : "ipr",
    9 : "research_award",
    10 : "e_content_development",
    11 : "research_seminar",
    12 : "case_study",
    13 : "teaching_excellance",
    14 : "meeting_stackholders",
    15 : "branding_advertisement"
}




export const approvalUserListForAdmin = async ({ page, limit, sort, order, search, filters }: paginationDefaultType,username :string, tableId : number) => {
    console.log('admin filters ',filters)
      
      if(filters.campus === 'All'){
        delete filters.campus
      }
  
      if(filters.school === 'All'){
        delete filters.school
      }
  
      if(filters.status === 'All'){
        delete filters.status
      }
  
    const data = await infiniteScrollQueryBuilder({
       baseQuery: ` SELECT 
                        pu.first_name, 
                        pu.last_name, 
                        pu.username,
                        jpa.id as research_form_id,
                        fs.id AS form_status_id,
                        CASE
                            WHEN fs.id IS NOT NULL THEN
                                CASE 
                                    WHEN (fs.status_lid = 3 AND fs.level_lid = 1) THEN (SELECT abbr FROM status WHERE abbr = 're' AND active = true)
                                    ELSE (SELECT abbr FROM status WHERE abbr = 'cp' AND active = true)
                                END
                            ELSE
                                (SELECT abbr FROM status WHERE abbr = 'pd' AND active = true)
                        END AS status
                    FROM 
                        ${tableObj[tableId]} jpa
                    INNER JOIN 
                        public.user pu ON pu.username = jpa.created_by
                    INNER JOIN 
                        user_role ur ON ur.user_lid = pu.id 
                    LEFT JOIN 
                        form_status fs ON jpa.form_status_lid = fs.id
  `,
  
       filters: {
          'c.id': filters.campus ,
          'o.id': filters.school ,
          'ud.status_lid' : filters.status
       },
       
       cursor: {
          column: 'jpa.id',
          value: Number(filters.cursor)
       },
       limit: limit.toString(),
       search: search || '',
       searchColumns: ['pu.username', 'pu.first_name', 'pu.last_name'],
       sort: {
          column: sort || 'jpa.id',
          order: order || 'desc',
       },
    });
  
    return data;
  };


  export const adminApprovalModal = async (username: string, approvalJson: ApprovalDetails[], tableId: number,level:number) => {
    console.log("approvalJson>>>>>>>>>>>>>>>>>>>>>>>>>>",approvalJson);
    console.log("tableObj>>>>>>>>>>>>>>>>>>>>>>>>>>",tableObj[tableId]);
    console.log("tableObj>>>>>>>>>>>>>>>>>>>>>>>>>>",tableId);
    
    if (!Array.isArray(approvalJson)) {
        throw new Error("approvalJson should be an array");
    }

    for (const item of approvalJson) {
        try {
            const data = await sql.begin(async sql => {
                const [newFormStatus] = await sql`
                    INSERT INTO form_status (status_lid, level_lid, created_by)
                    VALUES (${item.form_status}, ${level}, ${username})
                    RETURNING id`;

                await sql`
                    UPDATE ${sql(tableObj[tableId])}
                    SET form_status_lid = ${newFormStatus.id}
                    WHERE id = ${item.form_lid}`;
            });
            console.log(`Updated form_lid ${item.form_lid} successfully`);
        } catch (error) {
            console.error(`Error updating form_lid ${item.form_lid}:`, error);
        }
    }

    return {status: '200', message: 'Status Updated Successfully'}

}





