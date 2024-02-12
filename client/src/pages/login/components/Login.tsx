import React, { useState } from "react";
import styles from "../styles/login.module.scss";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import axios from "axios";

interface InputValues {
  username: string;
  password: string;
}

const Login = () => {
  const [inputValues, setInputValues] = useState<InputValues>({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<String>("")
    const navigate = useNavigate();


  const handleInputValues = (field: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const LoginAPI = async (event: React.FormEvent) => {
    event?.preventDefault();

    
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username: inputValues.username,
        password: inputValues.password,
      });
      window.localStorage.setItem("username", response.data.username);
      navigate("/home")
    } catch (err : any) {
      setErrorMessage(err.response.data.message);
    }
  };
  

  return (
    <div className={styles.mainWrapper}>
      <form action="POST" className={styles.formPosition} onSubmit={LoginAPI}>
        <h2 className={styles.title}>
          Electroni<span style={{ fontSize: "3rem", color: "#55b3ee" }}>X</span>
          press
        </h2>
        <div className={styles.inputsWrapper}>
          <div className={styles.usernameWrapper}>
            <FaUser style={{ color: "#3B99CD" }} />
            <label htmlFor="user">
              <input
                type="text"
                id="user"
                name="user"
                value={inputValues.username}
                placeholder="Username"
                onChange={(e) => handleInputValues("username", e.target.value)}
              />
            </label>
          </div>
          <div className={styles.passwordWrapper}>
            <FaLock style={{ color: "#3B99CD" }} />
            <label htmlFor="pass">
              <input
                type="password"
                id="pass"
                name="pass"
                placeholder="Password"
                value={inputValues.password}
                onChange={(e) => handleInputValues("password", e.target.value)}
              />
            </label>
          </div>
        </div>
        <h5 className={styles.ErrorMessage}>{errorMessage}</h5>
        <div className={styles.redirectionWrapper}>
          <button className={styles.submitButton} type="submit">
            LOGIN
          </button>
          <h5 style={{ color: "#7C8A94" }}>
            Non hai ancora un'account?{" "}
            <Link to="/register">
              <span style={{ color: "#4c68d7" }}>&nbsp;&nbsp; Iscriviti!</span>
            </Link>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default Login;
