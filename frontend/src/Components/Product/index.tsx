import { Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import { PATHS } from "../../Constants/path";
import formatPrice from "../../Helper/formatPrice";
import { ProductItems } from "../../Pages/HomePage/Content";
import ButtonAdd from "../Button/button-add-to-cart";

export type ProductItem = {
  id: number;
  name?: string;
  productName: string;
  productLine: string;
  discount: number;
  price: number;
  thumbnailUri: string;
  stock: number;
};

function Product(props: { products: ProductItems[] }) {
  const products = props.products;
  return (
    <Flex gap={'md'} wrap={'wrap'}>
      {products.map((e) => {
        if (e.stock === 0)
          return <></>
        return (
          <div key={e.id} className="product-item"  style={{flex: "1 1 25%"}}>
            <Link
              to={{
                pathname: PATHS.PRODUCT + `/${e.productLine}`,
              }}
            >
              <div className="product-img">
                <img
                  src={`http://127.0.0.1:8080/product/get-file?filePath=${e.thumbnailUri}`}
                  alt={e.productName}
                  className="img"
                />
              </div>
            </Link>
            <div className="product-info">
              <h4 className="product-name">{e.productName}</h4>
              <div className="product-detail">
                <span className="product-price">{formatPrice(e.price)}</span>
                <ButtonAdd
                  id={e.id}
                  price={e.price}
                  discount={e.discount}
                  productLine={e.productLine}
                  productName={e.productName}
                  thumbnailUri={e.thumbnailUri}
                  stock={e.stock}
                />
              </div>
            </div>
          </div>
        );
      })}
    </Flex>
  );
}

export default Product;
