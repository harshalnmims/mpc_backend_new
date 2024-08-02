import { getLogger } from '$config/logger-context';
import {
   getResearchProjectService,
   insertResearchProjectService,
   updateResearchProjectService,
   deleteResearchProjectService,
   researchProjectRenderService,
   researchProjectEditViewService,
   viewResearchProjectService,
   researchProjectDownloadFilesService,
} from '$service/research/research-project-service';
import { Request, Response, NextFunction } from 'express';

import { validateWithZod } from '$middleware/validation.middleware';

import { filesArraySchema } from '$validations/research.valid';
import { researchProjectDetails } from '$validations/research.valid';

import AWS from 'aws-sdk';

import { AwsData } from 'types/base.types';

export const getResearchProjectForm = async (req: Request, res: Response, next: NextFunction) => {
   const {
      page = 1,

      limit = 10,

      sort = '',

      order = 'desc',

      search = '',

      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   let username = res.locals.username;

   const data = await getResearchProjectService({
      page,
      limit,
      search,
      sort,
      order,
      filters,
   },username);

   console.log('data responce in controller ====>>>>>', data);
   return res.status(200).json(data);
};

export const researchProjectRenderData = async (req: Request, res: Response, next: NextFunction) => {
   const data = await researchProjectRenderService();

   console.log('journal data ', JSON.stringify(data));

   return res.status(200).json(data);
};

export const insertResearchForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   let researchData = JSON.parse(req.body.ipr_data);
   console.log('researchData ankit ===>>>>>', researchData);
   let data;
   let files = req.files;
   console.log('files ===>>>>>', files);
   let result = validateWithZod(researchProjectDetails, researchData);
   let fileResult = validateWithZod(filesArraySchema, files);
   let username =res.locals.username;
   console.log('result ===>>>>>>', result);
   if (result.success && fileResult.success) {
      data = await insertResearchProjectService(researchData, files,username);
   }

   return res.status(200).json(data);
};

export const researchProjectEditViewForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const id = req.query.id;
   const iprId = Number(id);
   let username =res.locals.username;

   const data = await researchProjectEditViewService(iprId,username);

   console.log('data response in controller ====>>>>', data);
   return res.status(200).json(data);
};

export const updateResearchForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   let updateResearchData = JSON.parse(req.body.update_research_project_data);
   let researchProjectId = JSON.parse(req.body.research_project_id);
   console.log('updateResearchData  ===>>>>>', updateResearchData);
   console.log('researchProjectId  ===>>>>>', researchProjectId);
   let data;
   let files = req.files;
   console.log('files ===>>>>>', files);
   let result = validateWithZod(researchProjectDetails, updateResearchData);
   let fileResult = validateWithZod(filesArraySchema, files);
   console.log('result ===>>>>>>', result);
   let username = res.locals.username;
   if (result.success && fileResult.success) {
      data = await updateResearchProjectService(researchProjectId, updateResearchData, files,username);
   }

   console.log('data responce in controller ===>>>>', data);

   return res.status(200).json(data);
};

export const viewResearchProjectForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   const id = req.query.id;
   let username = res.locals.username;
   const researchProjectId = Number(id);
   console.log('researchProjectId ===>>>>', researchProjectId);
   const data = await viewResearchProjectService(researchProjectId,username);

   console.log('data respoinse in controller ===>>>>>', data);

   return res.status(200).json(data);
};

export const deleteResearchForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const researchprojectId = req.query.id;
   console.log('iprId ', researchprojectId);
   let username = res.locals.username;
   const data = await deleteResearchProjectService(Number(researchprojectId),username);

   console.log(' data response in case of delete controller ===>>>>', data);

   return res.status(200).json(data);
};

export const downloadResearchProjectFiles = async (req: Request, res: Response, next: NextFunction) => {
   const researchprojectId = req.query.id;
   console.log('iprId ', researchprojectId);

   await researchProjectDownloadFilesService(Number(researchprojectId), req, res);
};
