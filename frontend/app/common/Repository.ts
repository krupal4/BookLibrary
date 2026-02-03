import type CategoryModel from "~/models/CategoryModel";
import { ApiClient } from "./ApiClient";
import ApiConstants from "~/constants/ApiConstants";
import type { BookModel } from "~/models/BookModel";
import type { LoginResponse } from "~/models/response/LoginResponse";
import { AxiosHelper } from "./AxiosHelper";

class Repository {
  public static instance: Repository = new Repository();

  private constructor() {}

  public async getBooks(pageIndex: number): Promise<BookModel[]> {
    return await ApiClient.instance.get<BookModel[]>(
        `${ApiConstants.books}?pageIndex=${pageIndex}&pageSize=3`
    );
  }

  public async getCategories(): Promise<CategoryModel[]> {
    return await ApiClient.instance.get<CategoryModel[]>(
      ApiConstants.categories,
    );
  }

  public async saveCategory(cat: CategoryModel): Promise<void> {
    await ApiClient.instance.post<void>(ApiConstants.saveCategory, cat);
  }

  public async login(values: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const res = await ApiClient.instance.post<LoginResponse>(ApiConstants.login, {
      email: values.email,
      password: values.password,
    });

    AxiosHelper.saveJwtToken(res.token);
    return res;
  }

  public async signUp(values: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const res = await ApiClient.instance.post<LoginResponse>(ApiConstants.signup, {
      email: values.email,
      password: values.password,
    });

    AxiosHelper.saveJwtToken(res.token);
    return res;
  }

  public async saveBook( bookModel: BookModel): Promise<BookModel> {
    return await ApiClient.instance.post(ApiConstants.saveBook, bookModel);
  }
}

export { Repository };
