import { Exchanger } from "../../utils/types";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_BACKEND_ENDPOINT

const api = axios.create({
    baseURL: baseUrl,
});

export const getExchangersApi = async (): Promise<any> => {
    return await api.get(`${baseUrl}/exchanger`)
}

export const getExchangerApi = async ({ exchangerId }: { exchangerId: string }) => {
    return await api.get(`${baseUrl}/exchanger/${exchangerId}`)
}

export const addExchangerApi = async ({ exchanger }: { exchanger: Partial<Exchanger> }): Promise<any> => {
    return await api.post(`${baseUrl}/exchanger`, exchanger);
};

export const deleteExchangerApi = async ({ exchangerId }: { exchangerId: string }): Promise<void> => {
    return await api.delete(`${baseUrl}/exchanger/${exchangerId}`)
};

export const updateExchangerApi = async ({ exchangerId, updatedExchanger }: { exchangerId: string, updatedExchanger: Partial<Exchanger> }): Promise<void> => {
    return await api.put(`${baseUrl}/exchanger/${exchangerId}`, updatedExchanger)
};
