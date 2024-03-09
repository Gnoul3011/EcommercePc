import Product from ".";
import { Brand, Category, ProductItems } from "../../Pages/HomePage/Content";
import ButtonMore from "../Button/button-more";
function ProductListFollowCategory(props: { products: ProductItems[] }) {
  return (
    <>
      <div className="product-list-detail">
        <Product products={props.products} />
      </div>
      {/* <ButtonMore products={e.products} /> */}
    </>
  );
}

export default ProductListFollowCategory;
