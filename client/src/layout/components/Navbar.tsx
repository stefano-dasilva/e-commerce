import React, { useState } from "react";
import styles from "../styles/navbar.module.scss";
import { RiUserFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { toggleMenu } from "../../features/ActionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const [items_cart, setItems_cart] = useState<number>(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const toggleHamburger = () => {
    setIsActive(!isActive);
    dispatch(toggleMenu());
  };

  const NavigateToCart = () => {
    navigate("/cart");
  };
  const NavigateToPurchases = () => {
    navigate("/profile");
  };
  const handleCartAPI = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/cart/`, {
        withCredentials: true,
      });

      setItems_cart(response?.data?.info?.cart?.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleCartAPI();
  }, []);
  return (
    <div className={styles.Wrapper}>
      <div
        className={`${styles.Hamburger} ${isActive ? styles.active : ""}`}
        onClick={toggleHamburger}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h3 className={styles.title}>
        {" "}
        Electroni<span style={{ fontSize: "3rem", color: "#55b3ee" }}>X</span>
        press
      </h3>
      <div className={styles.userManagm}>
        <div style={{ position: "relative" }}>
          <FaShoppingCart
            onClick={() => NavigateToCart()}
            style={{ color: "white", fontSize: "1.6rem", cursor: "pointer" }}
          />
          {items_cart > 0 ? (
            <div className={styles.notificCircle}>
              <span style={{ fontSize: "1.5px" }}>{items_cart}</span>
            </div>
          ) : (
            ""
          )}
        </div>

        <RiUserFill
          style={{ color: "white", fontSize: "1.6rem", cursor: "pointer" }}
          onClick={() => NavigateToPurchases()}
        />
      </div>
    </div>
  );
};

export default Navbar;
