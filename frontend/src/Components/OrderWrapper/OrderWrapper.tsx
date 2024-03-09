import { Link } from "react-router-dom";
import { OrderItem } from "../../Pages/InfoOrder/InfoOrder";
import formatPrice from "../../Helper/formatPrice";
import { PATHS } from "../../Constants/path";

interface Props {
  orderItems: OrderItem[] | undefined;
}

function OrderWrapper(props: Props) {
  return (
    <>
      <div className="infoorder-wrapper">
        <div className="infoorder-titles">
          <h4 className="infoorder-title ">Sản phẩm</h4>
          <h4 className="infoorder-title ">Giá</h4>
          <h4 className="infoorder-title ">Giảm</h4>
          <h4 className="infoorder-title ">Tổng</h4>
        </div>
        {props.orderItems?.map((item) => {
          let basePrice = item.price;
          let discount = item.price * (item.discount / 100)
          return (
            <div className="infoorder-item">
              <Link
                style={{ textDecoration: "none" }}
                to={PATHS.PRODUCT + `/${item.productLine}`}
                className="infoorder-item-name"
              >
                {item.productName}
                <br />
                <br />
                <span>S/N: {item.productSN}</span>
                <span className="infoorder-item-warranty">
                  Bảo hành đến:{" "}
                  {new Date(item.warrantyDate).toLocaleDateString()}
                </span>
              </Link>
              <p className="infoorder-item-quantity">
                {formatPrice(basePrice)}
              </p>
              <p className="infoorder-item-price ">
                {formatPrice(discount)}
              </p>
              <p className="infoorder-item-total-price ">
                {formatPrice(basePrice - discount)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default OrderWrapper;
