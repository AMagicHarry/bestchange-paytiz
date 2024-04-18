import { Review } from "../../components/ReviewersCard/ReviewersCard";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_BACKEND_ENDPOINT

const api = axios.create({
    baseURL: baseUrl,
});

export const getReviewsApi = async (): Promise<any> => {
    return await api.get(`${baseUrl}/review`)
}

export const getReviewApi = async ({ reviewId }: { reviewId: string }) => {
    return await api.get(`${baseUrl}/review/${reviewId}`)
}

export const addReviewApi = async ({ review }: { review: Partial<Review> }): Promise<any> => {
    return await api.post(`${baseUrl}/review`, review);
};

export const deleteReviewApi = async ({ reviewId }: { reviewId: string }): Promise<void> => {
    return await api.delete(`${baseUrl}/review/${reviewId}`)
};

export const updateReviewApi = async ({ reviewId, updatedReview }: { reviewId: string, updatedReview: Partial<Review> }): Promise<void> => {
    return await api.put(`${baseUrl}/review/${reviewId}`, updatedReview)
};
