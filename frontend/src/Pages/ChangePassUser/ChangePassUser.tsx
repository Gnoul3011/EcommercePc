import React, { useState } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import { Avatar, Button, Divider, PasswordInput, Stack } from "@mantine/core";
import UserInfor from "../../Components/UserInfor/UserInfor";
import UserOder from "../../Components/UserOrder/UserOrder";
import ChangePass from "../../Components/ChangePass/ChangePass";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PATHS } from "../../Constants/path";
import { useAuthContext } from "../../Context/AuthContext";
import ChangeMail from "../../Components/ChangeMail/ChangePass";

const ChangePassUser = () => {
  const navigate = useNavigate();
  const [oldpassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authContext = useAuthContext();

  const changePassword = async () => {
    const data = {
      oldpassword,
      password,
      confirmPassword,
    };
    await axios
      .patch(`http://localhost:8080/user/changepassword`, data)
      .then((res) => {
        if (res.data.error) {
          alert("đổi mật khẩu không thành công " + res.data.error);
        } else {
          alert(`Đổi mật khẩu thành công`);
          console.log("lettgo", res.data);
        }
      });
    navigate(PATHS.LOGIN.INDEX);
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
          <h3 className="infouser-title mb-20">Thay đổi mật khẩu</h3>
          <Divider />
          <div className="change-pass-content">
            <PasswordInput
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              style={{ textAlign: "left", marginBottom: "15px" }}
              label="Mật khẩu cũ"
              placeholder="Nhập mật khẩu cũ"
            />
            <Stack>
              <PasswordInput
                style={{ textAlign: "left" }}
                label="Mật khẩu mới"
                defaultValue=".........."
                visible={visible}
                onVisibilityChange={toggle}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <PasswordInput
                style={{ textAlign: "left" }}
                label="Nhập lại mật khẩu mới"
                defaultValue=".........."
                visible={visible}
                onVisibilityChange={toggle}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Stack>
            <Button
              mt={"xl"}
              onClick={async () => {
                await changePassword();
                authContext.logout();
              }}
            >
              Thay đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassUser;
