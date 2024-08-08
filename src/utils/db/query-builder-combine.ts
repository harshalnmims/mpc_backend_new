import sql from '$config/db';
import { Count, PlaceholderUpdated } from 'types/db.helper';

type Identifiable = {
   id: number;
};

// Build filter conditions for WHERE clauses
export const buildFilterConditions = (filters: { [key: string]: any }, values: (string | number)[]) => {
   return Object.keys(filters)
      .map((key) => {
         if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
            values.push(filters[key]);
            return `${key} = $${values.length}`;
         }
         return null;
      })
      .filter((condition) => condition !== null)
      .join(' AND ');
};

// Build search condition for full-text search
export const buildSearchCondition = (search: string, searchColumns: string[], values: (string | number)[]) => {
   if (search && searchColumns.length > 0) {
      const concatenatedColumns = searchColumns.map((column) => `COALESCE(${column}::TEXT, '')`).join(` || ' ' || `);
      values.push(`%${search.toLowerCase()}%`);
      return `LOWER(CONCAT(${concatenatedColumns})) LIKE LOWER($${values.length})`;
   }
   return '';
};

// Build GROUP BY clause
const buildGroupByClause = (groupByColumns: string[]) => {
   return groupByColumns.length > 0 ? 'GROUP BY ' + groupByColumns.join(', ') : '';
};

// Build HAVING clause
const buildHavingClause = (conditions: { [key: string]: any }, values: (string | number)[]) => {
   const havingConditions = buildFilterConditions(conditions, values);
   return havingConditions ? 'HAVING ' + havingConditions : '';
};

// Build ORDER BY clause
const buildOrderByClause = (orderBy: { column: string; order: 'asc' | 'desc' }) => {
   return orderBy ? `ORDER BY ${orderBy.column} ${orderBy.order.toUpperCase()}` : '';
};

// Build WHERE clause with default conditions
export const buildWhereClause = (conditions: { [key: string]: any }, values: (string | number)[]) => {
   const whereConditions = buildFilterConditions(conditions, values);
   return whereConditions ? 'AND ' + whereConditions : '';
};

export const paginationQueryBuilderWithPlaceholder = async <T>({
   baseQuery,
   placeholders = [] as PlaceholderUpdated[],
   page = 1,
   pageSize = 10,
   search = '',
   searchColumns = [],
   includeTotalCount = false,
}: {
   baseQuery: string;
   placeholders?: PlaceholderUpdated[];
   page?: number;
   pageSize?: number;
   search?: string;
   searchColumns?: string[];
   includeTotalCount?: boolean;
}): Promise<{ data: T[]; total?: number }> => {
   let query = baseQuery;
   const values: (string | number)[] = [];

   // Default WHERE clause
   const defaultWhereClause = ' WHERE 1=1 ';

   // Replace placeholders with actual conditions
   placeholders.forEach(({ placeholder, filters, groupBy, having, orderBy, defaultFilters }) => {
      let replacement = defaultFilters || defaultWhereClause;

      if (filters) {
         replacement += ' ' + buildWhereClause(filters, values);
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
            replacement += ' ' + (replacement.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') + searchCondition;
         }
      }

      query = query.replace(placeholder, replacement);
   });

   let totalCount = 0;
   if (includeTotalCount) {
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

      totalCount = parseInt(countRes[0].count.toString(), 10);
      return {
         data: dataRes,
         total: totalCount,
      };
   } else {
      // Adding pagination
      const offset = (page - 1) * pageSize;
      values.push(pageSize, offset);
      query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;
      const dataRes = await sql.unsafe<T[]>(query, values);
      return {
         data: dataRes,
      };
   }
};

export const infiniteScrollQueryBuilderWithPlaceholder = async <T extends Identifiable>({
   baseQuery,
   placeholders = [] as PlaceholderUpdated[],
   cursor,
   search = '',
   includeTotalCount = false,
}: {
   baseQuery: string;
   placeholders?: PlaceholderUpdated[];
   cursor?: { column: string; value: number | null };
   search?: string;
   searchColumns?: string[];
   includeTotalCount?: boolean;
}): Promise<{ data: T[]; total?: number; nextCursor: number | null }> => {
   let query = baseQuery;
   const values: (string | number)[] = [];

   // Default WHERE clause
   const defaultWhereClause = ' WHERE 1=1 ';

   // Replace placeholders with actual conditions
   placeholders.forEach(({ placeholder, filters, groupBy, having, orderBy, defaultFilters, searchColumns }) => {
    let replacement = defaultFilters || defaultWhereClause;

      if (filters) {
         replacement += ' ' + buildWhereClause(filters, values);
      }
      
      if (searchColumns) {
        const searchCondition = buildSearchCondition(search, searchColumns, values);
        console.log("searchCondition>>>>>>>>", searchCondition)
        if (searchCondition) {
           replacement += ' ' + (replacement.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') + searchCondition;
        }
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

      query = query.replace(placeholder, replacement);
   });

   // Add cursor-based pagination
   if (cursor && cursor.value) {
      values.push(cursor.value);
      query +=
         (query.toLowerCase().includes('where') ? ' AND ' : ' WHERE ') +
         `${cursor.column} ${placeholders.find((p) => p.orderBy)?.orderBy?.order === 'asc' ? '>' : '<'} $${values.length}`;
   }

   // Adding sorting
   const orderBy = placeholders.find((p) => p.orderBy)?.orderBy;
   if (orderBy) {
      query += ` ORDER BY ${orderBy.column} ${orderBy.order.toUpperCase()}`;
   }

   // Adding limit
   const limit = process.env.DEFAULT_LIMIT!;
   values.push(limit);
   query += ` LIMIT $${values.length}`;

   let totalCount = 0;
   if (includeTotalCount) {
      // Construct the total count query without cursor and limit
      const totalCountQuery = `SELECT COUNT(*) FROM (${baseQuery}) as subquery`;

      // Execute both queries concurrently
      const [dataRes, countRes] = await Promise.all([
         sql.unsafe<T[]>(query, values),
         sql.unsafe<Count[]>(totalCountQuery, values),
      ]);

      totalCount = parseInt(countRes[0].count.toString(), 10);
      return {
         data: dataRes,
         total: totalCount,
         nextCursor: dataRes.length ? dataRes[orderBy?.order === 'asc' ? 0 : dataRes.length - 1].id : null,
      };
   } else {
      const dataRes = await sql.unsafe<T[]>(query, values);
      return {
         data: dataRes,
         nextCursor: dataRes.length
            ? dataRes[placeholders.find((p) => p.orderBy)?.orderBy?.order === 'asc' ? 0 : dataRes.length - 1].id
            : null,
      };
   }
}; 