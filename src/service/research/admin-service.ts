import { getAdminCampus } from '$model/admin-model';
import { getFormLevels , getAdminModules} from '$model/master-model';
import { paginationDefaultType } from 'types/db.default';

export const adminRenderService = async (username : string) => {
    const level = await getFormLevels();
    const modules = await getAdminModules();
    const campus = await getAdminCampus(username);

    return {level,modules,campus};
}