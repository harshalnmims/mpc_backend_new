import { getLogger } from '$config/logger-context';
import { getAttendeesModel, getCourseAnchorModel, getProgramAnchorModel } from '$model/anchors.model';
import { submitFormAModel, updateFormAModel, viewFormAModel } from '$model/form_a.model';
import { MeetingDetails } from 'types/base.types';
import { paginationDefaultType } from 'types/db.default';

export const submitFormAService = async (FormAJson: MeetingDetails) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await submitFormAModel(FormAJson);

   return data;
};

export const viewFormAService = async (meetingId: string) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await viewFormAModel(meetingId);

   return data;
};

export const updateFormAService = async (FormAJson: MeetingDetails) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY SERVICES');

   const data = await updateFormAModel(FormAJson);

   return data;
};
