import {getPaginateModel, getParticularInputs, meetingViewData, updateViewData} from '$model/meeting.model';
import { paginationDefaultType } from 'types/db.default';
import {uploadMultiFile} from '$middleware/fileupload.middleware'
import { Request,Response } from 'express';
import { downloadFile } from '$middleware/fileupload.middleware';
import { MeetingStakeholders } from 'types/research.types';
import {insertMeetingModel,deleteMeetingModel,updateMeetingModel} from '$model/meeting.model';
import { DropdownValue, MeetingStakeholderDb, Module } from 'types/research.master';

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

export const updateMeetingService = async (meetingDetails: any, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,meetingId:number) => {

    let uploadDocuments = await uploadMultiFile(documents);
    console.log(uploadDocuments);

    let obj : MeetingStakeholders = {
        meeting_id : meetingId,
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

    console.log('meeting upsert json ',JSON.stringify(obj))

    const data = await updateMeetingModel(obj);
    return data;
}


export const deleteMeetingService = async(meetingId : number) => {

    console.log('journalPaperId in service ===>>>', meetingId);
 
    const data = await deleteMeetingModel(meetingId);
    return data

 }

 
export const updateViewService = async (meetingId : number) => {
    let dropdownData = await meetingViewData();
    let meetingStakholdersData = await updateViewData(meetingId);
    console.log('received view ',JSON.stringify(meetingStakholdersData))
  
    let modules: Module[] = [] ;
  
    if (meetingStakholdersData.count > 0) {
      console.log('inside meeting ');
  
      const columns: { key: keyof MeetingStakeholderDb; link: keyof MeetingStakeholderDb; abbr: string }[] = [
        { key: 'ranking', link: 'ranking_link', abbr: 'rn' },
        { key: 'accreditation', link: 'accreditation_link', abbr: 'ac' },
        { key: 'achievements', link: 'achievements_link', abbr: 'sc' },
        { key: 'convocation', link: 'convocation_link', abbr: 'cn' },
        { key: 'inaugral_program', link: 'inaugral_program_link', abbr: 'ip' },
        { key: 'events', link: 'events_link', abbr: 'en' }
      ];
  
      modules = await Promise.all(columns.map(async (column: any,index) => {
        const description = meetingStakholdersData[0][column.key];
        const link = meetingStakholdersData[0][column.link];
  
        if (description != null && description != undefined) {
          const dropdownValue = await getDropdownValue(column.abbr);
  
          return {
            id: index,
            type: dropdownValue,
            description,
            link: link || '',
            file: [],
            isPresent : true
          };
        } else {
          return null
        }
      }));

      modules = modules.filter(module => module !== null);

    }
  
    console.log('modules ',modules)
    return {meetingId : meetingId,meeting_inputs : dropdownData , meeting_data: modules , type_abbr : 'ms'};
  
  }

  export const meetingViewService = async (meetingId : number) => {
    let meetingStakholdersData = await updateViewData(meetingId);
    console.log('received view ',JSON.stringify(meetingStakholdersData))
  
    let modules: Module[] = [] ;
  
    if (meetingStakholdersData.count > 0) {
      console.log('inside meeting ');
  
      const columns: { key: keyof MeetingStakeholderDb; link: keyof MeetingStakeholderDb; abbr: string }[] = [
        { key: 'ranking', link: 'ranking_link', abbr: 'rn' },
        { key: 'accreditation', link: 'accreditation_link', abbr: 'ac' },
        { key: 'achievements', link: 'achievements_link', abbr: 'sc' },
        { key: 'convocation', link: 'convocation_link', abbr: 'cn' },
        { key: 'inaugral_program', link: 'inaugral_program_link', abbr: 'ip' },
        { key: 'events', link: 'events_link', abbr: 'en' }
      ];
  
      modules = await Promise.all(columns.map(async (column: any,index) => {
        const description = meetingStakholdersData[0][column.key];
        const link = meetingStakholdersData[0][column.link];
  
        if (description != null && description != undefined) {
          const dropdownValue = await getDropdownValue(column.abbr);
  
          return {
            id: index,
            type: dropdownValue,
            description,
            link: link || '',
          };
        } else {
          return null
        }
      }));

      modules = modules.filter(module => module !== null);

    }
  
    console.log('modules ',modules)
    return {meetingId : meetingId,meeting_data: modules , type_abbr : 'ms'};
  
  }
  
  async function getDropdownValue(typeName: string):Promise<DropdownValue | null> {
      const item : any = await getParticularInputs(typeName);
      console.log('dropdown items ',JSON.stringify(item))
      return item ? { value: item[0].abbr, label: item[0].input } : null;
    }