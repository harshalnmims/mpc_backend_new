import { IPRDetails } from "types/research.types"
import sql from '$config/db';


export const insertIPRModel = async (iprDetails: IPRDetails) => {
    const data = await sql`SELECT * FROM insert_journal_article(${JSON.parse(JSON.stringify(iprDetails))}, '1');`;
    return data;
}



