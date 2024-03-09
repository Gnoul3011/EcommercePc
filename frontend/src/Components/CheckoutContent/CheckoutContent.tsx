import { useShopingContext } from "../../Context/ShoppingContext";
import formatPrice from "../../Helper/formatPrice";
import ProductOrderNotItem from "../../Pages/ProductOdered/ProductOrderNotItem";

function CheckoutContent() {
  const {
    cartItems,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeCartItem,
    clearCart,
  } = useShopingContext();
  return (
    <>
      {cartItems.map((item) => {
        return (
          <div key={item.id} className="productcheckout-content">
            <div className="productcheckout-info">
              <div className="productcheckout-name">{item.productName}</div>
              <span className="productcheckout-color">Màu sắc: Black</span>
            </div>

            <div className="productcheckout-quality">{item.quantity}</div>
            <div className="productcheckout-price">
              {formatPrice(item.price)}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CheckoutContent;
