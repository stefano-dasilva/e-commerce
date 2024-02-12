import React, { useEffect, useState } from "react";
import styles from "../styles/register.module.scss";
import { FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface InputValues {
  username: string;
  password: string;
  password2: string;
}
const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [inputValues, setInputValues] = useState<InputValues>({
    username: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();

  const handleInputValues = (field: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (inputValues.password !== "" && inputValues.password2 !== "") {
      if (inputValues.password !== inputValues.password2) {
        setErrorMessage("password don't match");
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("");
    }
  }, [inputValues.password, inputValues.password2]);

  const RegisterAPI = async (event: React.FormEvent) => {
    event?.preventDefault();

    if (handle_regex()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/register",
          {
            username: inputValues.username,
            password: inputValues.password,
          }
        );
        window.localStorage.setItem("username", response.data.username);
        navigate("/home");
      } catch (err: any) {
        setErrorMessage(err.response.data.message);
      }
    }
  };

  const handle_regex = () => {
    if (inputValues.username.length < 4) {
      setErrorMessage("Username must have at least 4 letters");
      return false;
    }
    if (inputValues.password.length < 5) {
      setErrorMessage("Password must have at least 6 letters");
      return false;
    }

    if (inputValues.password !== inputValues.password2) {
      setErrorMessage("Passwords don't match");
      return false;
    }

    return true;
  };

  return (
    <div className={styles.mainWrapper}>
      <form
        action="POST"
        className={styles.formPosition}
        onSubmit={RegisterAPI}
      >
        <h2 className={styles.title}>
          {" "}
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
          <div className={styles.password2Wrapper}>
            <FaLock style={{ color: "#3B99CD" }} />
            <label htmlFor="pass2">
              <input
                type="password"
                id="pass2"
                name="pass2"
                placeholder="Repeat Password"
                value={inputValues.password2}
                onChange={(e) => handleInputValues("password2", e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className={styles.redirectionWrapper}>
          <div className={styles.ErrorMessage}>
            <span>{errorMessage}</span>
          </div>
          <button className={styles.submitButton} type="submit">
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
