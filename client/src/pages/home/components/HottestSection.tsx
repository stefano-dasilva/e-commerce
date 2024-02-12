import React, { useEffect, useState } from "react";
import styles from "../styles/hottestsection.module.scss";
import { FaFireFlameCurved } from "react-icons/fa6";
import axios from "axios";
import bufferToDataUrl from "../../../utils/ImageConvertor";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

axios.defaults.withCredentials = true;

const HottestSection = () => {
  interface product {
    _id: number;
    name: string;
    image: any;
    price: number;
    description: string;
  }
  const navigate = useNavigate();
  const [hottestProducts, setHottestProducts] = useState<product[]>([]);
  const [isLoaded , setIsLoaded] = useState<boolean>(false)

  const handleProductDetail = (
    product_id: number,
    product_name: string,
    product_price: number,
    product_image: any,
    product_description: string
  ) => {
    navigate("/buy", {
      state: {
        id: product_id,
        name: product_name,
        price: product_price,
        image: product_image,
        description: product_description,
      },
    });
  };
  const getHottestAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/product/hottest",

        {
          withCredentials: true,
        }
      );

      setHottestProducts(response.data.content);

      setIsLoaded(true)

      console.log(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHottestAPI();
  }, []);
  return (
    <div>
      {isLoaded === true ? (
        <div className={styles.Wrapper}>
          <div className={styles.TitleWrapper}>
            <FaFireFlameCurved />
            <span>Hottest</span>
          </div>
          <div className={styles.ProductsWrapper}>
            {hottestProducts?.map((product, index) => {
              const itemColor = index % 2 === 0 ? "#082335" : "#001220";

              return (
                <div
                  className={styles.Product}
                  key={index}
                  style={{
                    backgroundColor: itemColor,
                  }}
                >
                  <div className={styles.ImageWrapper}>
                    <img
                      className={styles.Image}
                      src={bufferToDataUrl(product?.image?.data)}
                      alt="image"
                      onClick={() =>
                        handleProductDetail(
                          product._id,
                          product.name,
                          product.price,
                          product.image.data,
                          product.description
                        )
                      }
                    />
                  </div>
                  <div className={styles.NameAndPrice}>
                    <span style={{ fontWeight: "bold" }}>{product?.name}</span>
                    <span>{product?.price} $</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.LoadBack}>
          <Oval
            height={80}
            width={80}
            color="#55b3ee"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#082335"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </div>
  );
};

export default HottestSection;
