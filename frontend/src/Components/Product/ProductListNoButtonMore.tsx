import Product from ".";
import { Brand } from "../../Pages/HomePage/Content";
import ButtonMore from "../Button/button-more";

function ProductListNoButtonMore(props: { brands: Brand[]; category: string }) {
  return (
    <>
      <div className="product-list-detail" style={{ marginTop: "30px" }}>
        {props.brands.map((e) => {
          return (
            <div>
              <div key={e.id} className="title">
                {e.brandName}
              </div>
              <Product products={e.products} />
              <ButtonMore
                brandName={e.brandName}
                categoryName={props.category}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default ProductListNoButtonMore;
