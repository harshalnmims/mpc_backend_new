import {
   iprPaginateService,
   insertIPRService,
   updateIPRService,
   deleteIPRService,
   iprRenderService,
   iprEditViewService,
   viewIprService,
   iprDownloadFilesService,
} from '$service/research/IPR-service';

import { getLogger } from '$config/logger-context';

import { Request, Response, NextFunction } from 'express';

import { validateWithZod } from '$middleware/validation.middleware';

import { filesArraySchema } from '$validations/research.valid';
import { iprDetails } from '$validations/research.valid';

import AWS from 'aws-sdk';

import { AwsData } from 'types/base.types';

export const iprPaginate = async (req: Request, res: Response, next: NextFunction) => {
   const {
      page = 1,

      limit = 10,

      sort = '',

      order = 'desc',

      search = '',

      ...filters
   } = { ...req.body, ...req.params, ...req.query };

   const data = await iprPaginateService({
      page,

      limit,

      search,

      sort,

      order,

      filters,
   });

   console.log('data responce in controller ====>>>>>', data);

   return res.status(200).json(data);
};

export const iprRenderData = async (req: Request, res: Response, next: NextFunction) => {
   const data = await iprRenderService();

   console.log('journal data ', JSON.stringify(data));

   return res.status(200).json(data);
};

export const insertIpr = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   let iprData = JSON.parse(req.body.ipr_data);
   console.log('iprData ankit ===>>>>>', iprData);
   let data;
   let files = req.files;
   console.log('files ===>>>>>', files);
   let result = validateWithZod(iprDetails, iprData);
   let fileResult = validateWithZod(filesArraySchema, files);
   console.log('result ===>>>>>>', result);
   if (result.success && fileResult.success) {
      data = await insertIPRService(iprData, files);
   }

   return res.status(200).json(data);
};

export const iprEditViewForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const id = req.query.id;
   const iprId = Number(id);

   const data = await iprEditViewService(iprId);

   console.log('data response in controller ====>>>>', data);
   return res.status(200).json(data);
};

export const updateIPR = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   let iprData = JSON.parse(req.body.update_ipr_data);
   let iprId = JSON.parse(req.body.ipr_id);
   console.log('iprData ankit ===>>>>>', iprData);
   console.log('iprId  ===>>>>>', iprId);
   let data;
   let files = req.files;
   console.log('files ===>>>>>', files);
   let result = validateWithZod(iprDetails, iprData);
   let fileResult = validateWithZod(filesArraySchema, files);
   console.log('result ===>>>>>>', result);
   if (result.success && fileResult.success) {
      data = await updateIPRService(iprId, iprData, files);
   }

   console.log('data responce in controller ===>>>>', data);

   return res.status(200).json(data);
};

export const viewIprForm = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();

   const id = req.query.id;
   const iprId = Number(id);
   console.log('iprId ===>>>>', iprId);
   const data = await viewIprService(iprId);

   console.log('data respoinse in controller ===>>>>>', data);

   return res.status(200).json(data);
};

export const deleteIPR = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   const id = req.query.id;
   const iprId = Number(id);
   console.log('iprId ===>>>>', iprId);

   const data = await deleteIPRService(iprId);

   return res.status(200).json(data);
};

export const downloadIprFiles = async (req: Request, res: Response, next: NextFunction) => {
   const iprId = req.query.id;
   console.log('iprId ', iprId);

   await iprDownloadFilesService(Number(iprId), req, res);
};
