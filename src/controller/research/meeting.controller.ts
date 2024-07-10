import {Request,Response,NextFunction} from 'express'
import {getPaginateService,insertMeetingService,deleteMeetingService,updateViewService,
    updateMeetingService,meetingViewService
} from '$service/research/meeting.service'
import { validateWithZod } from '$middleware/validation.middleware';
import { filesArraySchema, meetingItemsSchema } from '$validations/research.valid';


export const getMeetingPaginate = async (req:Request,res:Response,next:NextFunction) => {
    const {
        page = 1,
        limit = 10,
        sort = '',
        order = 'desc',
        search = '',
        ...filters
     } = { ...req.body, ...req.params, ...req.query };

     const data = await getPaginateService({
     page ,
     limit,
     search,  
     sort,
     order,
     filters,
  });
    return res.status(200).json(data);
}

export const insertMeetingController = async(req : Request ,res : Response ,next : NextFunction) => {
    let data;
    console.log('request body ',JSON.stringify(req.body))
    let files = req.files;
    let meeting_json = JSON.parse(req.body.meeting_stakeholders);

    let result = validateWithZod(meetingItemsSchema,meeting_json);
    let fileResult = validateWithZod(filesArraySchema, files);

    if(fileResult.success && result.success){
     data = await insertMeetingService(meeting_json,files);
     }
        
    return res.status(200).json(data); 
}

export const deleteMeetingController = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    let data = await deleteMeetingService(Number(id));
    return res.status(200).json(data);
}

export const updateViewController = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    const data = await updateViewService(Number(id));
    console.log('view json ',JSON.stringify(data))
    return res.status(200).json(data);
}

export const meetingViewController = async (req : Request ,res : Response ,next : NextFunction) => {
    let id = req.query.id;
    const data = await meetingViewService(Number(id));
    console.log('view json ',JSON.stringify(data))
    return res.status(200).json(data);
}

export const updateMeetingController = async (req : Request ,res : Response ,next : NextFunction) => {
    let data;
    let files = req.files;
    let meeting_json = JSON.parse(req.body.meeting_stakeholders);
    let meetingId = JSON.parse(req.body.meetingId);
    // console.log('request upsert json ',JSON.stringify(req.body.teachingId));

    let result = validateWithZod(meetingItemsSchema,meeting_json);
    let fileResult = validateWithZod(filesArraySchema, files);

    if(fileResult.success && result.success){
      data = await updateMeetingService(meeting_json,files,meetingId);
     }
        
    return res.status(200).json(data); 

}