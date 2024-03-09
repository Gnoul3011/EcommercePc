import { useShopingContext } from "../../Context/ShoppingContext";
import formatPrice from "../../Helper/formatPrice";

function  Total() {
  const {
    cartItems,
    totalPrice,
    totalDiscount,
    increaseQty,
    decreaseQty,
    removeCartItem,
    clearCart,
  } = useShopingContext();
  const total = totalPrice - totalDiscount;
  return (
    <>
      <div className="productcart-detail">
        <div className="productcart-total">
          <span className="productcart-texts">Tổng</span>
          <span className="productcart-number">{formatPrice(totalPrice)}</span>
        </div>
        <div className="productcart-sale-all">
          <span className="productcart-texts">Giảm giá</span>
          <span className="productcart-number-sale">
            -{formatPrice(totalDiscount)}
          </span>
        </div>
        <div className="productcart-total-all">
          <span className="productcart-text">Tổng cộng:</span>
          <span className="productcart-number-total">{formatPrice(total)}</span>
        </div>
      </div>
    </>
  );
}

export default Total;
