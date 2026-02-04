import { AxiosHelper } from "./AxiosHelper";
import type { AxiosInstance } from "axios";

export class ApiClient {
    public static instance: ApiClient = new ApiClient();
    private static axios: AxiosInstance = AxiosHelper.getAxiousInstance();

    private constructor() {
    }

    public async get<TResponse>(endpoint: string): Promise<TResponse> {
        const res = await ApiClient.axios.get(endpoint);
        return res.data as TResponse;
    }

    public async post<TResponse>(endpoint: string, data: any): Promise<TResponse> {
        const res = await ApiClient.axios.post(endpoint, data);
        return res.data as TResponse;
    }

    public async delete<TResponse>(endpoint: string, data: any): Promise<TResponse> {
        const res = await ApiClient.axios.delete(endpoint, data);
        return res.data as TResponse;
    }
}