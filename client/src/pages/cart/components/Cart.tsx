import React, { useEffect, useState } from "react";
import styles from "../styles/cart.module.scss";
import axios from "axios";
import bufferToDataUrl from "../../../utils/ImageConvertor";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  interface cartitem {
    name: string;
    _id: number;
    image: any;
    price: number;
  }

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cartList, setCartList] = useState<cartitem[]>([]);

  const handleDeleteAPI = async (id: number) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/product/pullfromcart",
        {
          product_ID: id,
        },

        {
          withCredentials: true,
        }
      );
      handleCartAPI();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCartAPI = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/user/cart/`, {
        withCredentials: true,
      });

      console.log(response.data.info.cart);
      setCartList(response.data.info.cart);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProductDetail = (
    product_id: number,
    product_image: any,
    product_name: string,
    product_price: number
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

  useEffect(() => {
    handleCartAPI();
  }, []);

  return (
    <div>
      {isLoaded === true ? (
        <div className={styles.Wrapper}>
          {cartList === undefined || cartList.length === 0 ? (
            <div className={styles.CarrelloVuoto}>Il Carrello è vuoto</div>
          ) : (
            <div className={styles.CartListWrap}>
              <h1 className={styles.Title}>Cart</h1>
              {cartList?.map((cartitem, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#082335" : "#001220",
                    }}
                    className={styles.ItemWrap}
                  >
                    <div className={styles.ProductInfo}>
                      <div className={styles.ImageWrapper}>
                        <img
                          className={styles.Image}
                          src={bufferToDataUrl(cartitem.image.data)}
                          alt="img"
                        />
                      </div>
                      <div className={styles.NamePrice}>
                        <span>{cartitem.name}</span>
                        <div>
                          <h4>Price</h4>
                          <span>{cartitem.price} $</span>
                        </div>
                        <div className={styles.Buttons}>
                          <button
                            className={styles.ButtonWrap}
                            onClick={() => handleDeleteAPI(cartitem?._id)}
                          >
                            REMOVE
                          </button>
                          <button
                            className={styles.ButtonWrap}
                            onClick={() =>
                              handleProductDetail(
                                cartitem?._id,
                                bufferToDataUrl(cartitem.image.data),
                                cartitem.name,
                                cartitem.price
                              )
                            }
                          >
                            BUY
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.PriceWrapper}></div>
                  </div>
                );
              })}
            </div>
          )}
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

export default Cart;
