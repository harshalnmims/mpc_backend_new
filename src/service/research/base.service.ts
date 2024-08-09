import {
    inputRenderedData,getDashboardModel,getresearchModulesModel,
    getPublicationModules, getProfileModules
 } from '$model/master-model';
import { teachingViewData } from '$model/teaching.model';
import { meetingViewData } from '$model/meeting.model';
import { brandingViewData } from '$model/branding.model';


export const inputService = async () => {
 const data = await inputRenderedData();
 return data;
}

export const inputViewService = async () => {
    const teaching = await teachingViewData();
    const meeting = await meetingViewData();
    const branding = await brandingViewData();
    return {teaching,meeting,branding};
}

export const getDashboardService = async  () => {
    const data = await getDashboardModel();
    return data;
}

export const getresearchModulesService = async  (username :string) => {
    const data = await getresearchModulesModel(username);
    return data;
}

export const getPublicationModulesService = async  (username :string) => {
    const data = await getPublicationModules(username);
    return data;
}


export const getProfileService = async  (username :string) => {
    const data = await getProfileModules(username);
    return data;
}
