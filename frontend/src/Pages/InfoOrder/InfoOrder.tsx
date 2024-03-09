import { Avatar, Button, Flex } from "@mantine/core";

import { useParams } from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import OrderWrapper from "../../Components/OrderWrapper/OrderWrapper";
import ShipInfo from "../../Components/ShipInfo/ShipInfo";
import ChangePass from "../../Components/ChangePass/ChangePass";
import Total from "../../Components/Total/Total";
import UserInfor from "../../Components/UserInfor/UserInfor";
import UserOder from "../../Components/UserOrder/UserOrder";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import formatPrice from "../../Helper/formatPrice";
import ChangeMail from "../../Components/ChangeMail/ChangePass";

export interface OrderItem {
  productName: string;
  productLine: string;
  productSN: string;
  warrantyDate: string;
  price: number;
  discount: number;
}

export interface OrderInformation {
  id: number;
  username: string;
  fullname: string;
  address: string;
  note: string;
  email: string;
  phoneNumber: string;
}

interface Order {
  orderItems: OrderItem[];
  orderInformation: OrderInformation;
  orderStatus: string;
}

function InfoOrder() {
  const { orderId } = useParams();
  const [orderTotal, setOrderTotal] = useState({
    total: 0,
    discount: 0,
  });

  const [order, setOrder] = useState<Order>();
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8080/order/getOrderDetail?id=${orderId}`
      );
      const data = await response.data;
      console.log(data);
      setOrder({
        orderInformation: data.orderInformation,
        orderItems: data.orderItems,
        orderStatus: data.orderStatus,
      });
      data.orderItems.forEach((item: OrderItem) => {
        let basePrice = item.price;
        let discount = item.price * (item.discount / 100);
        setOrderTotal((prevState) => {
          let newState = { ...prevState };
          newState.discount = prevState.discount + discount;
          newState.total = prevState.total + basePrice;
          return newState;
        });
      });
    };
    fetchOrder();
  }, [orderId]);

  const handleCancelOrder = async () => {
    await axios.patch("http://127.0.0.1:8080/order/update-status", {
      orderId,
      orderStatus: "CANCELED",
    });
    setOrder((prevState) => {
      if (prevState) {
        let newState = { ...prevState };
        return { ...newState, orderStatus: "CANCELED" };
      }
      return prevState;
    });
  };

  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <div className="infouser-content">
          <div className="infouser-sidebar">
            <div className="infouser-avatar">
              <Avatar style={{ marginTop: "20px" }}></Avatar>
              <div className="margin-right">
                <UserInfor />
              </div>
            </div>
            <UserOder />
            <ChangePass />
            <div style={{ marginTop: "15px" }}>
              <ChangeMail />
            </div>
          </div>
          <div className="infoorder-container">
            <div className="infoorder-detail">
              <Flex
                align={"center"}
                justify={"space-between"}
                style={{ paddingBottom: "1rem" }}
              >
                <h4 className="heading-territory">
                  Thông tin hóa đơn
                  <span className="oder-id">#{order?.orderInformation.id}</span>
                </h4>
                {order?.orderStatus === "PENDING" && (
                  <Button color="#f03a17" onClick={handleCancelOrder}>
                    Hủy đơn hàng
                  </Button>
                )}
              </Flex>
              <OrderWrapper orderItems={order?.orderItems} />
            </div>
            <div className="info-total-address">
              <div className="infoorder-summary">
                <>
                  <div className="productcart-detail">
                    <div className="productcart-total">
                      <span className="productcart-texts">Tổng</span>
                      <span className="productcart-number">
                        {formatPrice(orderTotal.total)}
                      </span>
                    </div>
                    <div className="productcart-sale-all">
                      <span className="productcart-texts">Giảm giá</span>
                      <span className="productcart-number-sale">
                        -{formatPrice(orderTotal.discount)}
                      </span>
                    </div>
                    <div className="productcart-total-all">
                      <span className="productcart-text">Tổng cộng:</span>
                      <span className="productcart-number-total">
                        {formatPrice(orderTotal.total - orderTotal.discount)}
                      </span>
                    </div>
                  </div>
                </>
              </div>
              <ShipInfo orderInformation={order?.orderInformation} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoOrder;
