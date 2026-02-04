import type CategoryModel from "./CategoryModel";

export class BookModel {
    public id: number | null;
    public title: string;
    public description: string;
    public createdAt: Date | null;
    public authorName: string;
    public publishedOn: Date | null;
    public categories: CategoryModel[];

    constructor() {
        this.id = 0;
        this.title = "";
        this.description = "";
        this.createdAt = null;
        this.authorName = "";
        this.publishedOn = null;
        this.categories = [];
    }
}