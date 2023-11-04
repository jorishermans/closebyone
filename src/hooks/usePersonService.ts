import { PersonService } from "./services/person.service";
import { Web5Service } from "./services/web5.service";

export async function usePersonService(web5Service: Web5Service) {
    return new PersonService(web5Service)
}