import { useSettingsStore } from "../../store/settingsStore";
import api from "../axiosInstance";

// Get settings
export const getSettings = async () => {
  try {
    const response = await api.get("api/parent/settings");
    const setSettings = useSettingsStore.getState().setSettings;
    setSettings(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Update settings
export const updateSettings = async (updatedSettings) => {
  try {
    const response = await api.put("api/parent/settings", updatedSettings);

    // Update Zustand store
    const setSettings = useSettingsStore.getState().setSettings;
    setSettings(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update settings:",
      error.response?.data || error.message
    );
    throw error;
  }
};
