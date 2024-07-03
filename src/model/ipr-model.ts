import { IPRDetails } from "types/research.types"
import sql from '$config/db';


export const insertIPRModel = async (iprDetails: IPRDetails) => {
    const data = await sql`SELECT * FROM insert_ipr(${JSON.parse(JSON.stringify(iprDetails))}, '1');`;
    return data;
}

export const updateIPRModel = async (updateIprDetails: IPRDetails) => {
    const data = await sql`SELECT * FROM upsert_ipr(${JSON.parse(JSON.stringify(updateIprDetails))}, '1');`;
    return data;
}

export const deleteIPRModel = async (iprId: number) => {
    const data = await sql`UPDATE ipr SET active = false,modified_date=now(),modified_by='1' WHERE id = ${iprId}`;
    return data;
}



