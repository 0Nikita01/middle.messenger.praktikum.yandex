import HTTPTransport from "../utils/httpTransport";

export default class BaseAPI {
    protected http: HTTPTransport;

    constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }

    public create(): Promise<unknown> { throw new Error('Create Not implemented'); }

    public read(): Promise<unknown> { throw new Error('Request Not implemented'); }

    public update(): Promise<unknown> { throw new Error('Update Not implemented'); }

    public delete(): Promise<unknown> { throw new Error('Delete Not implemented'); }
}
