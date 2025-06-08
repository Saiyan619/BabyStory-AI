import { useSettingsStore } from "../../store/settingsStore";
import api from "../axiosInstance";

// Get settings (you already had this)
export const getSettings = async () => {
  try {
    const response = await api.get('/parent/settings');
    const setSettings = useSettingsStore.getState().setSettings;
    setSettings(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ✅ Add this: Update settings
export const updateSettings = async (updatedSettings) => {
  try {
    const response = await api.put('/parent/settings', updatedSettings);
    
    // Update Zustand store if needed
    const setSettings = useSettingsStore.getState().setSettings;
    setSettings(response.data);

    console.log('Settings updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update settings:', error.response?.data || error.message);
    throw error;
  }
};
