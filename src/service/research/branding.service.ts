import { downloadFile, getMultiUploadedFile, uploadMultiFile } from '$middleware/fileupload.middleware';
import {getPaginateModel,insertBrandingModel,deleteBrandingModel, brandingViewData,
    getParticularInputs,
    updateViewData,updateBrandingModel,brandingFiles,
    getbrandingFiles
} from '$model/branding.model';
import { paginationDefaultType } from 'types/db.default';
import { BrandingAdvertisementDb, DropdownValue, Module } from 'types/research.master';
import { BrandingAdvertisement } from 'types/research.types';
import { Request,Response } from 'express';


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

export const updateBrandingService =  async (brandingDetails: any, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,brandingId : number) => {

    let uploadDocuments = await uploadMultiFile(documents);
    console.log(uploadDocuments);

    let obj : BrandingAdvertisement = {
        branding_id : brandingId,
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

    console.log('branding upsert json ',JSON.stringify(obj))

    const data = await updateBrandingModel(obj);
    return data;
}

export const deleteBrandingService = async (brandingId : number) => {
    const data = await deleteBrandingModel(brandingId);
    return data;
}


 
export const updateViewService = async (brandingId : number) => {
    let dropdownData = await brandingViewData();
    let brandingData = await updateViewData(brandingId);
    console.log('received view ',JSON.stringify(brandingData))
  
    let modules: Module[] = [] ;
  
    if (brandingData.count > 0) {
      console.log('inside branding ');

      
      const columns: { key: keyof BrandingAdvertisementDb; link: keyof BrandingAdvertisementDb; abbr: string }[] = [
        { key: 'faculty_recognition', link: 'faculty_recognition_link', abbr: 'fr' },
        { key: 'faculty_awards', link: 'faculty_awards_link', abbr: 'fa' },
        { key: 'staff_awards', link: 'staff_awards_link', abbr: 'sa' },
        { key: 'alumni_awards', link: 'alumni_awards_link', abbr: 'aa' },
        { key: 'student_awards', link: 'student_awards_link', abbr: 'saa' },
        { key: 'international_ventures', link: 'international_ventures_link', abbr: 'ilv' },
        { key: 'conference_participation', link: 'conference_participation_link', abbr: 'cp' },
        { key: 'student_event', link: 'student_event_link', abbr: 'sep' },
        { key: 'organizing_conference', link: 'organizing_conference_link', abbr: 'ocan' },
        { key: 'newspaper_article', link: 'newspaper_article_link', abbr: 'na' }

      ];
  
      modules = await Promise.all(columns.map(async (column: any,index) => {
        const description = brandingData[0][column.key];
        const link = brandingData[0][column.link];
  
        if (description != null && description != undefined) {
          const dropdownValue = await getDropdownValue(column.abbr);
  
          return {
            id: index,
            type: dropdownValue,
            description,
            link: link || '',
            file: [],
            isPresent : true
          };
        } else {
          return null
        }
      }));

      modules = modules.filter(module => module !== null);

    }
  
    console.log('modules ',modules)
    // return {brandingId : brandingId,branding_inputs : dropdownData , branding_data: modules , type_abbr : 'ba'};
    return {brandingId : brandingId,dropdown_data : dropdownData , input_data: modules , type_abbr : 'ba'};

  }

  export const brandingViewService = async (brandingId : number) => {
    let brandingFiles = await getbrandingFiles(brandingId);
    let filesUrl = await getMultiUploadedFile(brandingFiles);
    let brandingData = await updateViewData(brandingId);
    console.log('received view ',JSON.stringify(brandingData))
  
    let modules: Module[] = [] ;
  
    if (brandingData.count > 0) {
      console.log('inside branding ');

      
      const columns: { key: keyof BrandingAdvertisementDb; link: keyof BrandingAdvertisementDb; abbr: string }[] = [
        { key: 'faculty_recognition', link: 'faculty_recognition_link', abbr: 'fr' },
        { key: 'faculty_awards', link: 'faculty_awards_link', abbr: 'fa' },
        { key: 'staff_awards', link: 'staff_awards_link', abbr: 'sa' },
        { key: 'alumni_awards', link: 'alumni_awards_link', abbr: 'aa' },
        { key: 'student_awards', link: 'student_awards_link', abbr: 'saa' },
        { key: 'international_ventures', link: 'international_ventures_link', abbr: 'ilv' },
        { key: 'conference_participation', link: 'conference_participation_link', abbr: 'cp' },
        { key: 'student_event', link: 'student_event_link', abbr: 'sep' },
        { key: 'organizing_conference', link: 'organizing_conference_link', abbr: 'ocan' },
        { key: 'newspaper_article', link: 'newspaper_article_link', abbr: 'na' }

      ];
  
      modules = await Promise.all(columns.map(async (column: any,index) => {
        const description = brandingData[0][column.key];
        const link = brandingData[0][column.link];
  
        if (description != null && description != undefined) {
          const dropdownValue = await getDropdownValue(column.abbr);
  
          return {
            id: index,
            type: dropdownValue,
            description,
            link: link || '',
          };
        } else {
          return null
        }
      }));

      modules = modules.filter(module => module !== null);

    }
  
    console.log('modules ',modules)
    return {brandingId : brandingId, branding_data: modules , type_abbr : 'ba',files : filesUrl};
  
  }
  
  async function getDropdownValue(typeName: string):Promise<DropdownValue | null> {
      const item : any = await getParticularInputs(typeName);
      console.log('dropdown items ',JSON.stringify(item))
      return item ? { value: item[0].abbr, label: item[0].input } : null;
    }

    export const brandingDownloadFileService = async (brandingId : number,abbr:string,req:Request,res:Response) => {
   // const logger = getLogger();

      const data = await brandingFiles(brandingId,abbr);
      let files : string[] = data.map((dt) => dt.document_name); 
      await downloadFile(files,req,res);
    }