import React, { useEffect, useState } from "react";
import styles from "../styles/profile.module.scss";
import axios from "axios";
import bufferToDataUrl from "../../../utils/ImageConvertor";
import { Oval } from "react-loader-spinner";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { addDays, format } from "date-fns";
import { enGB } from "date-fns/locale";
import { FcInTransit } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";

axios.defaults.withCredentials = true;

const Profile = () => {
  const [purchases, setPurchases] = useState<purchase[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  interface product {
    image: any;
    name: string;
    id: number;
    price: number;
  }

  interface purchase {
    date: Date;
    product: product;
  }

  const confrontaDate = (date: Date) => {
     const afterTomorrow = addDays(date, 2);
     const today = new Date()

    if (today >= afterTomorrow) {
      return true;
    } else {
      return false;
    }
  };

  const DateAsc = () => {
    const ascPurchases = [...purchases].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setPurchases(ascPurchases);
  };
  const DateDesc = () => {
    const descPurchases = [...purchases].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setPurchases(descPurchases);
  };

  const handlePurchasesAPI = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user/purchases/`,
        {
          withCredentials: true,
        }
      );

      setPurchases(response.data.content.purchases);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handlePurchasesAPI();
  }, []);

  return (
    <div>
      {loaded === true ? (
        <div className={styles.Wrapper}>
          {purchases === undefined || purchases.length === 0 ? (
            <div className={styles.PurchasesVuoto}>0 Purchases found</div>
          ) : (
            <div className={styles.PurchasesWrap}>
              <div className={styles.HeaderBar}>
                <h1 className={styles.Title}>Purchases</h1>
                <span>Date&nbsp;&nbsp;</span>
                <BsArrowUpCircle
                  className={styles.Selectors}
                  onClick={() => DateAsc()}
                />

                <BsArrowDownCircle
                  className={styles.Selectors}
                  onClick={() => DateDesc()}
                />
              </div>
              {purchases?.map((purchase: purchase, index: number) => {
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
                          src={bufferToDataUrl(purchase.product.image.data)}
                          alt="img"
                        />
                      </div>
                      <div className={styles.NamePrice}>
                        <span
                          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                        >
                          {purchase.product.name}
                        </span>
                        <div>
                          <h4>Price</h4>
                          <span>{purchase.product.price} $</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.DateWrapper}>
                      <span className={styles.Date}>
                        {" "}
                        <span style={{ fontWeight: "bold" }}>Purchased : </span>
                        {format(new Date(purchase.date), "dd MMM yyyy", {
                          locale: enGB,
                        })}
                      </span>
                      <div className={styles.Status}>
                        <span>Status : </span>
                        {confrontaDate(new Date(purchase.date)) === true ? (
                          <div className={styles.RowFlex}>
                            <span style={{ fontWeight: "normal" }}>
                              Delivered
                            </span>
                            <FaCheckCircle />
                          </div>
                        ) : (
                          <div className={styles.RowFlex}>
                            <span style={{ fontWeight: "normal" }}>
                              In transit
                            </span>
                            <FcInTransit />
                          </div>
                        )}{" "}
                      </div>
                    </div>
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

export default Profile;
