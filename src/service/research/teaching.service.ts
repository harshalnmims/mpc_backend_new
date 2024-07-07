import {getPaginateModel} from '$model/teaching.model';
import { paginationDefaultType } from 'types/db.default';


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