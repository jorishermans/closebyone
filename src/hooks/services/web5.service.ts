import { Thing, WithContext } from "schema-dts";
import { Web5 } from "@web5/api";

export class Web5Service {
    
    constructor(public web5: Web5, 
        public did: string) {}

    public async create(d: WithContext<Thing>, schema?: string) {
        if (this.web5) {
            const { record } = await this.web5.dwn.records.create({
                data    : d,
                message : {
                  schema     : `${schema}`,
                  dataFormat : 'application/json'
                }
            });
            return record;
        }
    }

    public async fetch(schema: string, extrafilter: {} = {}) {
        if (this.web5) {
            const { records } = await this.web5.dwn.records.query({
                ... extrafilter,
                message: {
                  filter: {
                    schema: schema,    
                  }
                }
              });
            return records;
        }
    }
}