import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  Button,
  FileInput,
  Flex,
  Input,
  NativeSelect,
  ComboboxItem,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useEffect, useReducer, useState } from "react";
import { ProductDetailType } from "../../Pages/ProductDetail/ProductDetail";
import axios from "axios";

interface Props {
  productLine: string;
}

function infoReducer(state: any, action: any) {
  let newState = { ...state };
  switch (action.type) {
    case "UPDATE":
      newState[action.payload.id] = action.payload.info;
      return newState;
    case "ADD":
      newState[Math.floor(Math.random() * 100000000)] = "";
      return newState;
    case "DELETE":
      delete newState[action.payload.id];
      return newState;
    case "LOAD":
      action.payload.infos.forEach(
        (info: { id: number; productInformation: string }) => {
          newState[info.id] = info.productInformation;
        }
      );
      return newState;
    case "SAVE":
      return state;
    default:
      return state;
  }
}

export interface InfoInput {
  [id: string]: string;
}

export interface Brand {
  id: string;
  brandName: string;
}

export interface Category {
  id: string;
  name: string;
  brands: Brand[];
}

export interface WarrantyPeriod {
  id: string;
  months: number;
}

const FormChange = (props: Props) => {
  const initialArg: InfoInput = {};
  const [info, infoDispatch] = useReducer(infoReducer, initialArg);
  const [product, setProduct] = useState<ProductDetailType>();
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [warantyPeriods, setWarantyPeriods] = useState<WarrantyPeriod[]>([]);

  async function getProduct(proudctLine: string): Promise<any> {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/product/${proudctLine}`
      );
      return response.data;
    } catch {}
  }

  useEffect(() => {
    const handleGetBrandCategory = async () => {
      const categoryResponse = await axios.get(
        `http://127.0.0.1:8080/category/all/simple?active=true`
      );
      setCategories(categoryResponse.data);
      const productWarrantyPeriodResponse = await axios.get(
        `http://127.0.0.1:8080/warranty-period`
      );
      setWarantyPeriods(productWarrantyPeriodResponse.data);
    };
    handleGetBrandCategory();
  }, []);

  useEffect(() => {
    const handleGetProduct = async () => {
      const response = await getProduct(props.productLine);
      setProduct(response);
      infoDispatch({
        type: "LOAD",
        payload: {
          infos: response.productInfos,
        },
      });
    };
    handleGetProduct();
  }, [props.productLine]);

  const handleUpdateProduct = async () => {
    const form = new FormData();
    const updatedProduct = JSON.stringify({
      productLine: product?.product.productLine,
      productName: product?.product.productName,
      price: product?.product.price,
      discount: product?.product.discount,
      brandId: product?.brandId,
      categoryId: product?.categoryId,
      warrantyPeriodId: product?.warrantyPeriodId,
      imageUris: product?.imageUris,
    });
    const blob = new Blob([updatedProduct], {
      type: "application/json",
    });
    form.append("data", blob);
    if (newImages) {
      [].forEach.call(newImages, (image) => {
        form.append("images", image);
      });
    }
    if (newThumbnail) {
      form.append("thumbnail", newThumbnail);
    }
    const { data } = await axios.patch(
      "http://127.0.0.1:8080/product/update",
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(data);
    const productInfos = Object.keys(info).map((key) => {
      return {
        id: key,
        productInformation: info[key],
      };
    });
    console.log(productInfos);

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8080/product-info/update`,
        {
          productInfos,
          productLine: product?.product.productLine,
        }
      );
      return response.data;
    } catch {}
  };

  return (
    <div>
      <div className="modal-body">
        <Input.Wrapper className="mb-20" label="Line">
          <Input component="button" pointer>
            <Input.Placeholder>{props.productLine}</Input.Placeholder>
          </Input>
        </Input.Wrapper>
        <Input.Wrapper className="mb-20" label="Name">
          <Input
            value={product && product.product.productName}
            onChange={(e) => {
              if (product) {
                setProduct({
                  ...product,
                  product: {
                    ...product.product,
                    productName: e.target.value,
                  },
                });
              }
            }}
          />
        </Input.Wrapper>
        <span className="text-label">Thumbnail</span>
        <div className="product-thumbnail">
          <img
            style={{ width: "200px", height: "200px" }}
            src={
              newThumbnail
                ? URL.createObjectURL(newThumbnail)
                : `http://127.0.0.1:8080/product/get-file?filePath=${product?.thumbnailUri}`
            }
            alt=""
          />
        </div>
        <FileInput
          className="mb-20"
          label="Select New Thumbnail"
          placeholder="Không có file nào được chọn"
          value={newThumbnail}
          onChange={setNewThumbnail}
        />
        <span className="text-label">Image</span>
        <div className="product-thumbnail">
          {product?.imageUris.map((image) => {
            return (
              <img
                key={image}
                style={{
                  width: "200px",
                  height: "200px",
                }}
                src={`http://127.0.0.1:8080/product/get-file?filePath=${image}`}
                alt=""
                onClick={(e) => {
                  if (product) {
                    setProduct({
                      ...product,
                      imageUris: [
                        ...product.imageUris.filter(
                          (imageUri) => imageUri !== image
                        ),
                      ],
                    });
                  }
                }}
              />
            );
          })}
          {newImages.map((image, index) => {
            return (
              <img
                key={index}
                style={{
                  width: "200px",
                  height: "200px",
                }}
                src={URL.createObjectURL(image)}
                alt=""
              />
            );
          })}
        </div>
        <FileInput
          className="mb-20"
          label="Add New Image"
          placeholder="Không có file nào được chọn"
          multiple
          value={newImages}
          onChange={setNewImages}
        />
        <Flex columnGap={"md"}>
          <Input.Wrapper
            className="mb-20"
            label="Price"
            style={{ flex: "1 1 50%" }}
          >
            <Input
              value={product && product.product.price}
              type="number"
              onChange={(e) => {
                if (product) {
                  setProduct({
                    ...product,
                    product: {
                      ...product.product,
                      price: +e.target.value,
                    },
                  });
                }
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper
            className="mb-20"
            label="Discount"
            style={{ flex: "1 1 50%" }}
          >
            <Input
              value={product && product.product.discount}
              type="number"
              onChange={(e) => {
                if (product) {
                  setProduct({
                    ...product,
                    product: {
                      ...product.product,
                      discount: +e.target.value,
                    },
                  });
                }
              }}
            />
          </Input.Wrapper>
        </Flex>
        <NativeSelect
          className="mb-20"
          style={{ width: "50%" }}
          label="Warranty Period"
          placeholder="Không có bảo hành"
          value={product?.warrantyPeriodId}
          data={
            warantyPeriods
              ? warantyPeriods.map((item): ComboboxItem => {
                  return {
                    value: item.id,
                    label: item.months + " tháng",
                    disabled: false,
                  };
                })
              : []
          }
        />
        <div className="input-2 mb-20">
          <NativeSelect
            style={{ width: "49%" }}
            label="Category"
            defaultValue={product?.categoryId}
            data={
              categories
                ? categories.map((item): ComboboxItem => {
                    return {
                      value: item.id,
                      label: item.name,
                      disabled: false,
                    };
                  })
                : []
            }
            onChange={(event) => {
              setProduct((prevState) => {
                if (prevState) {
                  let newState = { ...prevState };
                  newState.categoryId = +event.target.value;
                  let category = categories.find((item) => {
                    return item.id.toString() === event.target.value;
                  });
                  if (category) {
                    console.log(category.brands[0]);
                    newState.brandId = +category.brands[0].id;
                  }
                  return newState;
                }
              });
            }}
          />
          <NativeSelect
            style={{ width: "49%" }}
            label="Brand"
            defaultValue={product?.brandId}
            data={
              categories && product
                ? categories
                    .find((item) => +item.id === product.categoryId)
                    ?.brands.map((item): ComboboxItem => {
                      return {
                        value: item.id,
                        label: item.brandName,
                        disabled: false,
                      };
                    })
                : []
            }
            onChange={(event) => {
              setProduct((prevState) => {
                if (prevState) {
                  let newState = { ...prevState };
                  newState.brandId = +event.target.value;
                  return newState;
                }
              });
            }}
          />
        </div>
        <Input.Wrapper className="mb-20" label="Information">
          <span
            className="moreinfo-text"
            onClick={() => infoDispatch({ type: "ADD" })}
          >
            More Info
          </span>
          <Flex rowGap={"sm"} direction={"column"}>
            {Object.keys(info).map((key) => (
              <Flex key={key} columnGap={"sm"}>
                <Input
                  title="info"
                  name="productInfo"
                  type="text"
                  value={info[key]}
                  style={{ flex: "1 1 90%" }}
                  onChange={(e) => {
                    return infoDispatch({
                      type: "UPDATE",
                      payload: {
                        id: key,
                        info: e.target.value,
                      },
                    });
                  }}
                />
                <Button
                  type="button"
                  onClick={() =>
                    infoDispatch({ type: "DELETE", payload: { id: key } })
                  }
                  color="#f03a17"
                >
                  Xóa
                </Button>
              </Flex>
            ))}
          </Flex>
        </Input.Wrapper>
      </div>
      <div className="modal-footer">
        <Button
          mt="md"
          onClick={async () => {
            await handleUpdateProduct();
            console.log(product);
            notifications.show({
              withCloseButton: true,
              autoClose: 1500,
              message: "Cập nhật sản phẩm thành công",
              color: "teal",
              icon: <IconCheck />,
              className: "my-notification-class",
              loading: false,
            });
            modals.closeAll();
          }}
        >
          Save and change
        </Button>
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

export default FormChange;
