import { Web5 } from "@web5/api";
import { Web5Service } from "./services/web5.service";

let web5: Web5, did: string;
export async function useWeb5Service() {
    if (!web5) {
        const result = await Web5.connect();
        web5 = result.web5;
        did = result.did;
    }
    const service = new Web5Service(web5, did)
    return { web5, did, service};
}