import { port } from "./constant";


export async function generateURLforGETsByID(resource: string, id: number) {
  return `http://localhost:${port}/${resource}/${id}`;
}
