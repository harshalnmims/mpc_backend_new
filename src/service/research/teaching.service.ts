import {getPaginateModel} from '$model/teaching.model';
import { paginationDefaultType } from 'types/db.default';
import {uploadMultiFile} from '$middleware/fileupload.middleware'
import { Request,Response } from 'express';
import { downloadFile } from '$middleware/fileupload.middleware';
import { TeachingExcellance } from 'types/research.types';
import {insertTeachingModel,deleteTeachingModel} from '$model/teaching.model';



export const getTeachingPaginateService = async ( 
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

export const insertTeachingService = async (teachingDetails: any, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {
 
   
    let uploadDocuments = await uploadMultiFile(documents);
    console.log(uploadDocuments)

    let obj : TeachingExcellance = {
        pedagogy_innovation: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'pi').map((dt: { description: any; }) => dt.description)[0] || null,
        pedagogy_link: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'pi').map((dt: { link: any; }) => dt.link)[0] || null ,
        fdp_program: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'ap').map((dt: { description: any; }) => dt.description)[0] || null,
        fdp_link: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'ap').map((dt: { link: any; }) => dt.link)[0] || null,
        student_workshops: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'ws').map((dt: { description: any; }) => dt.description)[0] || null,
        workshop_link: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'ws').map((dt: { link: any; }) => dt.link)[0] || null,
        niche: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'nw').map((dt: { description: any; }) => dt.description)[0] || null,
        niche_link: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'nw').map((dt: { link: any; }) => dt.link)[0] || null ,
        program_orientation: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'po').map((dt: { description: any; }) => dt.description)[0] || null,
        program_orientation_link: teachingDetails.filter((data: { input_type: string; }) => data.input_type === 'po').map((dt: { link: any; }) => dt.link)[0] || null,
        documents: uploadDocuments
    }   

    console.log('teaching final json ',JSON.stringify(obj))

    const data = await insertTeachingModel(obj);
    return data;
}

export const deleteTeachingService = async (teachingId : number) => {
    const data = await deleteTeachingModel(teachingId);
    return data;
}