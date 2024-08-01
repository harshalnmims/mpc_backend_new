import sql from "$config/db";
import { Count, Filter, PaginationQueryBuilderTypeWithPlaceholder } from "types/db.helper";

export const paginationQueryBuilderWithPlaceholder = async <T>({
    baseQuery,
    placeholders = [],
    page = 1,
    pageSize = 10,
    search,
 }: PaginationQueryBuilderTypeWithPlaceholder): Promise<{ data: T[]; total: number }> => {
    let query = baseQuery;
    const values: (string | number)[] = [];
 
    // Replace placeholders with actual conditions
    placeholders.forEach(({ placeholder, filters, groupBy, having, orderBy, searchColumns }) => {
       let replacement = '';
 
       if (filters) {
          replacement += buildWhereClause(filters, values);
       }
       if (groupBy) {
          replacement += ' ' + buildGroupByClause(groupBy);
       }
       if (having) {
          replacement += ' ' + buildHavingClause(having, values);
       }
       if (orderBy) {
          replacement += ' ' + buildOrderByClause(orderBy);
       }
 
       if (searchColumns) {
          const searchCondition = buildSearchCondition(search, searchColumns, values);
          if (searchCondition) {
             replacement += ' ' +  (query.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') + searchCondition;
          }
       }
 
       query = query.replace(placeholder, replacement);
    });
 
    // Adding pagination
    const offset = (page - 1) * pageSize;
    values.push(pageSize, offset);
    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
 
    // Construct the total count query
    const totalCountQuery = `SELECT COUNT(*) FROM (${query}) as subquery`;
 
    // Execute both queries concurrently
    const [dataRes, countRes] = await Promise.all([
       sql.unsafe<T[]>(query, values),
       sql.unsafe<Count[]>(totalCountQuery, values),
    ]);
 
    return {
       data: dataRes,
       total: parseInt(countRes[0].count.toString(), 10),
    };
 };


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
       const concatenatedColumns = searchColumns.map((column) => `COALESCE(${column}::TEXT, '')`).join(` || ' ' || `);
       values.push(`%${search.toLowerCase()}%`);
       return `LOWER(CONCAT(${concatenatedColumns})) LIKE LOWER($${values.length})`;
    }
    return null;
 };

 // Build Conditions Function
const buildConditions = (conditions: { [key: string]: any }, values: (string | number)[]) => {
    return Object.keys(conditions)
       .map((key) => {
          if (conditions[key] !== undefined && conditions[key] !== null && conditions[key] !== '') {
             values.push(conditions[key]);
             return `${key} = $${values.length}`;
          }
          return null;
       })
       .filter((condition) => condition !== null);
 };
 
 
 // Build Where Clause Function
 const buildWhereClause = (conditions: { [key: string]: any }, values: (string | number)[]) => {
    if (!conditions) return '';
    const whereConditions = buildConditions(conditions, values);
    return whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';
 };
 
 
 // Build Group By Clause Function
 const buildGroupByClause = (groupByColumns: string[]) => {
    return groupByColumns && groupByColumns.length > 0 ? 'GROUP BY ' + groupByColumns.join(', ') : '';
 };
 
 
 // Build Having Clause Function
 const buildHavingClause = (conditions: { [key: string]: any }, values: (string | number)[]) => {
    if (!conditions) return '';
    const havingConditions = buildConditions(conditions, values);
    return havingConditions.length > 0 ? 'HAVING ' + havingConditions.join(' AND ') : '';
 };
 
 
 // Build Order By Clause Function
 const buildOrderByClause = (orderBy: { column: string; order: 'asc' | 'desc' }) => {
    return orderBy ? `ORDER BY ${orderBy.column} ${orderBy.order.toUpperCase()}` : '';
 };