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
       message:'Failed To Fetch!'
    }
 }
 
 export const getPolicyCadre = async () => {
    const data = await sql`select id,policy_name from policy_cadre where active=TRUE`;
 
    return data.count > 0 ? {
       status:200,
       message:data
    } : {
       status:400,
       message:'Failed To Fetch!'
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
       message:'Failed To Fetch!'
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
       message:'Failed To Fetch!'
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
       message:'Failed To Fetch!'
   }
 }

 export const getAbdcIndexed = async () => {
    const data = await sql`select * from abdc_types where active=TRUE`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
    }
 }

 export const getPaperType = async () => {
    const data = await sql`select * from paper_type where active=TRUE`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
    }
 }

 export const getSchool = async () => {
    const data = await sql`select * from nmims_school where active=TRUE`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
    }
 }

 export const getCampus = async () => {
    const data = await sql`select * from nmims_campus where active=TRUE`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
    }
 }

 export const inputRenderedData = async () => {
    const data = await sql`select * from module_inputs where active=TRUE`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
    }
 }

 export const getEditors = async () => {
    const data = await sql` SELECT DISTINCT mid.id, mid.name
                            FROM master_input_data mid
                            INNER JOIN master_inputs mi ON mid.input_type = mi.id
                            WHERE mi.abbr='be' AND mid.active = true AND mi.active = true`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
    }
 }

  export const getMasterAllAuthors = async () => {
    const data = await sql` SELECT DISTINCT mid.id, mid.name
                            FROM master_input_data mid
                            INNER JOIN master_inputs mi ON mid.input_type = mi.id
                            WHERE mi.abbr='aa' AND mid.active = true AND mi.active = true`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
    }
 }

  export const getMasterNmimsAuthors = async () => {
    const data = await sql` SELECT DISTINCT mid.id, mid.name
                            FROM master_input_data mid
                            INNER JOIN master_inputs mi ON mid.input_type = mi.id
                            WHERE mi.abbr='na' AND mid.active = true AND mi.active = true`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
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
       message:'Failed To Fetch!'
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
       message:'Failed To Fetch!'
   }
 }


 export const getSdgGoals = async () => {

    const data = await sql`select * from sdg_goals where active=TRUE`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {

        status:400,

        message:'Failed To Fetch!'

    }

 }  


 export const getInventionType = async () => {

    const data = await sql`select * from invention_type where active=TRUE`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {

        status:400,

        message:'Failed To Fetch!'

    }

 }  


 export const getPatentStatus = async () => {

    const data = await sql`select * from patent_status where active=TRUE`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {

        status:400,

        message:'Failed To Fetch!'

    }

 } 


 export const getApplicantNames = async () => {
    const data = await sql` SELECT DISTINCT mid.id, mid.name
                            FROM master_input_data mid
                            INNER JOIN master_inputs mi ON mid.input_type = mi.id
                            WHERE mi.abbr='ipr' AND mid.active = true AND mi.active = true`;
    return data.count > 0 ? {
        status:200,
        message:data
    } : {
        status:400,
        message:'Failed To Fetch!'
    }
 }  


 export const getResearchProjectStatus = async () => {

    const data = await sql`select * from research_project_status where active=TRUE`;

    return data.count > 0 ? {

        status:200,

        message:data

    } : {

        status:400,

        message:'Failed To Fetch!'

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
        message:'Failed To Fetch!'
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