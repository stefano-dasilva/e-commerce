import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/products.module.scss";
import bufferToDataUrl from "../../../utils/ImageConvertor";
import { Oval } from "react-loader-spinner";
import { BsArrowUpCircle } from "react-icons/bs";
import { BsArrowDownCircle } from "react-icons/bs";

axios.defaults.withCredentials = true;

const Products = () => {
  interface product {
    _id: number;
    availability: number;
    price: number;
    name: string;
    image: any;
    description: string;
  }
  const { state: categoryID } = useLocation();
  const [products, SetProducts] = useState<product[]>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [categoryName, SetCategoryName] = useState<string>("");
  const navigate = useNavigate();

  const handleProductsAPI = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/product/getproducts?category_ID=${categoryID}`,
        {
          withCredentials: true,
        }
      );

      SetProducts(response.data.content.products);
      SetCategoryName(response.data.content.name);
      setIsLoaded(true);
      console.log(response.data.content);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductDetail = (
    product_id: number,
    product_name: string,
    product_price: number,
    product_image: any,
    description: string
  ) => {
    navigate("/buy", {
      state: {
        id: product_id,
        name: product_name,
        price: product_price,
        image: product_image,
        description: description,
      },
    });
  };

  const PriceAsc = () => {
    if (products) {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      SetProducts(sortedProducts);
      console.log("ciao");
    }
  };
  const PriceDesc = () => {
    if (products) {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      SetProducts(sortedProducts);
      console.log("ciao");
    }
  };
  useEffect(() => {
    handleProductsAPI();
    return () => {
      setIsLoaded(false);
    };
  }, [categoryID]);
  return (
    <div>
      {isLoaded === true ? (
        <div className={styles.Wrapper}>
          <div className={styles.HeaderBar}>
            <h1 className={styles.Title}>{categoryName}</h1>
            <span>Price&nbsp;&nbsp;</span>
            <BsArrowUpCircle
              className={styles.Selectors}
              onClick={() => PriceAsc()}
            />

            <BsArrowDownCircle
              className={styles.Selectors}
              onClick={() => PriceDesc()}
            />
          </div>
          <div className={styles.productList}>
            {products?.map((product, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#082335" : "#001220",
                  }}
                  className={styles.singleProduct}
                >
                  <div className={styles.ImageWrapper}>
                    <img
                      className={styles.Image}
                      src={bufferToDataUrl(product.image.data)}
                      alt="product_image"
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
                  <h3>{product.name}</h3>
                  <h4>{product.price} $</h4>
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

export default Products;
