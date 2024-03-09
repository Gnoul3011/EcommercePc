import { ProductDetailType } from "../../Pages/ProductDetail/ProductDetail";

function ProductInfo(props: ProductDetailType) {
  return (
    <>
      <div className="product-detail-info">
        <h1 className="product-detail-text">{props.product.productName}</h1>
        <div className="product-detail-features">
          {props.productInfos.map((e) => {
            return (
              <div key={e.id} className="product-detail-feature">
                <img
                  className=" product-detail-feature-icon"
                  src="/img/badge-check.png"
                  alt=""
                />
                <span className="product-detail-feature-text">
                  {e.productInformation}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
