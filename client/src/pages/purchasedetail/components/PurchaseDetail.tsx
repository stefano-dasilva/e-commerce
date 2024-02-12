import React, { useEffect, useState } from "react";
import styles from "../styles/purchasedetail.module.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AfterTomorrow } from "../../../utils/DateAfter";

const PurchaseDetail = () => {
  interface AddressType {
    city?: string;
    address?: string;
  }

    const navigate = useNavigate();


  const { state } = useLocation();
  const [shippingFee, setShippingFee] = useState<any>(
    (Math.random() * 10).toFixed(2)
  );

  const [userInfo, setUserInfo] = useState<any>();
  const [changeAddressInfo, setChangeAddressInfo] = useState<boolean>(false);
  const [changeCreditInfo, setChangeCreditInfo] = useState<boolean>(false);

  useEffect(() => {
    console.log("userInfor");
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    getUserInfoAPI();
  }, []);

  const totalPrice = () => {
    const totalPrice = (
      parseFloat(state.price) + parseFloat(shippingFee)
    ).toFixed(2);

    return totalPrice;
  };

  const [AddressInfo, setAddressInfo] = useState<AddressType>({
    city: "",
    address: "",
  });

  const [creditCard, setCreditCard] = useState<string>();

  const ChangeAddressInfo = (field: string, value: string) => {
    setAddressInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const ChangeCreditCard = (value: string) => {
    setCreditCard(value);
  };

  const getUserInfoAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/user/info",

        {
          withCredentials: true,
        }
      );

      setUserInfo(response.data.userData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuyAPI = async (id: number) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/product/buy",
        {
          quantity: 1,
          product_ID: id,
          creditcard: creditCard,
          city: AddressInfo.city,
          address: AddressInfo.address,
        },

        {
          withCredentials: true,
        }
      );

      navigate("/profile")
      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.HeadBar}>
        <h1>Order summary</h1>
      </div>
      <div className={styles.Container}>
        <div className={styles.OperationForms}>
          <div className={styles.Fatturazione}>
            <div style={{ gap: "2rem", display: "flex", flexDirection: "row" }}>
              <span>1</span>
              <span>Devilery Address</span>
            </div>
            <div className={styles.UserInfo}>
              {userInfo?.address !== "" &&
              userInfo?.city !== "" &&
              changeAddressInfo === false ? (
                <>
                  <span>{userInfo?.address}</span>
                  <span>{userInfo?.city}</span>
                </>
              ) : (
                <>
                  <input
                    className={styles.Input}
                    type="text"
                    placeholder="Address.."
                    name="address"
                    id="address"
                    value={AddressInfo.address}
                    onChange={(e) =>
                      ChangeAddressInfo("address", e.target.value)
                    }
                  />
                  <input
                    className={styles.Input}
                    type="text"
                    placeholder="City.."
                    name="city"
                    id="city"
                    value={AddressInfo.city}
                    onChange={(e) => ChangeAddressInfo("city", e.target.value)}
                  />
                </>
              )}
            </div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setChangeAddressInfo((prev) => !prev)}
            >
              Modify
            </span>
          </div>
          <div
            className={styles.Fatturazione}
            style={{ marginTop: "1rem", alignItems: "center" }}
          >
            {" "}
            <div style={{ gap: "2rem", display: "flex", flexDirection: "row" }}>
              <span>2</span>
              <span>Payment Method</span>
            </div>
            {userInfo?.creditcard !== "" && changeCreditInfo === false ? (
              <>
                <span>{userInfo?.creditcard}</span>
              </>
            ) : (
              <>
                <input
                  className={styles.Input}
                  type="text"
                  placeholder="Credit card.."
                  name="card"
                  id="card"
                  value={creditCard}
                  onChange={(e) => ChangeCreditCard(e.target.value)}
                />
              </>
            )}
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setChangeCreditInfo((prev) => !prev)}
            >
              Modify
            </span>
          </div>
          <div className={styles.MerchSummary}>
            <div style={{ gap: "2rem", display: "flex", flexDirection: "row" }}>
              <span>3</span>
              <span>Review items and shipping</span>
            </div>
            <div className={styles.ImageAndShipping}>
              <span style={{ marginLeft: "1rem" }}>
                Delivery date: {AfterTomorrow()}
              </span>
              <div className={styles.RowContainer}>
                <div className={styles.ImageContainer}>
                  <img src={state.image} alt="itemimage" />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span>{state.name}</span>
                  <span>{state.price}$</span>
                </div>
              </div>
              <div className={styles.TotalPrice}>
                <button
                  className={styles.Button}
                  onClick={() => handleBuyAPI(state.id)}
                >
                  BUY
                </button>
                <span>{totalPrice()} $</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Summary}>
          <div className={styles.SummaryContent}>
            <button
              className={styles.Button}
              style={{ width: "100%", margin: "0", marginTop: "1rem" }}
              onClick={() => handleBuyAPI(state.id)}
            >
              BUY
            </button>{" "}
            <h3
              style={{
                borderTop: "1px solid white",
                textAlign: "start",
                marginTop: "3rem",
              }}
            >
              Order Summary
            </h3>
            <div className={styles.Row} style={{ marginTop: "1rem" }}>
              <span>Items :</span>
              <span>{state.price}$</span>
            </div>
            <div
              className={styles.Row}
              style={{ borderBottom: "1px solid white", marginBottom: "1rem", paddingBottom : "1rem" }}
            >
              <span>Shipping fees:</span>
              <span>{shippingFee}$</span>
            </div>
            <div className={styles.Row} style={{ color: "#3ee6b0" }}>
              <span>Total Price :</span>
              <span>{totalPrice()}$</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetail;
