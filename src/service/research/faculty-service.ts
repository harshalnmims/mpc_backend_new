import {facultyPaginateModel} from "$model/faculty-model"
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