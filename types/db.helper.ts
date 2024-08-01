export type Count = {
   count: number;
};

export type Filter = {
   [key: string]: string;
};

export type Cursor =  {
   column: string,
   value: number | undefined;
}

export type Sort = {
   column: string;
   order: 'asc' | 'desc';
};

export type PaginationQueryBuilderType = {
   baseQuery: string;
   filters: Filter;
   sort: Sort;
   page: number;
   pageSize: number;
   search: string;
   searchColumns: string[];
};

export type InfiniteScrollQueryBuilderType = {
   baseQuery: string;
   filters: Filter;
   sort: Sort;
   cursor: Cursor;
   limit: string;
   search: string;
   searchColumns: string[];
};

type Placeholder = any;

export type PaginationQueryBuilderTypeWithPlaceholder = {
   baseQuery: string;
   placeholders: Placeholder[]
   page: number;
   pageSize: number;
   search: string;
}
