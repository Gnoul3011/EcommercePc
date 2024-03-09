import { Group, ColorSwatch } from "@mantine/core";
import { useState } from "react";
import { ProductItem } from ".";
import formatPrice from "../../Helper/formatPrice";
import { ProductDetailType } from "../../Pages/ProductDetail/ProductDetail";

function ProductColor(props: { product: ProductItem; warrantyPeriod: number }) {
  return (
    <>
      <div className="product-detail-attribute">
        <div className="product-detail-price">
          <div className="product-detail-warranty">
            Thời gian bảo hành: {props.warrantyPeriod} tháng
          </div>
          <span className="product-detail-price-new">
            {formatPrice(props.product.price)}
          </span>
          <span className="product-detail-price-old">
            {formatPrice(
              props.product.price + props.product.price / props.product.discount
            )}
          </span>
        </div>
      </div>
    </>
  );
}

export default ProductColor;
