import { Link } from "react-router-dom";
import Btn from "../Button";
import { PATHS } from "../../Constants/path";
import { ProductItem } from ".";
import formatPrice from "../../Helper/formatPrice";

function ProductSearchs(props: { product: ProductItem }) {
  const { product } = props;

  return (
    <>
      <div className="productsearch-card">
        <div className="productsearch-img">
          <img
            style={{ width: "100%", height: "100%" }}
            src={`http://127.0.0.1:8080/product/get-file?filePath=${product.thumbnailUri}`}
            alt=""
          />
        </div>
        <div className="productsearch-content">
          <span className="productsearch-text">{product.productName}</span>
          <div className="productsearch-info">
            <span className="productsearch-price">
              {formatPrice(product.price)}
            </span>
            <Link to={PATHS.PRODUCT + `/${product.productLine}`}>
              <Btn maintine="a">Xem sản phẩm</Btn>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductSearchs;
