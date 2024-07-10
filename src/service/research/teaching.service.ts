import {getPaginateModel} from '$model/teaching.model';
import { paginationDefaultType } from 'types/db.default';
import {uploadMultiFile} from '$middleware/fileupload.middleware'
import { Request,Response } from 'express';
import { downloadFile } from '$middleware/fileupload.middleware';
import { TeachingExcellance } from 'types/research.types';
import {insertTeachingModel,deleteTeachingModel,updateViewData,teachingViewData,getParticularInputs,
updateTeachingModel,teachingFiles
} from '$model/teaching.model';
import { DropdownValue, Module, TeachingExcellanceInput, UpdateViewType , TeachingExcellanceDb} from 'types/research.master';
import { stringify } from 'querystring';



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

export const updateTeachingService = async (teachingDetails: any, documents: { [fieldname: string]: Express.Multer.File[]; } | Express.Multer.File[] | undefined,teachingId : number) => {
 
   
  let uploadDocuments = await uploadMultiFile(documents);
  console.log(uploadDocuments)

  let obj : TeachingExcellance = {
      teaching_id : teachingId,
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

  const data = await updateTeachingModel(obj);
  return data;
}

export const deleteTeachingService = async (teachingId : number) => {
    const data = await deleteTeachingModel(teachingId);
    return data;
}

export const updateViewService = async (teachingId : number) => {
  let dropdownData = await teachingViewData();
  let teachingExcellanceData = await updateViewData(teachingId);
  console.log('received view ',JSON.stringify(teachingExcellanceData))

  let modules: Module[]  = [] ;

  if (teachingExcellanceData.count > 0) {
    console.log('inside teaching ');

    const columns: { key: keyof TeachingExcellanceDb; link: keyof TeachingExcellanceDb; abbr: string }[] = [
      { key: 'pedagogy_innovation', link: 'pedagogy_link', abbr: 'pi' },
      { key: 'fdp_program', link: 'fdp_link', abbr: 'ap' },
      { key: 'student_workshops', link: 'workshop_link', abbr: 'ws' },
      { key: 'niche', link: 'niche_link', abbr: 'nw' },
      { key: 'program_orientation', link: 'orientation_link', abbr: 'po' }
    ];

    modules = await Promise.all(columns.map(async (column: any,index) => {
      const description = teachingExcellanceData[0][column.key];
      const link = teachingExcellanceData[0][column.link];

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
      }else{
        return null
      } 
    }));

    modules = modules.filter(module => module !== null);

  }

  console.log('modules ',modules)
  return {teachingId : teachingId ,teaching_inputs : dropdownData , teaching_data: modules , type_abbr : 'te'};

}

async function getDropdownValue(typeName: string):Promise<DropdownValue | null> {
    const item : any = await getParticularInputs(typeName);
    console.log('dropdown items ',JSON,stringify(item))
    return item ? { value: item[0].abbr, label: item[0].input } : null;
  }

  
export const teachingViewService = async (teachingId : number) => {

  let teachingExcellanceData = await updateViewData(teachingId);
  console.log('received view ',JSON.stringify(teachingExcellanceData))

  let modules: Module[]  = [] ;

  if (teachingExcellanceData.count > 0) {
    console.log('inside teaching ');

    const columns: { key: keyof TeachingExcellanceDb; link: keyof TeachingExcellanceDb; abbr: string }[] = [
      { key: 'pedagogy_innovation', link: 'pedagogy_link', abbr: 'pi' },
      { key: 'fdp_program', link: 'fdp_link', abbr: 'ap' },
      { key: 'student_workshops', link: 'workshop_link', abbr: 'ws' },
      { key: 'niche', link: 'niche_link', abbr: 'nw' },
      { key: 'program_orientation', link: 'orientation_link', abbr: 'po' }
    ];

    modules = await Promise.all(columns.map(async (column: any,index) => {
      const description = teachingExcellanceData[0][column.key];
      const link = teachingExcellanceData[0][column.link];

      if (description != null && description != undefined) {
        const dropdownValue = await getDropdownValue(column.abbr);

        return {
          id: index,
          type: dropdownValue,
          description,
          link: link || '',
        };
      }else{
        return null
      } 
    }));

    modules = modules.filter(module => module !== null);

  }

  console.log('modules ',modules)
  return {teachingId : teachingId,type_abbr:'te',teaching_data : modules};

}


export const teachingDownloadFileService = async (teachingId : number,abbr:string,req:Request,res:Response) => {
   // const logger = getLogger();

   const data = await teachingFiles(teachingId,abbr);
   let files : string[] = data.map((dt) => dt.document_name); 
   await downloadFile(files, req,res);
 } 