import useStoryStore from "../../store/storyStore";
import api from "../axiosInstance";

export const generateAiStory = async (prompt) => {
    console.log("stil generating.....")
    try {
            console.log("generate this thing na plss.........")
        const response = await api.post("/story/generate", { prompt })
        console.log(response.data)
        return(response.data)
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const getAllGeneratedStories = async () => {
    try {
        const response = await api.get('/story')
        const setPastStories = useStoryStore.getState().setPastStories
        setPastStories(response.data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
        throw error;
        
    }
}

