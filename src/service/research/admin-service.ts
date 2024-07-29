import { getAdminCampus, getAdminSchool , adminPaginateModel } from '$model/admin-model';
import { getFormLevels , getAdminModules} from '$model/master-model';
import { paginationDefaultType } from 'types/db.default';

export const adminRenderService = async (username : string) => {
    const level = await getFormLevels();
    const modules = await getAdminModules();
    const campus = await getAdminCampus(username);
    const school = await getAdminSchool(username);

    return {level,modules,campus,school};
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