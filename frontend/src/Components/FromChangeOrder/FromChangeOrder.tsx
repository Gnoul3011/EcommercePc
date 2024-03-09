import { Button, NativeSelect } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import Seaparator from "../Seaparator/Seaparator";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { OrderInformation, OrderItem } from "../../Pages/InfoOrder/InfoOrder";
import formatPrice from "../../Helper/formatPrice";

interface Order {
  orderItems: OrderItem[];
  orderInformation: OrderInformation;
  orderStatus: string;
}

const FromChangeOrder = (props: { orderId: number }) => {
  const [orderStatus, setOrderStatus] = useState("");
  const [orderTotal, setOrderTotal] = useState({
    total: 0,
    discount: 0,
  });
  const [order, setOrder] = useState<Order>();
  const fetchOrder = useCallback(async () => {
    const response = await axios.get(
      `http://127.0.0.1:8080/order/getOrderDetail?id=${props.orderId}`
    );
    setOrder({
      orderInformation: response.data.orderInformation,
      orderItems: response.data.orderItems,
      orderStatus: response.data.orderStatus,
    });
    setOrderStatus(response.data.orderStatus);
    response.data.orderItems.forEach((item: OrderItem) => {
      let basePrice = item.price;
      let discount = item.price * (item.discount / 100);
      setOrderTotal((prevState) => {
        let newState = { ...prevState };
        newState.discount = prevState.discount + discount;
        newState.total = prevState.total + basePrice;
        return newState;
      });
    });
  }, [props.orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  return (
    <div>
      <div className="infoorder-wrapper">
        <br />
        <div className="infoorder-header">
          Trạng thái đơn hàng
          <span className="text-status bg-warning">{order?.orderStatus}</span>
        </div>
        <br />
        {!(order?.orderStatus === "CANCELED" || order?.orderStatus === "SUCCESS") && (
          <>
            <NativeSelect
              style={{ width: "50%", marginTop: "20px" }}
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              data={[
                { label: "Đang xử lý", value: "PENDING" },
                { label: "Đã xác nhận", value: "CONFIRMED" },
                { label: "Đang giao", value: "DELIVERING" },
                { label: "Đã giao", value: "SUCCESS" },
                { label: "Đã hủy", value: "CANCELED" },
              ]}
            />
            <Button
              style={{ marginBottom: "20px" }}
              mt="md"
              onClick={async () => {
                await axios.patch("http://127.0.0.1:8080/order/update-status", {
                  orderId: order?.orderInformation.id,
                  orderStatus: orderStatus,
                });
                setOrder((prevState) => {
                  if (prevState) {
                    const newState = { ...prevState };
                    newState.orderStatus = orderStatus;
                    return newState;
                  }
                  return prevState;
                });
                notifications.show({
                  withCloseButton: true,
                  autoClose: 1500,
                  message: "Cập nhật trạng thái thành công",
                  color: "teal",
                  icon: <IconCheck />,
                  className: "my-notification-class",
                  loading: false,
                });
              }}
            >
              Save and change
            </Button>
          </>
        )}
        <div className="infoorder-titles">
          <h4 className="infoorder-title ">Sản phẩm</h4>
          <h4 className="infoorder-title ">Giá</h4>
          <h4 className="infoorder-title ">Giảm</h4>
          <h4 className="infoorder-title ">Tổng</h4>
        </div>
        {order?.orderItems.map((item) => {
          let basePrice = item.price;
          let discount = item.price * (item.discount / 100);
          return (
            <div className="infoorder-item">
              <div className="infoorder-item-name">
                {item.productName}
                <br />
                <br />
                S/N: {item.productSN}
                <span className="infoorder-item-warranty">
                  Bảo hành đến:{" "}
                  {new Date(item.warrantyDate).toLocaleDateString()}
                </span>
              </div>

              <span className="infoorder-item-quantity">
                {formatPrice(basePrice)}
              </span>
              <span className="infoorder-item-price">
                -{formatPrice(discount)}
              </span>
              <span className="infoorder-item-total-price">
                {formatPrice(basePrice - discount)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="order-total-admin">
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
      <div className="shipinfo-admin">
        <div
          style={{ paddingLeft: "0" }}
          className="infoorder-ship-information"
        >
          <h2 className="infoorder-text ">
            Họ và Tên: {order?.orderInformation.fullname}
          </h2>
          <p className="infoorder-text">
            Email: {order?.orderInformation.email}
          </p>
          <p className="infoorder-text">
            Số điện thoại: {order?.orderInformation.phoneNumber}
          </p>
          <p className="infoorder-text ">
            Địa chỉ: {order?.orderInformation.address}
          </p>
          <p className="infoorder-text ">
            Ghi chú: {order?.orderInformation.note}
          </p>
        </div>
      </div>
      <div className="infoorder-footer">
        <Seaparator />
      </div>
    </div>
  );
};

export default FromChangeOrder;
