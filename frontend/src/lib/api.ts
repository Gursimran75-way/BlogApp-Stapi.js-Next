import axios, { AxiosInstance } from 'axios';
import { Blog, Comment, Like } from '@/lib/types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || "4c3acddcfb5d020771cc89ef6a085c651e6eaf6ed1ed050ca88cfa75c82ee0b0718afa42b563660b0f039a7df322abcaf5a24bf3e1d26c1d44898f30e7955e965797b58e69026ad9f8fcd7b28541f386401341f6bbe5195cc3e0f84420e835b40be10e1f459e665b2d7f8c436956e108eb5941a56b745ba5e74e037bc9af5552";

if (!STRAPI_URL || !API_TOKEN) {
    throw new Error('Missing STRAPI_URL or STRAPI_API_TOKEN in environment variables');
}

const createApiInstance = (token?: string): AxiosInstance =>
    axios.create({
        baseURL: `${STRAPI_URL}/api`,
        headers: {
            Authorization: token ? `Bearer ${token}` : `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
    });

export const fetchBlogs = async (): Promise<Blog[]> => {
    try {
        const api = createApiInstance();
        const res = await api.get('/blogs?filters[blogStatus][$eq]=Approved&populate[user][fields][0]=username');
        console.log('fetchBlogs FULL response:', JSON.stringify(res.data, null, 2));
        const blogs = res.data.data || [];
        console.log('fetchBlogs processed blogs:', JSON.stringify(blogs, null, 2));
        return blogs;
    } catch (error: any) {
        console.error('Error fetching blogs:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        return [];
    }
};


export const fetchBlogBySlug = async (slug: string): Promise<Blog | undefined> => {
    try {
        console.log("hello")
        const api = createApiInstance();
        const res = await api.get(
            `/blogs?filters[slug][$eq]=${slug}`
        );
        console.log('fetchBlogBySlug response:', JSON.stringify(res.data, null, 2));
        return res.data.data[0];
    } catch (error: any) {
        console.error(`Error fetching blog with slug ${slug}:`, error.message, error.response?.data);
        return undefined;
    }
};
// ... (rest of the file unchanged: fetchComments, fetchLikes, postComment, postLike)
export const fetchComments = async (blogId: number): Promise<Comment[]> => {
    try {
        const api = createApiInstance();
        const res = await api.get(`/comments?filters[blog][id][$eq]=${blogId}&filters[commentStatus][$eq]=Approved`);
        console.log('fetchComments response:', res.data);
        return res.data.data || [];
    } catch (error: any) {
        console.error(`Error fetching comments for blog ${blogId}:`, error.message, error.response?.data);
        return [];
    }
};

export const fetchLikes = async (blogId: number): Promise<number> => {
    try {
        const api = createApiInstance();
        const res = await api.get(`/likes?filters[blog][id][$eq]=${blogId}`);
        console.log('fetchLikes response:', res.data);
        return res.data.data.length || 0;
    } catch (error: any) {
        console.error(`Error fetching likes for blog ${blogId}:`, error.message, error.response?.data);
        return 0;
    }
};

export const postComment = async (data: any & { blog: number }, token?: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.post('/comments', { data });
        console.log('postComment response:', res.data);
        return res;
    } catch (error: any) {
        console.error('Error posting comment:', error.message, error.response?.data);
        throw error;
    }
};

export const postLike = async (data: { blog: number; author: string }, token?: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.post('/likes', { data });
        console.log('postLike response:', res.data);
        return res;
    } catch (error: any) {
        console.error('Error posting like:', error.message, error.response?.data);
        throw error;
    }
};
// Delete a comment (client-side, requires token)
export const deleteComment = async (id: number, token: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.delete(`/comments/${id}`);
        console.log('deleteComment response:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error deleting comment:', error.message, error.response?.data);
        throw error;
    }
};

// Delete a blog (client-side, requires token)
export const deleteBlog = async (id: number, token: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.delete(`/blogs/${id}`);
        console.log('deleteBlog response:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error deleting blog:', error.message, error.response?.data);
        throw error;
    }
};

// Update a blog (client-side, requires token)
export const updateBlog = async (id: number, data: { title?: string; content?: string; slug?: string }, token: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.put(`/blogs/${id}`, { data });
        console.log('updateBlog response:', res.data);
        return res.data;
    } catch (error: any) {
        console.error('Error updating blog:', error.message, error.response?.data);
        throw error;
    }
};

// Create a blog (client-side, requires token)
// api.ts (snippet)
export const createBlog = async (data: { title: string; content: string; slug: string; user: number; category?: string }, token: string) => {
    try {
        const api = createApiInstance(token);
        const res = await api.post('/blogs', {
            data: {
                title: data.title,
                content: data.content,
                slug: data.slug,
                blogStatus: 'Pending',
                user: { id: data.user },
                category: data.category, // New field
            },
        });
        console.log('createBlog response:', JSON.stringify(res.data, null, 2));
        return res.data;
    } catch (error: any) {
        console.error('Error creating blog:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
};
// Fetch user's blogs (client-side, requires token)
export const fetchUserBlogs = async (userId: number, token: string): Promise<Blog[]> => {
    try {
        const api = createApiInstance(token);
        const res = await api.get(`/blogs?filters[user][id][$eq]=${userId}&populate[user][fields][0]=username`);
        console.log('fetchUserBlogs response:', JSON.stringify(res.data, null, 2));
        return res.data.data || [];
    } catch (error: any) {
        console.error('Error fetching user blogs:', error.message, error.response?.data);
        return [];
    }
};
