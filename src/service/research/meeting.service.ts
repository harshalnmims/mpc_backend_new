import {getPaginateModel} from '$model/meeting.model';
import { paginationDefaultType } from 'types/db.default';
import {uploadMultiFile} from '$middleware/fileupload.middleware'
import { Request,Response } from 'express';
import { downloadFile } from '$middleware/fileupload.middleware';
import { MeetingStakeholders } from 'types/research.types';
import {insertMeetingModel,deleteMeetingModel} from '$model/meeting.model';

export const getPaginateService = async ( 
    {page,
    limit,
    sort,
    order,
    search,
    ...filters
    }: paginationDefaultType) => {

        const data = await getPaginateModel({
            page,
            limit,
            sort,
            order,
            search,
            ...filters,
         });
  return data;
}

export const insertMeetingService = async (meetingDetails: any, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {

    let uploadDocuments = await uploadMultiFile(documents);
    console.log(uploadDocuments);

    let obj : MeetingStakeholders = {
        ranking: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'rn').map((dt: { description: any; }) => dt.description)[0] || null,
        ranking_link: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'rn').map((dt: { link: any; }) => dt.link)[0] || null ,
        accreditation: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'ac').map((dt: { description: any; }) => dt.description)[0] || null,
        accreditation_link: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'ac').map((dt: { link: any; }) => dt.link)[0] || null,
        achievements: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'sc').map((dt: { description: any; }) => dt.description)[0] || null,
        achievements_link: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'sc').map((dt: { link: any; }) => dt.link)[0] || null,
        convocation: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'cn').map((dt: { description: any; }) => dt.description)[0] || null,
        convocation_link: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'cn').map((dt: { link: any; }) => dt.link)[0] || null ,
        inaugral_program: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'ip').map((dt: { description: any; }) => dt.description)[0] || null,
        inaugral_program_link: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'ip').map((dt: { link: any; }) => dt.link)[0] || null,
        events: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'en').map((dt: { description: any; }) => dt.description)[0] || null,
        events_link: meetingDetails.filter((data: { input_type: string; }) => data.input_type === 'en').map((dt: { link: any; }) => dt.link)[0] || null,
        documents: uploadDocuments
    }   

    console.log('meeting final json ',JSON.stringify(obj))

    const data = await insertMeetingModel(obj);
    return data;
}

export const deleteMeetingService = async(meetingId : number) => {

    console.log('journalPaperId in service ===>>>', meetingId);
 
    const data = await deleteMeetingModel(meetingId);
    return data

 }