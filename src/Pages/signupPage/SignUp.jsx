import React, { useState } from "react";
import Navbar from "../../globalcomponents/Navbar";
import { authService, signUp } from "../../api/services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useUiStore } from "../../store/UiStore";
import AlertError from "../../globalcomponents/AlertError";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useUiStore((state) => state.loading);
  const setLoading = useUiStore((state) => state.setLoading);
  const error = useUiStore((state) => state.error);
  const setError = useUiStore((state) => state.setError);
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSignUp = async () => {
    setLoading(true);
    const credentials = { email, password };
    try {
      await signUp(credentials);
      setLoading(false);
      navigate("/verifyemail");
    } catch (error) {
      console.error("login failed:", error);
      setLoading(false);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Starting Google login");
    setLoading(true);
    authService.googleAuth();
  };

  return (
    <div>
      {error ? <AlertError /> : ""}
      <Navbar />

      <div className="p-4">
        <div>
          <h2 className="text-2xl sm:text-3xl text-center font-semibold">
            SignUp to BabyStory AI
          </h2>
        </div>

        <div className="flex gap-5 sm:gap-0 items-center sm:items-center justify-between sm:justify-around flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 sm:mt-10">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                value={email}
                onChange={handleEmailChange}
                type="text"
                className="input w-full sm:w-3/4"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                value={password}
                onChange={handlePasswordChange}
                type="text"
                className="input w-full sm:w-3/4"
                placeholder="Type here"
              />
            </fieldset>

            <button
              onClick={handleSignUp}
              className="btn btn-primary mt-5 w-full sm:w-3/4"
            >
              <span
                className={
                  loading ? `loading loading-spinner` : ` loading-spinner`
                }
              ></span>
              Signup
            </button>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-primary mt-5 w-full sm:w-3/4"
            >
              Signup with google
            </button>
            <div>
              <span className="text-sm">Already have an account?</span>
              <Link className="underline text-sm" to="/login">
                Click Here
              </Link>
            </div>
          </div>

          <div className="w-full sm:w-1/3 sm:mt-20">
            <img src="./0b788b1bfa4efe1729674722ddc883cb.png" alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
