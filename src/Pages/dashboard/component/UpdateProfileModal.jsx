import React, { useState } from "react";
import { updateMe } from "../../../api/services/authService";
import { useUiStore } from "../../../store/UiStore";
const UpdateProfileModal = () => {
  const loading = useUiStore((state) => state.loading);
  const setLoading = useUiStore((state) => state.setLoading);
  const setMessage = useUiStore((state) => state.setMessage);
  const success = useUiStore((state) => state.success);
  const setSuccess = useUiStore((state) => state.setSuccess);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateMyProfile = async () => {
    setLoading(true);
    let data = {
      name,
      email,
    };
    console.log(data);
    try {
      await updateMe(data);
      setMessage("Profile Updated🤗");
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);

      setName("");
      setEmail("");
      document.getElementById("my_modal_1").close(); // close modal after success
    } catch (error) {
      setSuccess(false);
      console.log(error);
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
        Update Profile
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Profile</h3>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="input"
                placeholder="Type here"
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <div className="modal-action">
            <button onClick={updateMyProfile} className="btn mr-2 btn-accent">
              {loading ? <span className="loading loading-spinner"></span> : ""}
              Update
            </button>

            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateProfileModal;
