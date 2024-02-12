import React, { useEffect, useState } from "react";
import styles from "../styles/buy.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import bufferToDataUrl from "../../../utils/ImageConvertor";
import axios from "axios";

axios.defaults.withCredentials = true;

const Buy = () => {
  const { state } = useLocation();
  const [image, SetImage] = useState<any>();
  const navigate = useNavigate();

  const handleProductDetail = (
    product_id: number,
    product_image: any,
    product_name: string,
    product_price: number,
  ) => {
    navigate("/purchasedetail", {
      state: {
        id: product_id,
        image: product_image,
        name: product_name,
        price: product_price,
      },
    });
  };

  const handleAddToCartAPI = async (id: number) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/product/addtocart",
        {
          quantity: 1,
          product_ID: id,
        },

        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    SetImage(bufferToDataUrl(state.image));
    console.log(state.description);
  }, []);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ImageSection}>
        <div className={styles.ImageWrapper}>
          <img className={styles.Image} src={image} alt="product" />
        </div>
      </div>
      <div className={styles.Content}>
        <div className={styles.NamePrice}>
          <h1 style={{ color: "white" }}>{state.name}</h1>
          <h4 style={{ marginTop: "1rem" }}>{state.price}$</h4>
        </div>
        <p className={styles.Desc}>{state.description}</p>
        <div className={styles.ButtonsWrapper}>
          <button
            className={styles.Button}
            onClick={() => handleAddToCartAPI(state.id)}
          >
            ADD TO CART
          </button>
          <button
            className={styles.Button}
            onClick={() =>
              handleProductDetail(state.id, image, state.name, state.price)
            }
          >
            BUY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buy;
