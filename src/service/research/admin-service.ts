import { getAdminCampus, getAdminSchool , adminPaginateModel , getAdminLevel , adminDashboardModulesModel} from '$model/admin-model';
import { getFormLevels , getAdminModules} from '$model/master-model';
import { paginationDefaultType } from 'types/db.default';

export const adminRenderService = async (username : string,id:number) => {
    const level = await getFormLevels();
    const modules = await getAdminModules(id);
    const campus = await getAdminCampus(username);
    const school = await getAdminSchool(username);
    const approvalLevel = await getAdminLevel(username);
    return {level,modules,campus,school,approvalLevel};
}

export const adminPaginateService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
   
    const data = await adminPaginateModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

 export const adminDashboardModulesService = async () => {
   const data = await adminDashboardModulesModel();
   return data;
 }