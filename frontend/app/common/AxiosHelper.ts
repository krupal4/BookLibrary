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

        axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');

                if (token && token !== "undefined") {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    setTimeout(() => {
                        localStorage.removeItem('authToken');
                        window.location.href = '/login';
                    }, 1000);
                }

                if (error.response?.data) {
                    return Promise.reject(error.response?.data);
                }
                return Promise.reject(error);
            }
        );

        return axiosInstance;
    }

    public static saveJwtToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    public static getJwtToken(): string | null {
        return localStorage.getItem('authToken');
    }
    
    public static eraseJwtToken(): void {
        return localStorage.removeItem('authToken');
    }
}