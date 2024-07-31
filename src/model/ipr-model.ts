import { IPRDetails } from "types/research.types"
import sql from '$config/db';


export const insertIPRModel = async (iprDetails: IPRDetails,username:string) => {
    const data = await sql`SELECT * FROM insert_ipr(${JSON.parse(JSON.stringify(iprDetails))}, ${username});`;
    return data;
}

export const updateIPRModel = async (updateIprDetails: IPRDetails,username:string) => {
    const data = await sql`SELECT * FROM upsert_ipr(${JSON.parse(JSON.stringify(updateIprDetails))}, ${username});`;
    return data;
}

export const deleteIPRModel = async (iprId: number,username:string) => {
    const data = await sql`UPDATE ipr SET active = false,modified_date=now(),modified_by=${username} WHERE id = ${iprId}`;
    return data;
}



