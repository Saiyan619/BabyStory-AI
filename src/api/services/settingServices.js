import { useSettingsStore } from "../../store/settingsStore";
import api from "../axiosInstance";


export const getSettings = async () => {
    try {
        const response = await api.get('/parent/settings')
        const setSettings = useSettingsStore.getState().setSettings;
        setSettings(response.data)
       console.log(response.data) 
    } catch (error) {
        console.log(error)
        throw error;
    }
}