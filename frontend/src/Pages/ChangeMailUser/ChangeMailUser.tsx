import React, { useState } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import {
  Avatar,
  Button,
  Center,
  Divider,
  Input,
  PasswordInput,
  PinInput,
  Stack,
} from "@mantine/core";
import UserInfor from "../../Components/UserInfor/UserInfor";
import UserOder from "../../Components/UserOrder/UserOrder";
import ChangePass from "../../Components/ChangePass/ChangePass";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PATHS } from "../../Constants/path";
import { useAuthContext } from "../../Context/AuthContext";
import ChangeMail from "../../Components/ChangeMail/ChangePass";

const ChangeMailUser = () => {
  const navigate = useNavigate();
  const [oldEmail, setOldEmail] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const authContext = useAuthContext();

  const senOTP = async () => {
    const data = { email: oldEmail };
    await axios
      .patch("http://localhost:8080/mail/sendmail", data)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          console.log(res.data.email);
        }
      });
    // navigate(PATHS.LOGIN.FPVERIFI);
  };

  const changeMail = async () => {
    const data = {
      oldEmail,
      email,
      verificationCode,
    };
    await axios
      .patch(`http://localhost:8080/user/updatemail`, data)
      .then((res) => {
        if (res.data.error) {
          alert("đổi email không thành công " + res.data.error);
        } else {
          alert(`Đổi email thành công`);
          console.log("lettgo", res.data);
        }
      });
    navigate(PATHS.USERINFO);
  };

  const [visible, { toggle }] = useDisclosure(false);
  return (
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
          <ChangePass />
          <div style={{ marginTop: "15px" }}>
            <ChangeMail />
          </div>
        </div>
        <div className="infouser-container">
          <h3 className="infouser-title mb-20">Thay đổi mail</h3>
          <Divider />
          <div className="change-pass-content">
            <Input.Wrapper
              style={{ textAlign: "left" }}
              label="Mail cũ"
              error="Vui lòng nhập ***@*mail.com"
            >
              <Input
                placeholder="Nhập mail cũ"
                inputMode="email"
                onChange={(e) => {
                  setOldEmail(e.target.value);
                }}
              />
            </Input.Wrapper>
            <Button
              size="xs"
              onClick={() => {
                senOTP();
              }}
            >
              Gửi mã xác nhận
            </Button>
            <Input.Wrapper
              style={{ textAlign: "left" }}
              mt="md"
              label="Mail mới"
              error="Vui lòng nhập ***@*mail.com"
            >
              <Input
                placeholder="Nhập mail mới"
                inputMode="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Input.Wrapper>
            <Divider mt="md" />
            <Input.Wrapper mt="md" label="Mã xác nhận">
              <div className="pin-center">
                <PinInput
                  length={6}
                  mt="md"
                  onChange={(e) => {
                    setVerificationCode(e);
                  }}
                />
              </div>
            </Input.Wrapper>

            <Button
              mt={"xl"}
              onClick={async () => {
                await changeMail();
                authContext.logout();
              }}
            >
              Thay đổi mail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeMailUser;
