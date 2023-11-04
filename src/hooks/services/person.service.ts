import { Person, WithContext } from "schema-dts";
import { Web5Service } from "./web5.service";

export class PersonService {
    public person: WithContext<Person>;
    public context = 'https://schema.org';
    public type = 'Person';

    private data: any;

    constructor(public web5service: Web5Service) {
        this.person = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: '',
            familyName: '',
            address: {
                '@type': 'PostalAddress',
                streetAddress: '',
                postalCode: '',
                addressCountry: '',
            },
            telephone: '',
            knowsLanguage: ''
        }
    }

    public async fetch() {
        const result = await this.web5service.fetch(`${this.context}/${this.type}`)
        if (result && result.length > 0) {
            this.person = await result[0].data.json() as WithContext<Person>;
            this.data = result[0];
        }
        return this.person;
    }

    public async update(p: WithContext<Person>) {
        this.person = p;
        if (this.data) {
            // update
            await this.data.update({ data: this.person});
        }
        this.data = await this.web5service.create(this.person, `${this.context}/${this.type}`);
    }

}