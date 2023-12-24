import { Message, Person, WithContext } from "schema-dts";
import { Web5Service } from "./web5.service";

export class GeoMessageService {
    public messages: WithContext<Message>[] = [];
    public context = 'https://schema.org';
    public type = 'Message';


    constructor(public web5service: Web5Service) {
        this.messages = [];
    }

    public createGeoMessage(locationId: string, text: string,
        person: any): WithContext<Message> {
        return {
            '@context': 'https://schema.org',
            '@type': 'Message',
            sender: {
                "@type": "Person",
                ... person
            },
            datePublished: new Date().toISOString(),
            text: text,
            locationCreated: locationId
        };
    }

    public async fetch(locationHash: string) {
        const result = await this.web5service
                        .fetch(`${this.context}/${this.type}`, 
                        { data: { locationCreated: locationHash } })
        if (result && result.length > 0) {
            const messages: WithContext<Message>[] = []
            for (let record of result) {
                const message = await record.data.json() as WithContext<Message>;
                messages.push(message);
            }
            this.messages = messages;
        }
        return this.messages;
    }

    public async create(message: WithContext<Message>) {
        const data = await this.web5service.create(message, `${this.context}/${this.type}`);
        const returned_message = await data?.data.json();
        this.messages.push(returned_message);
        return this.messages;
    }

}