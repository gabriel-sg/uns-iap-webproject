export class Photo {
    id?: number; //? porque es opcional. Viene del back-end
    publi_id?: number;
    filename: string;
    created_at: string;
    updated_at: string;
    constructor() {
        this.id = 0;
        this.publi_id = 0;
        this.filename = '';
        this.created_at = '';
        this.updated_at = '';
    }

}
