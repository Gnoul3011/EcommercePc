import React from "react";
import { TopProduct } from "../../PagesAdmin/Dashboard";
import formatPrice from "../../Helper/formatPrice";

const ProductSelling = (props: { product: TopProduct }) => {
  const { product } = props;
  return (
    <table style={{ margin: "30px 0 30px 0", width: "100%" }}>
      <tbody>
        <tr style={{ textAlign: "left" }}>
          <td>
            <h5 className="table-text" style={{ width: "400px" }}>
              {product.productName}
            </h5>
            <span className="text-muted" style={{ textAlign: "left" }}>
              {product.createdAt}
            </span>
          </td>
          <td style={{ width: "120px" }}>
            <h5 className="table-text">{formatPrice(product.price)}</h5>
            <span className="text-muted">Price</span>
          </td>
          <td style={{ width: "100px" }}>
            <h5 className="table-text">{product.totalSold}</h5>
            <span className="text-muted">Quantity</span>
          </td>
          <td style={{ width: "100px" }}>
            <h5 className="table-text">
              {formatPrice(product.price * product.totalSold)}
            </h5>
            <span className="text-muted">Amount</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductSelling;
