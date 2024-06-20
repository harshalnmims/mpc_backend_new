import { Filter } from './db.helper';

export type paginationDefaultType = {
   page: number;
   limit: number;
   sort: string;
   order: 'asc' | 'desc';
   search: string;
   filters: Filter;
};
