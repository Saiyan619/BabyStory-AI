import useStoryStore from "../../store/storyStore";
import api from "../axiosInstance";

// Generate User Story - Core Feature/Function of this App
export const generateAiStory = async (prompt) => {
  try {
    const response = await api.post("/api/story/generate", { prompt });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get All generated Stories
export const getAllGeneratedStories = async () => {
  try {
    const response = await api.get("/api/story");
    const setPastStories = useStoryStore.getState().setPastStories;
    setPastStories(response.data);
  } catch (error) {
    throw error;
  }
};

// get Single Story
export const getStoryById = async (id) => {
  try {
    const res = await api.get(`/api/story/${id}`);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
