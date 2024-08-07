import sql from '$config/db';

export const renderModal = async (abbr : string) => {
    console.log('master abbr ',abbr);
    const data = await sql`select md.id,md.name,m.input_name from master_input_data md INNER JOIN master_inputs m
    ON md.input_type = m.id WHERE m.abbr= ${abbr} AND m.active=TRUE AND md.active=TRUE`;
 
    return data.count > 0 ? {
       status:200,
       message:data
    } : {
       status:400,
       message: []
   }
 }
 
 export const getPolicyCadre = async () => {
    const data = await sql`select id,policy_name from policy_cadre where active=TRUE`;
 
    return data.count > 0 ? {
       status:200,
       message:data
    } : {
       status:400,
       message: []
   }
 }

 export const getNmimsAuthors = async () => {
    const data = await sql`select f.id,f.faculty_name from faculties f INNER JOIN faculty_type ft ON f.faculty_type_lid = ft.id 
    WHERE ft.abbr= 'int' AND f.active=TRUE AND ft.active=TRUE`;
 
    return data.count > 0 ? {
       status:200,
       message:data
    } : {
       status:400,
       message: []
   }
 }

export const getExternalAuthors = async () => {
    const data = await sql`select f.id,f.faculty_name from faculties f INNER JOIN faculty_type ft ON f.faculty_type_lid = ft.id 
    WHERE ft.abbr= 'ext' AND f.active=TRUE AND ft.active=TRUE`;
 
    return data.count > 0 ? {
       status:200,
       message:data
    } : {
       status:400,
       message: []
   }
 } 


 export const getAllAuthors = async () => {

    const data = await sql`select f.id,f.faculty_name from faculties f INNER JOIN faculty_type ft ON f.faculty_type_lid = ft.id 
    WHERE f.active=TRUE AND ft.active=TRUE`;
 
    return data.count > 0 ? {
       status:200,
       message:data
   } : {
       status:400,
       message: []
   }
 }

 export const getAbdcIndexed = async () => {
    const data = await sql`select * from abdc_types where active=TRUE`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message: []
    }
 }

 export const getPaperType = async () => {
    const data = await sql`select * from paper_type where active=TRUE`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message: []
    }
 }

//  export const getSchool = async () => {
//     const data = await sql`select distinct o.organization_name from user_campus uc 
//                             INNER JOIN campus c on c.id = uc.campus_lid
//                             INNER JOIN organization o on o.id = c.organization_lid`;

// console.log('campuss>>>>>>',data);


//     return data.count > 0 ? {
//         status:200,
//         message:data
//     } : {
//         status:400,
//         message: []
//     }
//  }

 export const getSchool = async (username : string) => {
    const data = await sql`select distinct o.organization_name from user_campus uc 
        INNER JOIN campus c on c.id = uc.campus_lid
        INNER JOIN organization o on o.id = c.organization_lid 
        INNER JOIN public.user pu on pu.id = uc.user_lid  where pu.username=${username}`;

console.log('campuss>>>>>>',data);


    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message: []
    }
 }

 export const getCampus = async (username : string) => {
    const data = await sql`select distinct c.campus_name from user_campus uc 
        INNER JOIN campus c on c.id = uc.campus_lid
        INNER JOIN public.user pu on pu.id = uc.user_lid  where pu.username= ${username}`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message: []
    }
 }

 export const inputRenderedData = async () => {
    const data = await sql`select * from module_inputs where active=TRUE`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message: []
    }
 }

 export const getEditors = async (username : string) => {
    const data = await sql` SELECT DISTINCT mid.id, mid.name
    FROM master_input_data mid
    INNER JOIN master_inputs mi ON mid.input_type = mi.id
    INNER JOIN public.user pu ON  pu.username = mid.created_by
    WHERE mid.created_by = ${username} AND mi.abbr='be' AND mid.active = true AND mi.active = true`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message: []
    }
 }

  export const getMasterAllAuthors = async (username : string) => {
    const data = await sql` SELECT DISTINCT mid.id, mid.name
                            FROM master_input_data mid
                            INNER JOIN master_inputs mi ON mid.input_type = mi.id
                            INNER JOIN public.user pu ON  pu.username = mid.created_by
                            WHERE mid.created_by = ${username} AND   mi.abbr='aa' AND mid.active = true AND mi.active = true`;

                            console.log('backend Data :::',data);
                            
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:[]
    }
 }

  export const getMasterNmimsAuthors = async (username : string) => {
    const data = await sql` SELECT DISTINCT mid.id, mid.name
                            FROM master_input_data mid
                            INNER JOIN master_inputs mi ON mid.input_type = mi.id
                            INNER JOIN public.user pu ON  pu.username = mid.created_by
                            WHERE mid.created_by = ${username} AND mi.abbr='na' AND mid.active = true AND mi.active = true`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message: []
 } 
}


 export const getExternalFaculty = async () => {
    const data = await sql`select f.id,f.faculty_name from faculties f INNER JOIN faculty_type ft ON f.faculty_type_lid = ft.id 
    WHERE ft.abbr= 'ext' AND f.active=TRUE AND ft.active=TRUE`;
 
    return data.count > 0 ? {
       status:200,
       message:data
   } : {
       status:400,
       message: []
   }
 }

 export const getEnternalFaculty = async () => {
    const data = await sql`select f.id,f.faculty_name from faculties f INNER JOIN faculty_type ft ON f.faculty_type_lid = ft.id 
    WHERE ft.abbr= 'int' AND f.active=TRUE AND ft.active=TRUE`;
 
    return data.count > 0 ? {
       status:200,
       message:data
   } : {
       status:400,
       message: []
   }
 }


 export const getSdgGoals = async () => {

    const data = await sql`select * from sdg_goals where active=TRUE`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {

        status:400,

        message:[]

    }

 }  


 export const getInventionType = async () => {

    const data = await sql`select * from invention_type where active=TRUE`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {

        status:400,

        message: []

    }

 }  


 export const getPatentStatus = async () => {

    const data = await sql`select * from patent_status where active=TRUE`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {

        status:400,

        message: []

    }

 } 


 export const getApplicantNames = async (username : string) => {
    const data = await sql` SELECT DISTINCT mid.id, mid.name
                            FROM master_input_data mid
                            INNER JOIN master_inputs mi ON mid.input_type = mi.id
                            INNER JOIN public.user pu ON  pu.username = mid.created_by
                            WHERE  mid.created_by = ${username} AND  mi.abbr='ipr' AND mid.active = true AND mi.active = true`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:[]
    }
 }  


 export const getResearchProjectStatus = async () => {

    const data = await sql`select * from research_project_status where active=TRUE`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {

        status:400,

        message: []

    }

 }  


 
 export const getMasterDatatype = async () => {

    const data = await sql`SELECT 
            id AS id,
            input_name AS name
        FROM 
            public.master_inputs
        WHERE 
            active = true`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {
        status:400,
        message:[]
    }
 } 
  
 export const getFormLevels = async () => {
    const data = await sql`SELECT * FROM status WHERE active = TRUE`;
    return data;
 }

 export const getAdminModules = async (id : number) => {
    const data = await sql`SELECT * FROM admin_modules WHERE id = ${id} AND active = TRUE`;
    return data;
 }

 export const getDashboardModel = async () => {
    const data = await sql`SELECT * FROM modules WHERE active = TRUE`;
    return data;
 }

 export const getresearchModulesModel = async (username : string) => {
    const data = await sql` SELECT 
                            m.id,
                            m.module_name,
                            m.url,
                            m.icon
                            FROM public.user u 
                            INNER JOIN user_role ur ON ur.user_lid = u.id
                            INNER JOIN modules m ON m.role_lid = ur.role_lid
                            WHERE u.username = ${username} AND m.role_lid = ur.role_lid
                            AND u.active = TRUE AND ur.active = TRUE AND m.active = TRUE`;
    return data;
 }

 export const getPublicationModules = async (username : string) => {
    const data = await sql`SELECT 
                            m.id,
                            m.module_name,
                            m.url,
                            m.icon
                            FROM public.user u 
                            INNER JOIN user_role ur ON ur.user_lid = u.id
                            INNER JOIN child_modules m ON m.role_lid = ur.role_lid
                            WHERE u.username = ${username} AND ur.role_lid = (SELECT id FROM role WHERE role='role_faculty' AND active = TRUE)
                            AND u.active = TRUE AND ur.active = TRUE AND m.active = TRUE and parent_module IN 
                            (SELECT id FROM modules where abbr = 'bps' AND active = TRUE)`;
    return data;
 }

 export const getUserRoleModel = async (username :string) => {
    const data = await sql`SELECT r.id,r.role FROM public.user u INNER JOIN user_role ur ON ur.user_lid = u.id 
    INNER JOIN role r ON r.id = ur.role_lid WHERE u.username = ${username} AND u.active = TRUE AND ur.active = TRUE AND r.active = TRUE`;
    return data;
 }