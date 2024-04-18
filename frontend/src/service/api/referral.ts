import { Referral } from "../../utils/types";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_BACKEND_ENDPOINT

const api = axios.create({
    baseURL: baseUrl,
});

export const getReferralsApi = async (): Promise<any> => {
    return await api.get(`${baseUrl}/referral`)
}

export const getReferralApi = async ({ referralId }: { referralId: string }) => {
    return await api.get(`${baseUrl}/referral/${referralId}`)
}

export const addReferralApi = async ({ referral }: { referral: Partial<Referral> }): Promise<any> => {
    return await api.post(`${baseUrl}/referral`, referral);
};

export const deleteReferralApi = async ({ referralId }: { referralId: string }): Promise<void> => {
    return await api.delete(`${baseUrl}/referral/${referralId}`)
};

export const updateReferralApi = async ({ referralId, updatedReferral }: { referralId: string, updatedReferral: Partial<Referral> }): Promise<void> => {
    return await api.put(`${baseUrl}/referral/${referralId}`, updatedReferral)
};
