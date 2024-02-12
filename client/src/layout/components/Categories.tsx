import React, { useEffect, useState } from "react";
import styles from "../styles/categories.module.scss";
import axios from "axios";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { BsSmartwatch } from "react-icons/bs";
import { FaComputer } from "react-icons/fa6";
import { IoTabletLandscapeSharp } from "react-icons/io5";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoIosMusicalNotes } from "react-icons/io";
import { CgSmartHomeHeat } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  interface category {
    _id: number;
    name: string;
  }

  interface iconMapping {
    [key: string]: React.ReactElement;
  }
  const IconMapping: iconMapping = {
    Mobile: <IoPhonePortraitOutline />,
    Home: <MdHome />,
    Wearables: <BsSmartwatch />,
    Computer: <FaComputer />,
    Tablet: <IoTabletLandscapeSharp />,
    TV: <PiTelevisionSimpleBold />,
    Audio: <IoIosMusicalNotes />,
    Smarthome: <CgSmartHomeHeat />,
  };

  const navigate = useNavigate()

  const [categories, setCategories] = useState<category[]>([]);

  const navigateToProducts = (category_ID: number) => {
    navigate("/products", { state: category_ID });
    console.log(category_ID)
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
      <h4 style={{ color: "white", textAlign: "left" }}>Categories</h4>
      {categories.map((category,index) => (
        <div key={index}
          className={styles.Category}
          onClick={() => navigateToProducts(category._id)}
        >
          <span style={{fontSize : "1.6rem"}}>{IconMapping[category?.name]}</span>
          <span className={styles.CategoryName} >{category?.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
