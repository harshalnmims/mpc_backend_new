import {facultyPaginateModel,facultyScrollPaginateModel,facultyRenderModel} from "$model/faculty-model"
import { paginationDefaultType } from "types/db.default";

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