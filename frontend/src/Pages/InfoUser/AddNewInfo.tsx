import {
  Avatar,
  ComboboxItem,
  Divider,
  Flex,
  Input,
  NativeSelect,
  Switch,
} from "@mantine/core";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../../Components/Button";
import { Division } from "../../Components/InputGrid/InputGrib4";
import UserInfor from "../../Components/UserInfor/UserInfor";
import UserOder from "../../Components/UserOrder/UserOrder";
import { PATHS } from "../../Constants/path";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import { UserInformation } from "./InfoUser";

interface NewUserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  district: string;
  detailedAddress: string;
  isDefault: boolean;
}

function AddNewInfo() {
  const [division, setDivision] = useState<Division[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  useEffect(() => {
    const provinceAxios = axios.create({});
    const fetchProvices = async () => {
      try {
        const res = await provinceAxios.get(
          "http://provinces.open-api.vn/api/?depth=2"
        );
        const data = await res.data;
        setDivision(data);
      } catch (error) {
        console.log("error=> ", error);
      }
    };
    fetchProvices();
  }, []);
  const [userInfo, setUserInfo] = useState<NewUserInfo>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    city: "",
    district: "",
    detailedAddress: "",
    isDefault: false,
  });
  const navigate = useNavigate();

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post("http://127.0.0.1:8080/userDetail/create", {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      phoneNumber: userInfo.phoneNumber,
      email: userInfo.email,
      city: userInfo.city,
      district: userInfo.district,
      detailedAddress: userInfo.detailedAddress,
    });
    if (userInfo.isDefault) {
      await axios.patch(`http://127.0.0.1:8080/userDetail/${response.data.id}/default`);
    }
    return navigate(PATHS.USERINFO);
  };
  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <div className="infouser-content">
          <div className="infouser-sidebar">
            <div className="infouser-avatar">
              <Avatar style={{ marginTop: "20px" }}></Avatar>
              <div className="margin-right">
                <UserInfor />
              </div>
            </div>
            <UserOder />
          </div>
          <div className="infouser-container">
            <h3 className="infouser-title">Hồ sơ của tôi</h3>
            <Divider></Divider>
            <form
              className="infouser-input"
              action=""
              onSubmit={handleSubmitForm}
            >
              <div className="productcheckout-grid">
                <div className="productcheckout-grid-input">
                  <span className="productcheckput-text">Họ và tên đệm:</span>
                  <Input.Wrapper style={{ marginRight: "8px" }}>
                    <Input
                      placeholder="Nguyễn"
                      value={userInfo.firstName}
                      onChange={(e) => {
                        setUserInfo((prevState) => {
                          let newState = { ...prevState };
                          newState.firstName = e.target.value;
                          return newState;
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
                      value={userInfo.lastName}
                      onChange={(e) => {
                        setUserInfo((prevState) => {
                          let newState = { ...prevState };
                          newState.lastName = e.target.value;
                          return newState;
                        });
                      }}
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="productcheckout-grid">
                <div className="productcheckout-grid-input">
                  <span className="productcheckput-text">Số điện thoại:</span>
                  <Input.Wrapper style={{ marginRight: "8px" }}>
                    <Input
                      placeholder="0xx xxx xxxx"
                      value={userInfo.phoneNumber}
                      onChange={(e) => {
                        setUserInfo((prevState) => {
                          let newState = { ...prevState };
                          newState.phoneNumber = e.target.value;
                          return newState;
                        });
                      }}
                    />
                  </Input.Wrapper>
                </div>
                <div className="productcheckout-grid-input">
                  <span className="productcheckput-text">Email:</span>
                  <Input.Wrapper style={{ marginLeft: "8px" }}>
                    <Input
                      placeholder="abc@gmail.com"
                      value={userInfo.email}
                      onChange={(e) => {
                        setUserInfo((prevState) => {
                          let newState = { ...prevState };
                          newState.email = e.target.value;
                          return newState;
                        });
                      }}
                    />
                  </Input.Wrapper>
                </div>
                <div className="productcheckout-grid-input">
                  <span className="productcheckput-text">Tỉnh, thành phố:</span>
                  <NativeSelect
                    style={{ marginRight: "8px" }}
                    placeholder="Chọn tỉnh, thành phố"
                    value={selectedProvince}
                    data={division.map((division): ComboboxItem => {
                      return {
                        value: division.name,
                        label: division.name,
                        disabled: false,
                      };
                    })}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      setUserInfo((prevState) => {
                        let newState = { ...prevState };
                        newState.city = e.target.value;
                        return newState;
                      });
                    }}
                  />
                </div>
                <div className="productcheckout-grid-input">
                  <span className="productcheckput-text">Quận, huyện:</span>
                  <NativeSelect
                    style={{ marginLeft: "8px" }}
                    placeholder="Native select"
                    value={selectedDistrict}
                    data={division
                      .find((division) => {
                        return division.name === selectedProvince;
                      })
                      ?.districts.map((e): ComboboxItem => {
                        if (!userInfo.district)
                          setUserInfo((prevState) => {
                            let newState = { ...prevState };
                            newState.district = e.name;
                            return newState;
                          });
                        return {
                          value: e.name,
                          label: e.name,
                          disabled: false,
                        };
                      })}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      setUserInfo((prevState) => {
                        let newState = { ...prevState };
                        newState.district = e.target.value;
                        return newState;
                      });
                    }}
                  />
                </div>
              </div>
              <div className="">
                <span className="productcheckput-text">Địa chỉ chi tiết:</span>
                <Flex
                  direction={"row"}
                  columnGap={"md"}
                  justify={"space-between"}
                  align={"center"}
                >
                  <Input.Wrapper style={{ flex: "1 1 80%" }}>
                    <Input
                      placeholder="Số nhà, tên đường, xã, phường, thị trấn,..."
                      value={userInfo.detailedAddress}
                      onChange={(e) => {
                        setUserInfo((prevState) => {
                          let newState = { ...prevState };
                          newState.detailedAddress = e.target.value;
                          return newState;
                        });
                      }}
                    />
                  </Input.Wrapper>
                  <Switch
                    label="Mặc định"
                    onChange={() => {
                      setUserInfo((prevState) => {
                        let newState = { ...prevState };
                        newState.isDefault = !userInfo.isDefault;
                        return newState;
                      });
                    }}
                  />
                </Flex>
              </div>
              <Divider my="sm" />
              <div className="productcheckout-button">
                <Btn fullWidth type="submit" maintine="a">
                  Lưu
                </Btn>
                <Btn fullWidth maintine="a" color="#f03a17" onClick={() => {
                  navigate('/Home/InfoUser')
                }}>
                  Hủy
                </Btn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewInfo;
