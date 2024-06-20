import { getLogger } from '$config/logger-context';
import {
   analyticsAllProgramsByIdService,
   analyticsAllProgramsService,
   campusByProgramService,
   schoolListService,
   subjectListByProgramAndYearService,
} from '$service/faculty/analytics.service';
import { Request, Response, NextFunction } from 'express';

export const analyticsAllPrograms = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const { acad_year = new Date().getFullYear() } = { ...req.body, ...req.params, ...req.query };
   const data = await analyticsAllProgramsService(acad_year);

   return res.status(200).json(data);
};

export const analyticsAllProgramsById = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const { ProgramId = 0 } = { ...req.body, ...req.params, ...req.query };
   const data = await analyticsAllProgramsByIdService(ProgramId);

   return res.status(200).json(data);
};

export const schoolList = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');
 
    const { user_lid = 0 } = { ...req.body, ...req.params, ...req.query };
    const data = await schoolListService(user_lid);

    return res.status(200).json(data);
 };

export const subjectListByProgramAndYear = async (req: Request, res: Response, next: NextFunction) => {
   const logger = getLogger();
   logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');

   const { ProgramId = 0, acad_year = new Date().getFullYear() } = { ...req.body, ...req.params, ...req.query };
   const data = await subjectListByProgramAndYearService(ProgramId, acad_year);

   return res.status(200).json(data);
};

export const campusByProgram = async (req: Request, res: Response, next: NextFunction) => {
    const logger = getLogger();
    logger.info('INSIDE GET SUBJECT FACULTY CONTROLLER');
 
    const { ProgramId = 0, acad_year = new Date().getFullYear() } = { ...req.body, ...req.params, ...req.query };
    const data = await campusByProgramService(ProgramId);
 
    return res.status(200).json(data);
 };
