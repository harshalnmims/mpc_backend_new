import {facultyPaginateModel,facultyScrollPaginateModel,facultyRenderModel,insertFacultyModel,facultyViewModel,facultyDeleteModel
   ,facultyUpdateViewModel
} from "$model/faculty-model"
import { paginationDefaultType } from "types/db.default";
import { facultyDetails } from "types/research.types";

export const facultyPaginateService = async ({
    page,
    limit,
    sort,
    order,
    search,
    ...filters
 }: paginationDefaultType) => {
 
    const data = await facultyPaginateModel({
       page,
       limit,
       sort,
       order,
       search,
       ...filters,
    });
 
    return data;
 };

 export const facultyScrollPaginateService =  async ({
   page,
   limit,
   sort,
   order,
   search,
   ...filters
}: paginationDefaultType) => {
  
   const data = await facultyScrollPaginateModel({
      page,
      limit,
      sort,
      order,
      search,
      ...filters,
   });

   return data;
};

export const facultyRenderService = async () => {
   const data = await facultyRenderModel();
   return data;
}

export const insertFacultyService = async (faculty : facultyDetails) => {
   const data = await insertFacultyModel(faculty);
   return data;
}

export const facultyViewService = async (faculty : number) => {
   const data = await facultyViewModel(faculty);
   return data;
}

export const facultyDeleteService = async (faculty : number) => {
   const data = await facultyDeleteModel(faculty);
   return data;
}

export const facultyUpdateViewService = async (faculty : number) => {
   const data = await facultyUpdateViewModel(faculty);
   return data;
}
