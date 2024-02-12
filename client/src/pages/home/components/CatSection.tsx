import React, { useEffect, useState } from "react";
import styles from "../styles/catsection.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";
import { FaComputer } from "react-icons/fa6";
import { IoTabletLandscapeSharp } from "react-icons/io5";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoIosMusicalNotes } from "react-icons/io";
import { CgSmartHomeHeat } from "react-icons/cg";

axios.defaults.withCredentials = true;

const CatSection = () => {
  interface categories {
    _id: number;
    name: string;
  }

  interface mapcategories {
    [key: string]: React.ReactElement;
  }

  const MapCategories: mapcategories = {
    Mobile: <IoPhonePortraitOutline className={styles.Figure} />,
    Home: <MdHome className={styles.Figure} />,
    Wearables: <BsSmartwatch className={styles.Figure} />,
    Computer: <FaComputer className={styles.Figure} />,
    Tablet: <IoTabletLandscapeSharp className={styles.Figure} />,
    TV: <PiTelevisionSimpleBold className={styles.Figure} />,
    Audio: <IoIosMusicalNotes className={styles.Figure} />,
    Smarthome: <CgSmartHomeHeat className={styles.Figure} />,
  };

  const [categories, setCategories] = useState<categories[]>([]);
  const navigate = useNavigate();

  const navigateToProducts = (category_ID: number) => {
    navigate("/products", { state: category_ID });
  };

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
    <div className={styles.Wrapper}>
      <div className={styles.CatWrapper}>
        {categories?.map((category) => {
          return (
            <div
              className={styles.CategoryWrapper}
              onClick={() => navigateToProducts(category._id)}
            >
              <span style={{marginTop : "1rem"}}>{MapCategories[category.name]}</span>
              <span className={styles.CategoryName}>{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatSection;
