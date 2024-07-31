import {
    inputRenderedData,getDashboardModel
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