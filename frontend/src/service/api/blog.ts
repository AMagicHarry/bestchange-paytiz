import { Blog } from "../../utils/types";
import axios from "axios";

const baseUrl: string = import.meta.env.VITE_BACKEND_ENDPOINT

const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});


export const getBlogsApi = async (): Promise<any> => {
    return await api.get(`${baseUrl}/blog`,)
}

export const getBlogApi = async ({ blogId }: { blogId: string}) => {
    return await api.get(`${baseUrl}/blog/${blogId}`)
}


export const addBlogApi = async ({ blog}: { blog: Partial<Blog>,}): Promise<any> => {
    return await api.post(`${baseUrl}/blog`, blog);
};


export const deleteBlogApi = async ({ blogId}: { blogId: string}): Promise<void> => {
    return await api.delete(`${baseUrl}/blog/${blogId}`)
};

export const updateBlogApi = async ({ blogId, updatedBlog }: { blogId: string, updatedBlog: Partial<Blog>, token: string }): Promise<void> => {
    return await api.put(`${baseUrl}/blog/${blogId}`, updatedBlog)
};
