import {
  ComboboxItem,
  Divider,
  Flex,
  Group,
  Input,
  NativeSelect,
  Radio,
} from "@mantine/core";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import Btn from "../../Components/Button";
import CheckoutContent from "../../Components/CheckoutContent/CheckoutContent";
import CheckoutText from "../../Components/CheckoutText/CheckoutText";
import InputGrib4 from "../../Components/InputGrid/InputGrib4";
import Total from "../../Components/Total/Total";
import { PATHS } from "../../Constants/path";
import { useShopingContext } from "../../Context/ShoppingContext";
import { UserInformation } from "../InfoUser/InfoUser";
import { useAuthContext } from "../../Context/AuthContext";

function ProductCheckout() {
  const auth = useAuthContext();
  const [userInfo, setUserInfo] = useState<UserInformation>({
    username: auth.auth.sub!,
    accountDetail: {
      city: "",
      default: false,
      detailedAddress: "",
      district: "",
      email: "",
      firstName: "",
      id: -1,
      lastName: "",
      phoneNumber: "",
    },
  });
  const [address, setAddress] = useState<UserInformation[] | null>();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const cartContext = useShopingContext();
  useEffect(() => {
    const getAllUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/userDetail/all"
        );
        setAddress(response.data);
        if (response.data.length > 0) {
          setUserInfo(
            response.data.find(
              (item: { accountDetail: { default: boolean } }) => {
                return item.accountDetail.default === true;
              }
            )
          );
        }
      } catch {}
    };
    getAllUserInfo();
  }, []);
  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8080/order/create", {
      firstName: userInfo?.accountDetail.firstName,
      lastName: userInfo?.accountDetail.lastName,
      phoneNumber: userInfo?.accountDetail.phoneNumber,
      email: userInfo?.accountDetail.email,
      city: userInfo?.accountDetail.city,
      district: userInfo?.accountDetail.district,
      detailedAddress: userInfo?.accountDetail.detailedAddress,
      note: note,
      total: cartContext.totalPrice - cartContext.totalDiscount,
      cartItems: cartContext.cartItems.map((cartItem) => {
        return {
          productLine: cartItem.productLine,
          quantity: cartItem.quantity,
        };
      }),
    });
    if (userInfo?.accountDetail.id === -1) {
      const response = await axios.post("http://127.0.0.1:8080/userDetail/create", {
        firstName: userInfo?.accountDetail.firstName,
        lastName: userInfo?.accountDetail.lastName,
        phoneNumber: userInfo?.accountDetail.phoneNumber,
        email: userInfo?.accountDetail.email,
        city: userInfo?.accountDetail.city,
        district: userInfo?.accountDetail.district,
        detailedAddress: userInfo?.accountDetail.detailedAddress,
      });
      if (address?.length === 0) {
        await axios.patch(`http://127.0.0.1:8080/userDetail/${response.data.id}/default`);
      }
    }
    cartContext.clearCart();
    return navigate(PATHS.ORDERED);
  };
  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <div className="productcheckout-title">
          <h1> Thông tin thanh toán</h1>
        </div>
        <div className="productcheckout-body">
          <div className="productcheckout-left">
            {address && address.length > 0 && (
              <div style={{ width: "100%", display: "flex", columnGap: "5%" }}>
                <div style={{ flex: "1 1 50%" }}>
                  <span className="productcheckput-text">Địa chỉ:</span>
                  <NativeSelect
                    style={{ width: "100%" }}
                    placeholder="Native select"
                    data={address?.map((addr): ComboboxItem => {
                      return {
                        value: addr.accountDetail.id?.toString() ?? "",
                        label: `${addr.accountDetail.detailedAddress} ${
                          addr.accountDetail.district
                        } ${addr.accountDetail.city}${
                          addr.accountDetail.default === true
                            ? " - Mặc định"
                            : ""
                        }`,
                      };
                    })}
                    disabled={isAddingAddress ? true : false}
                    onChange={(e) =>
                      setUserInfo(
                        address.find(
                          (addr) => +addr.accountDetail.id === +e.target.value
                        )!
                      )
                    }
                  />
                </div>
                <Flex>
                  {!isAddingAddress && (
                    <Btn
                      maintine="a"
                      customStyle={{
                        alignSelf: "flex-end",
                        justifySelf: "flex-end",
                      }}
                      onClick={() => {
                        setIsAddingAddress(true);
                        setUserInfo((prevState: any) => {
                          if (prevState) {
                            let newState = { ...prevState };
                            newState.accountDetail = {
                              city: "",
                              default: false,
                              detailedAddress: "",
                              district: "",
                              email: "",
                              firstName: "",
                              id: -1,
                              lastName: "",
                              phoneNumber: "",
                            };
                            return newState;
                          }
                        });
                      }}
                    >
                      Thêm địa chỉ mới
                    </Btn>
                  )}
                  {isAddingAddress && (
                    <Btn
                      maintine="a"
                      customStyle={{
                        alignSelf: "flex-end",
                        justifySelf: "flex-end",
                      }}
                      color="#f03a17"
                      onClick={() => {
                        setIsAddingAddress(false);
                        if (address) setUserInfo(address[0]);
                      }}
                    >
                      Hủy
                    </Btn>
                  )}
                </Flex>
              </div>
            )}
            <form action="" onSubmit={handleSubmitForm}>
              <div className="productcheckout-grid">
                <div className="productcheckout-grid-input">
                  <span className="productcheckput-text">Họ và tên đệm:</span>
                  <Input.Wrapper style={{ marginRight: "8px" }}>
                    <Input
                      placeholder="Nguyễn"
                      value={userInfo?.accountDetail.firstName}
                      onChange={(e) => {
                        if (userInfo)
                          setUserInfo({
                            accountDetail: {
                              ...userInfo.accountDetail,
                              firstName: e.target.value,
                            },
                            username: userInfo.username,
                          });
                      }}
                    />
                  </Input.Wrapper>
                </div>
                <div className="productcheckout-grid-input">
                  <span className="productcheckput-text">Tên:</span>
                  <Input.Wrapper style={{ marginLeft: "8px" }}>
                    <Input
                      placeholder="Lương"
                      value={userInfo?.accountDetail.lastName}
                      onChange={(e) => {
                        if (userInfo)
                          setUserInfo({
                            accountDetail: {
                              ...userInfo.accountDetail,
                              lastName: e.target.value,
                            },
                            username: userInfo.username,
                          });
                      }}
                    />
                  </Input.Wrapper>
                </div>
              </div>
              {userInfo && (
                <InputGrib4
                  provinceCode={userInfo.accountDetail.city}
                  districtCode={userInfo.accountDetail.district}
                  phoneNumber={userInfo.accountDetail.phoneNumber}
                  setUserInfo={setUserInfo}
                  userInfo={userInfo}
                  isEditing={true}
                />
              )}
              <div className="productcheckout-input">
                <span className="productcheckput-text">Địa chỉ chi tiết:</span>
                <Input.Wrapper>
                  <Input
                    placeholder="Số nhà, tên đường, xã, phường, thị trấn,..."
                    value={userInfo?.accountDetail.detailedAddress}
                    onChange={(e) => {
                      if (userInfo)
                        setUserInfo({
                          accountDetail: {
                            ...userInfo.accountDetail,
                            detailedAddress: e.target.value,
                          },
                          username: userInfo.username,
                        });
                    }}
                  />
                </Input.Wrapper>
              </div>
              <div className="productcheckout-input">
                <span className="productcheckput-text">Ghi chú:</span>
                <Input.Wrapper>
                  <Input
                    placeholder="Ghi chú cho shipper"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Input.Wrapper>
              </div>
              <div className="productcheckout-receive">
                <span className="productcheckput-text">
                  Hình thức nhận hàng:
                </span>
                <div className="productcheckout-radio">
                  <Radio.Group name="favoriteFramework" withAsterisk>
                    <Group mt="xs">
                      <Radio value="" label="Nhận tại cửa hàng" />
                      <Radio value="" label="Giao hàng tận nơi" />
                    </Group>
                  </Radio.Group>
                </div>
              </div>
              <Divider my="sm" />
              <div className="productcheckout-button">
                <Link to={PATHS.CART}>
                  <Btn maintine="a" variant="default" color="#f03a17">
                    Sửa sản phẩm
                  </Btn>
                </Link>
                <Btn fullWidth type="submit" maintine="a">
                  Đặt hàng
                </Btn>
              </div>
            </form>
          </div>
          <div className="productcheckout-right">
            <CheckoutText />
            <CheckoutContent />
            <div className="productcheckout-padding">
              <Total />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCheckout;
