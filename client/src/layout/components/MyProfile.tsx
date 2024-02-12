import React from "react";
import styles from "../styles/myprofile.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import { RiUserFill } from "react-icons/ri";
import { FaFireFlameCurved } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const MyProfile = () => {
  const navigate = useNavigate();

  const NavigateToCart = () => {
    navigate("/cart");
  };
  const NavigateToPurchases = () => {
    navigate("/profile");
  };
  const NavigateToHottest = () => {
    navigate("/home");
  };

  const Logout = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (err: any) {}
  };
  return (
    <div className={styles.Wrapper}>
      <h4 style={{ color: "white", textAlign: "left", marginTop: "1rem" }}>
        Others
      </h4>
      <div className={styles.OthersWrapper} onClick={() => NavigateToCart()}>
        <FaShoppingCart style={{ fontSize: "1.6rem" }} />
        <span className={styles.CategoryName}>Cart</span>
      </div>
      <div
        className={styles.OthersWrapper}
        onClick={() => NavigateToPurchases()}
      >
        <RiUserFill style={{ fontSize: "1.6rem" }} />
        <span className={styles.CategoryName}>Purchases</span>
      </div>
      <div className={styles.OthersWrapper} onClick={() => NavigateToHottest()}>
        <FaFireFlameCurved style={{ fontSize: "1.6rem" }} />
        <span className={styles.CategoryName}>Hottest</span>
      </div>
      <div
        className={styles.OthersWrapper}
        style={{ marginBottom: "1rem" }}
        onClick={() => Logout()}
      >
        <MdLogout style={{ fontSize: "1.6rem" }} />
        <span className={styles.CategoryName}>Logout</span>
      </div>
    </div>
  );
};

export default MyProfile;
