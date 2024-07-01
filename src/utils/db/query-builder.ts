import sql from '$config/db';
import { PaginationQueryBuilderType, Filter, InfiniteScrollQueryBuilderType, Count } from 'types/db.helper';

interface Identifiable {
   id: number;
}

export const buildFilterConditions = (filters: Filter, values: (string | number)[]) => {
   const filterKeys = Object.keys(filters);
   return filterKeys
      .map((key) => {
         if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
            values.push(filters[key]);
            return `${key} = $${values.length}`;
         }
         return null;
      })
      .filter((condition) => condition !== null);
};

export const buildSearchCondition = (search: string, searchColumns: string[], values: (string | number)[]) => {
   if (search && searchColumns.length > 0) {
      const concatenatedColumns = searchColumns.map((column) => `COALESCE(${column}, '')`).join(` || ' ' || `);
      values.push(`%${search.toLowerCase()}%`);
      return `LOWER(CONCAT(${concatenatedColumns})) LIKE LOWER($${values.length})`;
   }
   return null;
};

export const paginationQueryBuilder = async <T>({
   baseQuery,
   filters = {},
   sort,
   page ,
   pageSize ,
   search,
   searchColumns = [],
}: PaginationQueryBuilderType): Promise<{ data: T[]; total: number }> => {
   let query = baseQuery;
   const values: (string | number)[] = [];

   console.log('page limits of data ',values)

   // Adding filters
   const filterConditions = buildFilterConditions(filters, values);
   if (filterConditions.length > 0) {
      query += (query.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') + filterConditions.join(' AND ');
   }

   // Add search conditions
   const searchCondition = buildSearchCondition(search, searchColumns, values);
   if (searchCondition) {
      query += (query.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') + searchCondition;
   }

   // Adding sorting
   if (sort.column) {
      query += ` ORDER BY ${sort.column} ${sort.order.toUpperCase()}`;
   }

   // Construct the total count query
   const totalCountQuery = `SELECT COUNT(*) FROM (${query}) as subquery`;

   // Adding pagination
   const offset = (page - 1) * pageSize;
   values.push(pageSize, offset);
   console.log("values>>>>>>>>>>", values);
   
   query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

   const countValues = values.slice(0, values.length - 2);
   // Execute both queries concurrently
   const [dataRes, countRes] = await Promise.all([
      sql.unsafe<T[]>(query, values),
      sql.unsafe<Count[]>(totalCountQuery, countValues),
   ]);

   return {
      data: dataRes,
      total: parseInt(countRes[0].count.toString(), 10),
   };
};

export const infiniteScrollQueryBuilder = async <T extends Identifiable>({
   baseQuery,
   filters = {},
   sort,
   cursor,
   limit = process.env.DEFAULT_LIMIT!,
   search = '',
   searchColumns = [],
}: InfiniteScrollQueryBuilderType): Promise<{ data: T[]; total: number; nextCursor: number | null }> => {
   let query = baseQuery;
   const values: (string | number)[] = [];
   const totalValues: (string | number)[] = [];

   // Adding filters
   const filterConditions = buildFilterConditions(filters, values);
   if (filterConditions.length > 0) {
      query += (query.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') + filterConditions.join(' AND ');
   }

   // Add search conditions
   const searchCondition = buildSearchCondition(search, searchColumns, values);
   if (searchCondition) {
      query += (query.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') + searchCondition;
   }

   // Adding cursor-based pagination
   if (cursor.value) {
      values.push(cursor.value);
      query += (query.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') + `${cursor.column} ${sort.order === "asc" ? '>' : '<'} $${values.length}`;
   }

   // Adding sorting
   if (sort.column) {
      query += ` ORDER BY ${sort.column} ${sort.order.toUpperCase()}`;
   }

   // Construct the total count query without cursor and limit
   const totalCountQuery = `SELECT COUNT(*) FROM (${baseQuery}) as subquery`;

   values.push(limit);
   query += ` LIMIT $${values.length}`;

   // Execute both queries concurrently
   const [dataRes, countRes] = await Promise.all([
      sql.unsafe<T[]>(query, values),
      sql.unsafe<Count[]>(totalCountQuery, totalValues),
   ]);

   return {
      data: dataRes,
      total: parseInt(countRes[0].count.toString(), 10),
      nextCursor: dataRes.length ? dataRes[sort.order === "asc" ? 0 : dataRes.length - 1].id : null,
   };
};
