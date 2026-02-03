import { AxiosHelper } from "./AxiosHelper";
import axios, { type AxiosInstance } from "axios";

export class ApiClient {
    public static instance: ApiClient = new ApiClient();
    private static axios: AxiosInstance = AxiosHelper.getAxiousInstance();

    private constructor() {
    }

    public async get<TResponse>(endpoint: string): Promise<TResponse> {
        const res = await ApiClient.axios.get(endpoint);
        console.log("get res: ", res)
        return res as TResponse;
    }

    public async post<TResponse>(endpoint: string, data: any): Promise<TResponse> {
        const res = await ApiClient.axios.post(endpoint, data);
        console.log("post res: ", res)
        return res as TResponse;
    }
}