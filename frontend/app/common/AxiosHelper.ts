import axios, { type AxiosInstance } from "axios";
import ApiConstants from "~/constants/ApiConstants";

export class AxiosHelper {
    public static getAxiousInstance(): AxiosInstance {
       
        const axiosInstance = axios.create({
            baseURL: ApiConstants.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const requestInterceptor = {
            onFulfilled: (config: any) => {
                const token = localStorage.getItem('authToken');

                if (token && token !== "undefined") {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                console.log("config: ", config)

                return config;
            },
            onRejected: (error: any) => {
                console.log("error: ", error)
                return Promise.reject(error);
            }
        }

        axiosInstance.interceptors.request.use(
            requestInterceptor.onFulfilled,
            requestInterceptor.onRejected,
        );

        return axiosInstance;
    }

    public static saveJwtToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    public static getJwtToken(): string | null {
        return localStorage.getItem('authToken');
    }
}