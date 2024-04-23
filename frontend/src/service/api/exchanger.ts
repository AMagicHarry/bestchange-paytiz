import { Exchanger } from "../../utils/types";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_BACKEND_ENDPOINT;

const api = axios.create({
    baseURL: baseUrl, 
});

export const getExchangersApi = async (): Promise<any> => {
    return await api.get(`/exchanger`); 
}

export const getExchangerApi = async ({ exchangerId }: { exchangerId: string }) => {
    return await api.get(`/exchanger/${exchangerId}`);
}

export const getUserExchangerApi = async ({ userName }: { userName: string }) => {
    return await api.get(`/exchanger/user/${userName}`);
}

export const addExchangerApi = async ({ exchanger }: { exchanger: Partial<Exchanger> }): Promise<any> => {
    return await api.post(`/exchanger`, exchanger);
};

export const deleteExchangerApi = async ({ exchangerId }: { exchangerId: string }): Promise<void> => {
    return await api.delete(`/exchanger/${exchangerId}`);
};

export const updateExchangerApi = async ({ exchangerId, updatedExchanger }: { exchangerId: string, updatedExchanger: Partial<Exchanger> }): Promise<void> => {
    return await api.put(`/exchanger/${exchangerId}`, updatedExchanger);
};

// Add new API function for getting exchange statistics
export const getExchangeStatApi = async (): Promise<any> => {
    return await api.get(`exchanger/stats`)
};
