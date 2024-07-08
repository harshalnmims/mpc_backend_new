import {getPaginateModel} from '$model/meeting.model';
import { paginationDefaultType } from 'types/db.default';


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