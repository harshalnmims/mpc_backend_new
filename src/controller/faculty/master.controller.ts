import { getLogger } from '$config/logger-context';
import {
   insertMasterFormService,
   updateMasterFormListService,
   viewMasterFormService,
   viewMasterFormServiceList,
} from '$service/faculty/master.service';
import { Request, Response, NextFunction } from 'express';

export const insertMasterForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const MasterMeeting  = { ...req.body, ...req.params, ...req.query };

   const data = await insertMasterFormService(MasterMeeting);

   return res.status(200).json(data);
};

export const viewMasterForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const { meetingId = 0 } = { ...req.body, ...req.params, ...req.query };

   const data = await viewMasterFormService(meetingId);

   return res.status(200).json(data);
};

export const viewMasterFormList = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const { meetingId = 0 } = { ...req.body, ...req.params, ...req.query };

   const data = await viewMasterFormServiceList(meetingId);

   return res.status(200).json(data);
};

export const updateMasterForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const MasterMeeting  = { ...req.body, ...req.params, ...req.query };

   const data = await updateMasterFormListService(MasterMeeting);

   return res.status(200).json(data);
};
