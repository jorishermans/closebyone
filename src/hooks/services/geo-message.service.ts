import { Message, WithContext } from "schema-dts";
import { Web5Service } from "./web5.service";

export class GeoMessageService {
    public message: WithContext<Message>;
    public context = 'https://schema.org';
    public type = 'Message';

    private data: any;

    constructor(public web5service: Web5Service) {
        this.message = {
            '@context': 'https://schema.org',
            '@type': 'Message',
            name: '',
            sender: {
                "@type": "Person",
                name: "Dom Portwood"
            },
            datePublished: "2016-02-29",
            text: "",
            locationCreated: ""
        }
    }

    public async fetch() {
        const result = await this.web5service.fetch(`${this.context}/${this.type}`)
        if (result && result.length > 0) {
            this.message = await result[0].data.json() as WithContext<Message>;
            this.data = result[0];
        }
        return this.message;
    }

    public async update(p: WithContext<Message>) {
        this.message = p;
        if (this.data) {
            // update
            await this.data.update({ data: this.message});
        }
        this.data = await this.web5service.create(this.message, `${this.context}/${this.type}`);
    }

}