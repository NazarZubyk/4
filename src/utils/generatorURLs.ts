import { port } from "src/main";


export async function generateURLforGETsByID(resource:string, id:number) {
    return `http://localhost:${port}/${resource}/${id}`;
}
