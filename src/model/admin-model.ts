import sql from "$config/db";

export const getAdminCampus = async (username :string) => {
  const data = await sql`SELECT 
                         DISTINCT c.id,c.campus_name
                         FROM public.user u 
                         INNER JOIN user_campus uc ON u.id = uc.user_lid 
                         INNER JOIN campus c ON uc.campus_lid = c.id
                         WHERE u.username=${username} AND u.active = TRUE AND uc.active = TRUE
                         AND c.active = TRUE `;  
  return data;  
}