export const formatQueryWithValues = (query: string, values: (string | number)[]) => {
    let formattedQuery = query;
 
    values.forEach((value, index) => {
       // Convert value to string and escape single quotes
       const valueStr = typeof value === 'string' ? `'${value.replace(/'/g, "''")}'` : value;
 
       // Replace the placeholder with the value
       formattedQuery = formattedQuery.replace(`$${index + 1}`, valueStr.toString());
    });
 
    console.log('Formatted SQL Query:', formattedQuery);
 };
 