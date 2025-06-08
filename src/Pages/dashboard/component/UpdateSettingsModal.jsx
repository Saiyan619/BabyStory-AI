import React, { useState } from "react";
import { updateSettings } from "../../../api/services/settingServices";
import { useUiStore } from "../../../store/UiStore";

const UpdateSettingsModal = () => {
  const loading = useUiStore((state) => state.loading);
  const setLoading = useUiStore((state) => state.setLoading);
  const setMessage = useUiStore((state) => state.setMessage);
  const success = useUiStore((state) => state.success);
  const setSuccess = useUiStore((state) => state.setSuccess);
  const [childAge, setChildAge] = useState("");
  const [storyLength, setStoryLength] = useState("");
  const [voiceInput, setVoiceInput] = useState("");

  const handleUpdateSettings = async () => {
    setLoading(true);

    const payload = {};

    if (storyLength) payload.storyLength = storyLength.toLowerCase();
    if (voiceInput) payload.voiceInput = voiceInput === "Yes";
    if (childAge) payload.childAge = parseInt(childAge);

    try {
      await updateSettings(payload);
      console.log("Settings updated");
      setMessage("Settings Updated🤗");
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
      document.getElementById("my_modal_1").close(); // close modal after success
    } catch (error) {
      console.error("Update failed:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-accent"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Update Settings
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Settings</h3>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Change Age</legend>
              <select
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="select"
              >
                <option disabled value="">
                  Pick Age
                </option>
                {[6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num}>{num}</option>
                ))}
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Change Story Length</legend>
              <select
                value={storyLength}
                onChange={(e) => setStoryLength(e.target.value)}
                className="select"
              >
                <option disabled value="">
                  Pick a Length
                </option>
                <option>Short</option>
                <option>Medium</option>
                <option>Long</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Voice Narration</legend>
              <select
                value={voiceInput}
                onChange={(e) => setVoiceInput(e.target.value)}
                className="select"
              >
                <option disabled value="">
                  Pick Choice
                </option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </fieldset>
          </div>

          <div className="modal-action">
            <button onClick={handleUpdateSettings} className="btn btn-accent">
              {loading ? <span className="loading loading-spinner"></span> : ""}
              Save
            </button>
            <form method="dialog">
              <button className="btn btn-error">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateSettingsModal;
