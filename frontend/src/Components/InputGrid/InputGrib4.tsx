import { NativeSelect, Input, ComboboxItem } from "@mantine/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { UserInformation } from "../../Pages/InfoUser/InfoUser";

type Districts = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
};

export type Division = {
  code: number;
  name: string;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: Districts[];
};

interface props {
  provinceCode: string;
  districtCode: string;
  phoneNumber: string;
  setUserInfo: Function;
  userInfo: UserInformation | undefined;
  isEditing: boolean;
}

function InputGrib4(props: props) {
  const [division, setDivision] = useState<Division[]>([]);
  const [selectedProvince, setSelectedProvince] = useState(props.provinceCode);
  const [selectedDistrict, setSelectedDistrict] = useState(props.districtCode);
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
  useEffect(() => {
    setSelectedDistrict(props.districtCode);
    setSelectedProvince(props.provinceCode);
  }, [props]);
  return (
    <>
      <div className="productcheckout-grid">
        <div className="productcheckout-grid-input">
          <span className="productcheckput-text">Số điện thoại:</span>
          <Input.Wrapper style={{ marginRight: "8px" }}>
            <Input
              placeholder="0xx xxx xxxx"
              value={props.phoneNumber}
              disabled={props.isEditing ? false : true}
              onChange={(e) => {
                if (props.userInfo && props.isEditing)
                  props.setUserInfo({
                    accountDetail: {
                      ...props.userInfo.accountDetail,
                      phoneNumber: e.target.value,
                    },
                    username: props.userInfo.username,
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
              value={props.userInfo?.accountDetail.email}
              disabled={props.isEditing ? false : true}
              onChange={(e) => {
                if (props.userInfo && props.isEditing)
                  props.setUserInfo({
                    accountDetail: {
                      ...props.userInfo.accountDetail,
                      email: e.target.value,
                    },
                    username: props.userInfo.username,
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
            disabled={props.isEditing ? false : true}
            data={division.map((division): ComboboxItem => {
              return {
                value: division.name,
                label: division.name,
                disabled: false,
              };
            })}
            onChange={(e) => {
              if (props.userInfo && props.isEditing) {
                setSelectedProvince(e.target.value);
                props.setUserInfo({
                  accountDetail: {
                    ...props.userInfo.accountDetail,
                    city: e.target.value,
                  },
                  username: props.userInfo.username,
                });
              }
            }}
          />
        </div>
        <div className="productcheckout-grid-input">
          <span className="productcheckput-text">Quận, huyện:</span>
          <NativeSelect
            style={{ marginLeft: "8px" }}
            placeholder="Native select"
            value={selectedDistrict}
            disabled={props.isEditing ? false : true}
            data={division
              .find((division) => {
                return division.name === selectedProvince;
              })
              ?.districts.map((e): ComboboxItem => {
                return {
                  value: e.name,
                  label: e.name,
                  disabled: false,
                };
              })}
            onChange={(e) => {
              if (props.userInfo && props.isEditing) {
                setSelectedDistrict(e.target.value);
                props.setUserInfo({
                  accountDetail: {
                    ...props.userInfo.accountDetail,
                    district: e.target.value,
                  },
                  username: props.userInfo.username,
                });
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

export default InputGrib4;
