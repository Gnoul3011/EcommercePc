import { useState } from "react";
import Product from ".";
import { Brand, Category, ProductItems } from "../../Pages/HomePage/Content";
import ButtonMore from "../Button/button-more";

function ProductList(props: { brands: Brand[]; name: string }) {
  const categoryItems = props.brands.map((e, index) => {
    return e.products;
  });

  return (
    <>
      <>
        <div className="product-list-detail">

          <Product products={categoryItems.flat()} />
        </div>
        <ButtonMore categoryName={props.name} />
      </>
    </>
  );
}

export default ProductList;
