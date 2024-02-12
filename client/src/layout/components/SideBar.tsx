import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/sidebar.module.scss";
import {  useAppSelector } from "../../app/hooks";
import Categories from "./Categories";
import MyProfile from "./MyProfile";

axios.defaults.withCredentials = true;

const SideBar = () => {
  interface categories {
    id: number;
    name: string;
  }

  const isMenuToggle = useAppSelector(
    (state) => state.action_slice.isSideBarOpen
  );
  const [categories, setCategories] = useState<categories[]>([]);

  const handleCategoriesAPI = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/categories/get/`,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      setCategories(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleCategoriesAPI();
  }, []);

  return (
    <aside
      className={`${styles.Wrapper} ${
        isMenuToggle ? styles.open : ""
      }`}
    >
      <div className={styles.ContentContainer}>
        <Categories />
        <MyProfile/>
      </div>
    </aside>
  );
};

export default SideBar;
