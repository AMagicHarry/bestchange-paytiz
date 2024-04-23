import { User } from "../../utils/types";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_BACKEND_ENDPOINT

const api = axios.create({
    baseURL: baseUrl,
});

export const getUsersApi = async (): Promise<any> => {
    return await api.get(`/user`)
}

export const getUserApi = async ({ userId }: { userId: string }) => {
    return await api.get(`/user/${userId}`)
}

export const addUserApi = async ({ user }: { user: Partial<User> }): Promise<any> => {
    return await api.post(`/user`, user);
};

export const deleteUserApi = async ({ userId }: { userId: string }): Promise<void> => {
    return await api.delete(`/user/${userId}`)
};

export const updateUserApi = async ({ userId, updatedUser }: { userId: string, updatedUser: Partial<User> }): Promise<void> => {
    return await api.put(`/user/${userId}`, updatedUser)
};
