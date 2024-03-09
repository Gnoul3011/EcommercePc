import { Button, Input } from "@mantine/core";
import { modals } from "@mantine/modals";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductDetailType } from "../../Pages/ProductDetail/ProductDetail";
import formatPrice from "../../Helper/formatPrice";

interface Props {
  productLine: string;
}

const FormView = (props: Props) => {
  const [product, setProduct] = useState<ProductDetailType>();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/product/${props.productLine}`
        );
        setProduct(response.data);
      } catch {}
    };
    fetchProduct();
  }, [props.productLine]);

  return (
    <div>
      <div className="modal-body">
        <Input.Wrapper className="mb-20" label="Line">
          <Input component="button" pointer>
            <Input.Placeholder>
              {product?.product.productLine}
            </Input.Placeholder>
          </Input>
        </Input.Wrapper>
        <Input.Wrapper className="mb-20" label="Name">
          <Input component="button" pointer>
            <Input.Placeholder>
              {product?.product.productName}
            </Input.Placeholder>
          </Input>
        </Input.Wrapper>
        <span className="text-label">Thumbnail</span>
        <div className="product-thumbnail">
          <img
            style={{ width: "200px", height: "200px" }}
            src={`http://127.0.0.1:8080/product/get-file?filePath=${product?.thumbnailUri}`}
            alt=""
          />
        </div>
        <span className="text-label">Image</span>
        <div className="product-thumbnail">
          {product &&
            product.imageUris.map((imageUri) => (
              <img
                style={{ width: "200px", height: "200px" }}
                src={`http://127.0.0.1:8080/product/get-file?filePath=${imageUri}`}
                alt=""
              />
            ))}
        </div>

        <div className="input-2  mb-20">
          <Input.Wrapper style={{ width: "49%" }} label="Price">
            <Input component="button" pointer>
              <Input.Placeholder>
                {product && formatPrice(product.product.price)}
              </Input.Placeholder>
            </Input>
          </Input.Wrapper>
          <Input.Wrapper style={{ width: "49%" }} label="NameDiscount(%)">
            <Input component="button" pointer>
              <Input.Placeholder>
                {product && product.product.discount}%
              </Input.Placeholder>
            </Input>
          </Input.Wrapper>
        </div>
        <Input.Wrapper
          style={{ width: "49%" }}
          className="mb-20"
          label="Warranty Period"
        >
          <Input component="button" pointer>
            <Input.Placeholder>{product?.warrantyPeriod} tháng</Input.Placeholder>
          </Input>
        </Input.Wrapper>
        <div className="input-2  mb-20">
          <Input.Wrapper style={{ width: "49%" }} label="Category">
            <Input component="button" pointer>
              <Input.Placeholder>{product?.categoryName}</Input.Placeholder>
            </Input>
          </Input.Wrapper>
          <Input.Wrapper style={{ width: "49%" }} label="Brand">
            <Input component="button" pointer>
              <Input.Placeholder>{product?.brandName}</Input.Placeholder>
            </Input>
          </Input.Wrapper>
        </div>
        <Input.Wrapper label="Infomation">
          {product &&
            product.productInfos.map((productInfo) => (
              <Input component="button" pointer className="mb-20">
                <Input.Placeholder>
                  {productInfo.productInformation}
                </Input.Placeholder>
              </Input>
            ))}
        </Input.Wrapper>
      </div>
      <div className="modal-footer">
        <Button
          style={{ backgroundColor: "#eef2f7", color: "black" }}
          onClick={() => modals.closeAll()}
          mt="md"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default FormView;
