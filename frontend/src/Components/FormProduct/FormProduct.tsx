import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  Button,
  ComboboxItem,
  FileInput,
  Flex,
  Input,
  NativeSelect,
  NumberInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useEffect, useReducer, useState } from "react";
import { Category, InfoInput, WarrantyPeriod } from "../FormChange/FormChange";
import axios from "axios";
import formatPrice from "../../Helper/formatPrice";

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

const FromProduct = (props: {
  setNewProduct: (productLine: string) => void;
}) => {
  const [productLine, setProductLine] = useState("");
  const [productName, setProductName] = useState("");
  const [brandId, setBrandId] = useState(-1);
  const [warrantyPeriodId, setWarrantyPeriodId] = useState(-1);
  const [categoryId, setCategoryId] = useState(-1);
  const [price, setPrice] = useState<string | number>("");
  const [discount, setDiscount] = useState<string | number>("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newThumbnail, setNewThumbnail] = useState<File | null>(null);
  const [newThumbnailURL, setNewThumbnailURL] = useState<string>("");
  const [newImageURLs, setNewImageURLs] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [warantyPeriods, setWarantyPeriods] = useState<WarrantyPeriod[]>([]);
  const initialArg: InfoInput = {};
  const [info, infoDispatch] = useReducer(infoReducer, initialArg);
  const [serial, serialDispatch] = useReducer(infoReducer, initialArg);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (newThumbnail) setNewThumbnailURL(URL.createObjectURL(newThumbnail));
    if (newImages)
      setNewImageURLs(
        newImages.map((image) => URL.createObjectURL(image).toString())
      );

    return () => {
      URL.revokeObjectURL(newThumbnailURL);
      newImageURLs.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [newThumbnail, newImages]);

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

  const handleAddProduct = async () => {
    const form = new FormData();
    const newProduct = JSON.stringify({
      productLine: productLine,
      productName: productName,
      price: price,
      discount: discount,
      brandId: brandId,
      categoryId: categoryId,
      warrantyPeriodId: warrantyPeriodId,
    });
    const blob = new Blob([newProduct], {
      type: "application/json",
    });

    form.append("json", blob);

    if (newImages) {
      [].forEach.call(newImages, (image) => {
        form.append("images", image);
      });
    }
    if (newThumbnail) {
      form.append("thumbnail", newThumbnail);
    }
    try {
      await axios.post("http://127.0.0.1:8080/product/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notifications.show({
        withCloseButton: true,
        autoClose: 1500,
        message: "Thêm sản phẩm thành công",
        color: "teal",
        icon: <IconCheck />,
        className: "my-notification-class",
        loading: false,
      });
      modals.closeAll();
    } catch (error) {
      setHasError(true);
      notifications.show({
        autoClose: 1500,
        icon: <IconX />,
        color: "red",
        message: "Vui lòng điền đầy đủ thông tin",
      });
    }
    try {
      const productInfos = Object.keys(info).map((key) => {
        return info[key];
      });
      // Cannot find info
      const productSerials = Object.keys(serial).map((key) => {
        return serial[key];
      });
      console.log(productInfos, productSerials);
      await axios.post(`http://127.0.0.1:8080/product-info/add-info`, {
        infos: productInfos,
        productLine,
      });
      await axios.post(`http://127.0.0.1:8080/product-warranty/create`, {
        productWarranties: productSerials,
        productLine,
      });
      props.setNewProduct(productLine);
    } catch (error) {}
  };

  const [errorHandle, setErrorHandle] = useState("");
  const [errorHandleName, setErrorHandleName] = useState("");
  const [errorHandlePrice, setErrorHandlePrice] = useState("");
  const [errorHandleDiscount, setErrorHandleDiscount] = useState("");

  const handleErrorInput = (e: string) => {
    if (!e) {
      setErrorHandle("Vui lòng không bỏ trống");
    } else {
      setErrorHandle("");
    }
  };

  const handleErrorInputName = (e: string) => {
    if (!e) {
      setErrorHandleName("Vui lòng không bỏ trống");
    } else {
      setErrorHandleName("");
    }
  };
  const handleErrorInputPrice = (e: string) => {
    if (parseInt(e) === 0) {
      setErrorHandlePrice("Vui lòng nhập giá > 0");
    } else if (!e) {
      setErrorHandlePrice("Vui lòng không bỏ trống");
    } else {
      setErrorHandlePrice("");
    }
  };
  const handleErrorInputDiscount = (e: string) => {
    if (parseInt(e) === 0) {
      setErrorHandleDiscount("Vui lòng nhập discount > 0");
    } else if (!e) {
      setErrorHandleDiscount("Vui lòng không bỏ trống");
    } else {
      setErrorHandleDiscount("");
    }
  };

  return (
    <div>
      <div className="modal-body">
        <Input.Wrapper className="mb-20" label="Line" error={errorHandle}>
          <Input
            onChange={(e) => {
              setProductLine(e.target.value);
              handleErrorInput(e.target.value);
            }}
            value={productLine}
            error={errorHandle}
          />
        </Input.Wrapper>
        <Input.Wrapper className="mb-20" label="Name" error={errorHandleName}>
          <Input
            onChange={(e) => {
              setProductName(e.target.value);
              handleErrorInputName(e.target.value);
            }}
            value={productName}
            error={errorHandleName}
          />
        </Input.Wrapper>
        <div className="product-thumbnail">
          {newThumbnailURL && (
            <img
              style={{ width: "200px", height: "200px" }}
              src={newThumbnailURL}
              alt=""
            />
          )}
        </div>
        <FileInput
          className="mb-20"
          label="Thumbnail"
          placeholder="Không có file nào được chọn"
          value={newThumbnail}
          onChange={setNewThumbnail}
        />
        <div className="product-thumbnail">
          {newImageURLs.map((image, index) => {
            return (
              <img
                key={index}
                style={{
                  width: "200px",
                  height: "200px",
                }}
                src={image}
                alt=""
              />
            );
          })}
        </div>
        <FileInput
          className="mb-20"
          label="Image"
          placeholder="Không có file nào được chọn"
          multiple
          value={newImages}
          onChange={setNewImages}
        />
        <div className="input-2  mb-20">
          <NumberInput
            style={{ width: "49%" }}
            label="Price"
            suffix="đ"
            defaultValue={0}
            value={price}
            min={0}
            onChange={(e) => {
              handleErrorInputPrice(e.toString());
              setPrice(e);
            }}
            error={errorHandlePrice}
          />
          <NumberInput
            style={{ width: "49%" }}
            label="Discount"
            value={discount}
            suffix="đ"
            defaultValue={0}
            min={0}
            onChange={(e) => {
              handleErrorInputDiscount(e.toString());
              setDiscount(e);
            }}
            error={errorHandleDiscount}
          />
        </div>
        <NativeSelect
          className="mb-20"
          style={{ width: "49%" }}
          label="Warranty Period"
          placeholder="Không có bảo hành"
          data={
            warantyPeriods
              ? warantyPeriods.map((item): ComboboxItem => {
                  if (warrantyPeriodId === -1) setWarrantyPeriodId(+item.id);
                  return {
                    value: item.id,
                    label: item.months + " tháng",
                    disabled: false,
                  };
                })
              : []
          }
          onChange={(event) => {
            setWarrantyPeriodId(+event.target.value);
          }}
        />
        <div className="input-2 mb-20">
          <NativeSelect
            style={{ width: "49%" }}
            label="Category"
            value={categoryId}
            data={
              categories
                ? categories.map((item): ComboboxItem => {
                    if (categoryId === -1) setCategoryId(+item.id);
                    return {
                      value: item.id,
                      label: item.name,
                      disabled: false,
                    };
                  })
                : [] 
            }
            onChange={(event) => {
              setCategoryId(+event.target.value);
              let category = categories.find((item) => {
                return item.id.toString() === event.target.value;
              });
              if (category) {
                setBrandId(+category.brands[0].id);
              }
            }}
          />
          <NativeSelect
            style={{ width: "49%" }}
            label="Brand"
            data={
              categories
                ? categories
                    .find((item) => +item.id === categoryId)
                    ?.brands.map((item): ComboboxItem => {
                      if (brandId === -1) setBrandId(+item.id);
                      return {
                        value: item.id,
                        label: item.brandName,
                        disabled: false,
                      };
                    })
                : []
            }
            onChange={(event) => {
              setBrandId(+event.target.value);
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
                  value={serial[key]}
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
        <Input.Wrapper className="mb-20" label="Serial Number ">
          <span
            className="moreinfo-text"
            onClick={() => serialDispatch({ type: "ADD" })}
          >
            More S/N
          </span>
          <Flex rowGap={"sm"} direction={"column"}>
            {Object.keys(serial).map((key) => (
              <Flex key={key} columnGap={"sm"}>
                <Input
                  title="info"
                  name="productInfo"
                  type="text"
                  value={info[key]}
                  style={{ flex: "1 1 90%" }}
                  onChange={(e) => {
                    return serialDispatch({
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
                    serialDispatch({ type: "DELETE", payload: { id: key } })
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
            await handleAddProduct();
          }}
        >
          Add Product
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

export default FromProduct;
