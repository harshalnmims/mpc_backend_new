import { uploadMultiFile } from '$middleware/fileupload.middleware';
import {getPaginateModel,insertBrandingModel,deleteBrandingModel} from '$model/branding.model';
import { paginationDefaultType } from 'types/db.default';
import { BrandingAdvertisement } from 'types/research.types';


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

export const insertBrandingService = async (brandingDetails: any, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined) => {

    let uploadDocuments = await uploadMultiFile(documents);
    console.log(uploadDocuments);

    let obj : BrandingAdvertisement = {
        faculty_recognition: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'fr').map((dt: { description: any; }) => dt.description)[0] || null,
        faculty_recognition_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'fr').map((dt: { link: any; }) => dt.link)[0] || null ,
        faculty_awards : brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'fa').map((dt: { description: any; }) => dt.description)[0] || null,
        faculty_awards_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'fa').map((dt: { link: any; }) => dt.link)[0] || null,
        staff_awards: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'sa').map((dt: { description: any; }) => dt.description)[0] || null,
        staff_awards_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'sa').map((dt: { link: any; }) => dt.link)[0] || null,
        alumni_awards: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'aa').map((dt: { description: any; }) => dt.description)[0] || null,
        alumni_awards_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'aa').map((dt: { link: any; }) => dt.link)[0] || null ,
        student_awards: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'saa').map((dt: { description: any; }) => dt.description)[0] || null,
        student_awards_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'saa').map((dt: { link: any; }) => dt.link)[0] || null,
        international_ventures: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'ilv').map((dt: { description: any; }) => dt.description)[0] || null,
        international_ventures_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'ilv').map((dt: { link: any; }) => dt.link)[0] || null,
        conference_participation: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'cp').map((dt: { description: any; }) => dt.description)[0] || null,
        conference_participation_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'cp').map((dt: { link: any; }) => dt.link)[0] || null,
        organizing_conference: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'ocan').map((dt: { description: any; }) => dt.description)[0] || null,
        organizing_conference_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'ocan').map((dt: { link: any; }) => dt.link)[0] || null,
        student_event: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'sep').map((dt: { description: any; }) => dt.description)[0] || null,
        student_event_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'sep').map((dt: { link: any; }) => dt.link)[0] || null,
        newspaper_article: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'na').map((dt: { description: any; }) => dt.description)[0] || null,
        newspaper_article_link: brandingDetails.filter((data: { input_type: string; }) => data.input_type === 'na').map((dt: { link: any; }) => dt.link)[0] || null,
        documents: uploadDocuments
    }   

    console.log('branding final json ',JSON.stringify(obj))

    const data = await insertBrandingModel(obj);
    return data;
}

export const deleteBrandingService = async (brandingId : number) => {
    const data = await deleteBrandingModel(brandingId);
    return data;
}