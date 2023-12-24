import { GeoMessageService } from "./services/geo-message.service";
import { Web5Service } from "./services/web5.service";

export async function useGeoMessageService(web5Service: Web5Service) {
    return new GeoMessageService(web5Service)
}