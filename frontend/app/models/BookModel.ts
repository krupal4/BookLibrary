export class BookModel {
    public id: number | null;
    public title: string;
    public description: string;
    public createdAt: string;
    public authorName: string;
    public publishedOn: Date | null;

    constructor() {
        this.id = 0
        this.title = ""
        this.description = ""
        this.createdAt = ""
        this.authorName = ""
        this.publishedOn = null;
    }
}