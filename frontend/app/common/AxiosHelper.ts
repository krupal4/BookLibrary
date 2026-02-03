import axios, { type AxiosInstance } from "axios";

const baseURL = "http://localhost:8080"

export class AxiosHelper {
    public static getAxiousInstance(): AxiosInstance {
       
        const axiosInstance = axios.create({
            baseURL: baseURL,
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

        const responseInterceptor = {
            onFulfilled: (response: any) => response,
            onRejected: (error: any) => {
                return Promise.reject(error);
            }
        }


        axiosInstance.interceptors.request.use(
            requestInterceptor.onFulfilled,
            requestInterceptor.onRejected,
        );

        axiosInstance.interceptors.response.use(
            responseInterceptor.onFulfilled,
            responseInterceptor.onRejected,
        );

        return axiosInstance;
    }
}