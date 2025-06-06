import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../api/services/authService";
import Navbar from "../../globalcomponents/Navbar";
import { useUiStore } from "../../store/UiStore";
import AlertSucces from "../../globalcomponents/AlertSucces";
import AlertError from "../../globalcomponents/AlertError";

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const message = useUiStore((state) => state.message);
  const setMessage = (state) => state.setMessage;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, newPassword);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {success ? <AlertSucces message={message} /> : ""}
      {error ? <AlertError /> : ""}
      <Navbar />
      <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
      <form
        className="flex items-center justify-center flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <input
          className="input"
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
}
