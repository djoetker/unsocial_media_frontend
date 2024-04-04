import axios from "axios";

const axios_base_url = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createNewPost = async (data) => {
    const response = await axios_base_url.post("/post/new", data);
    return response.data;
};

export const createNewComment = async (postId, data) => {
  const response = await axios_base_url.post(`/post/new/comment/${postId}`, data);
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await axios_base_url.get(`/post/get/${postId}`);
  return response.data;
};

export const getRandomPosts = async (previousPostsIds) => {
  const response = await axios_base_url.get("/post/random", previousPostsIds);
  return response.data;
};



