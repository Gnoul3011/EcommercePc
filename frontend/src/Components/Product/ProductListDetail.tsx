import Product from ".";
import { Brand, ProductItems } from "../../Pages/HomePage/Content";
import ButtonMore from "../Button/button-more";
function ProductListDetail(props: { products: ProductItems[]; name: string }) {
  console.log(props.name);
  return (
    <>
      <div className="product-list-detail">

        <Product products={props.products} />
      </div>
      <ButtonMore categoryName={props.name} />
    </>
  );
}

export default ProductListDetail;
