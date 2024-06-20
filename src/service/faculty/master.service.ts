import { getLogger } from '$config/logger-context';
import {
   insertMasterFormModel,
   updateMasterFormModel,
   viewMasterFormModel,
   viewMasterFormModelList,
} from '$model/meeting_master.model';
import { MasterMeeting } from 'types/base.types';
import { paginationDefaultType } from 'types/db.default';

export const insertMasterFormService = async (Json: MasterMeeting) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await insertMasterFormModel(Json);

   return data;
};

export const viewMasterFormService = async (meetingId: string) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await viewMasterFormModel(meetingId);

   return data;
};
export const viewMasterFormServiceList = async (meetingId: string) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await viewMasterFormModelList(meetingId);

   return data;
};

export const updateMasterFormListService = async (Json: MasterMeeting) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await updateMasterFormModel(Json);

   return data;
};
