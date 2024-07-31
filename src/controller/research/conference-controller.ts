import { getLogger } from '$config/logger-context';
import {
   getConferenceService,
   renderConferenceListsService,
   insertConferenceService,
   updateConferenceService,
   deleteConferenceService,
   conferenceEditViewService,
   viewConferenceService,
   downloadConferenceFilesServicve,
} from '$service/research/conference-service';
import exp from 'constants';
import { Request, Response, NextFunction } from 'express';
import { validateWithZod } from '$middleware/validation.middleware';
import { filesArraySchema } from '$validations/research.valid';
import { conferencePublication } from '$validations/research.valid';
import { number } from 'zod';

export const getConference = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT RESEARCH CONTROLLER');

   const {
      page = 1,
      limit = 10,
      sort = '',
      order = 'desc',
      search = '',
      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   const data = await getConferenceService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   });

   console.log('data in controller after render ===>>>>>>', data);

   return res.status(200).json(data);
};

export const insertConferenceForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   let conferenceData = JSON.parse(req.body.conference_publication);
   console.log('conferenceData ankit ===>>>>>', conferenceData);
   let data;
   let files = req.files;
   console.log('files ===>>>>>', files);
   let result = validateWithZod(conferencePublication, conferenceData);
   let fileResult = validateWithZod(filesArraySchema, files);
   console.log('result ===>>>>>>', result);
   if (result.success && fileResult.success) {
      data = await insertConferenceService(conferenceData, files);
   }

   console.log('data response conference controller  ====>>>>>>', data);

   return res.status(200).json(data);
};

export const renderConferenceLists = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const data = await renderConferenceListsService();
   return res.status(200).json(data);
};

export const conferenceEditFrom = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const id = req.query.id;
   const conferenceId = Number(id);

   const data = await conferenceEditViewService(conferenceId);

   console.log('data response in controller ====>>>>', data);
   return res.status(200).json(data);
};

export const updateConferenceForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   let updateConferenceData = JSON.parse(req.body.update_conference_publication);
   let conferenceId = JSON.parse(req.body.conference_id);
   console.log('conferenceId ====>>>>>>', conferenceId);

   console.log('conferenceData ankit ===>>>>>', updateConferenceData);
   let documents = req.files;
   let data;
   console.log('documents ===>>>>>', documents);
   let result = validateWithZod(conferencePublication, updateConferenceData);
   let fileResult = validateWithZod(filesArraySchema, documents);
   console.log('result ===>>>>>>', result);

   if (result.success && fileResult.success) {
      data = await updateConferenceService(conferenceId, updateConferenceData, documents);
   }

   console.log('data response conference update  controller  ====>>>>>>', data);

   return res.status(200).json(data);
};

export const deleteConferenceForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE updateConferenceForm CONTROLLER');

   const id = req.query.id;
   const conferenceId = Number(id);

   const data = await deleteConferenceService(conferenceId);

   console.log('data response conference update  controller  ====>>>>>>', data);

   return res.status(200).json(data);
};

export const viewConferenceForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   const id = req.query.id;
   const conferenceId = Number(id);

   const data = await viewConferenceService(conferenceId);
   console.log('data response conference view  controller  ====>>>>>>', data);

   return res.status(200).json(data);
};

export const downloadConferenceFiles = async (req: Request, res: Response, next: NextFunction) => {
   const id = req.query.id;
   const conferenceId = Number(id);
   console.log('conferenceId ===>>>>>', conferenceId);
   const abbr = req.query.abbr;
   console.log('abbr ===>>>>>', abbr);

   const data = await downloadConferenceFilesServicve(Number(id), String(abbr), req, res);
   return data;
};
