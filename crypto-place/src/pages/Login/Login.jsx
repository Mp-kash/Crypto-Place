import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const forgotRef = useRef();

  const userAuth = async (e) => {
    e.preventDefault();

    const trimName = name.trim();
    const trimEmail = email.trim();
    const trimPassword = password.trim();

    if (action === "Sign Up" && (!trimName || !trimEmail || !trimPassword)) {
      toast.error("Please fill in all the fields to sign up.");
      return;
    }

    if (action === "Login" && (!trimEmail || !trimPassword)) {
      toast.error("Please enter both email and password to log in.");
      return;
    }

    try {
      setLoading(true);
      if (action === "Login") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (action === "Login") setName("");

    const el = forgotRef.current;
    if (action === "Login") {
      el.style.maxHeight = el.scrollHeight + "px";
    } else {
      el.style.maxHeight = "0px";
    }
  }, [action]);

  return loading ? (
    <div className="spinner">
      <div className="spin"></div>
    </div>
  ) : (
    <form onSubmit={userAuth}>
      <img src={logo} alt="" />
      <div className="login">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div
            className={`transition-container ${
              action === "Login" ? "hide" : "show"
            }`}
          >
            <div className="input">
              <i className="fa-solid fa-user"></i>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Name"
              />
            </div>
          </div>

          <div className="input">
            <i className="fa-solid fa-envelope"></i>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="input">
            <i className="fa-solid fa-lock"></i>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="display" ref={forgotRef}>
          <div className="forgot-password">
            Lost Password? <span>Click Here!</span>
          </div>
        </div>
        <div className="submit-container">
          <button
            type="button"
            onClick={() => {
              setAction(action === "Login" ? "Sign Up" : "Login");
            }}
            className="gray"
          >
            {action === "Login" ? "Switch to Signup" : "Switch to Login"}
          </button>
          <button type="submit" className="submit">
            {action}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
