import { Blog } from "../../utils/types";
import axios from "axios";

// Assuming your backend endpoint is correctly loaded from environment variables
const baseUrl: string = import.meta.env.VITE_BACKEND_ENDPOINT;

const api = axios.create({
    baseURL: baseUrl,
});

export const getBlogsApi = async (): Promise<any> => {
    return await api.get(`/blog`);
};

export const getRecentBlogsApi = async (): Promise<any> => {
    return await api.get(`/blog/recent`);
};

export const getBlogApi = async ({ blogId }: { blogId: string }): Promise<any> => {
    return await api.get(`/blog/${blogId}`);
};

export const addBlogApi = async ({ blog }: { blog: Partial<Blog> }): Promise<any> => {
    return await api.post(`/blog`, blog);
};

export const deleteBlogApi = async ({ blogId }: { blogId: string }): Promise<void> => {
    return await api.delete(`/blog/${blogId}`);
};

export const updateBlogApi = async ({ blogId, updatedBlog }: { blogId: string, updatedBlog: Partial<Blog> }): Promise<void> => {
    // Including Authorization header with Bearer token
    return await api.put(`/blog/${blogId}`, updatedBlog);
};
