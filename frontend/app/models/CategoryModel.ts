class CategoryModel {
  id: number | undefined;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export default CategoryModel;
