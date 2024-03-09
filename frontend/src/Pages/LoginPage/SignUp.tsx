import { Button, Flex, Input, PasswordInput } from "@mantine/core";

import "@mantine/carousel/styles.css";
import { useState } from "react";
import axios from "axios";
import { IconChecklist, IconLoader, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Constants/path";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorHandleInputUsername, setErrorHandleInputUsername] = useState("");
  const [errorHandleInputPass, setErrorHandleInputPass] = useState("");
  const [errorHandleInputPassConfirm, setErrorHandleInputPassConfirm] =
    useState("");
  const [errorHandleInputMail, setErrorHandleInputMail] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const data = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
    email: email,
  };

  const handleCreateUser = async () => {
    try {
      notifications.show({
        withCloseButton: true,
        autoClose: 1500,
        message: "Vui lòng đợi",
        color: "teal",
        icon: <IconLoader />,
        className: "my-notification-class",
        loading: true,
      });
      const response = await axios.post(
        "http://127.0.0.1:8080/auth/register",
        data
      );
      setTimeout(() => {
        notifications.show({
          withCloseButton: true,
          autoClose: 1500,
          message: "Đăng kí thành công!",
          color: "green",
          icon: <IconChecklist />,
          className: "my-notification-class",
          loading: false,
          onClose: () => {
            notifications.clean();
            navigate(PATHS.LOGIN.INDEX);
          },
        });
      }, 1000);
    } catch (err: any) {
      notifications.clean();
      if (err.response.data.detail)
        notifications.show({
          withCloseButton: true,
          autoClose: 3000,
          message: err.response.data.detail,
          color: "red",
          icon: <IconX />,
          className: "my-notification-class",
          loading: false,
        });
      else {
        setErrors(
          Object.keys(err.response.data).map((key) => {
            return key + ": " + err.response.data[key];
          })
        );
      }
    }
  };

  const inputUsernameHandle = (e: string) => {
    if (!e) {
      setErrorHandleInputUsername("Vui lòng nhập Username");
    } else {
      setErrorHandleInputUsername("");
    }
  };

  const inputPassHandle = (e: string) => {
    if (!e) {
      setErrorHandleInputPass("Vui lòng nhập Password");
    } else {
      setErrorHandleInputPass("");
    }
  };

  const inputPassConfirmHandle = (e: string) => {
    if (!e) {
      setErrorHandleInputPassConfirm("Vui lòng nhập lại Password");
    } else {
      setErrorHandleInputPassConfirm("");
    }
  };

  const inputMailHandle = (e: string) => {
    if (!e) {
      setErrorHandleInputMail("Vui lòng nhập mail: ***@*mail.com");
    } else {
      setErrorHandleInputMail("");
    }
  };

  return (
    <>
      <form className="modal-form-signin" action="">
        <h2 className="text-signin">Đăng ký</h2>
        {errors.length > 0 && (
          <Flex direction={"column"} gap={"md"}>
            {errors.map((error) => (
              <div style={{ color: "red", width: "100%" }}>{error}</div>
            ))}
          </Flex>
        )}
        <div className="form-signin">
          <div className="form-group">
            <label className="form-text" htmlFor="">
              Username
            </label>
            <Input.Wrapper error={errorHandleInputUsername}>
              <Input
                error={errorHandleInputUsername}
                placeholder="nguyenvana"
                value={username}
                onChange={(e) => {
                  inputUsernameHandle(e.target.value);
                  setUsername(e.target.value);
                }}
              />
            </Input.Wrapper>
          </div>
          <div className="form-group">
            <label className="form-text" htmlFor="">
              Email
            </label>
            <Input.Wrapper error={errorHandleInputMail}>
              <Input
                error={errorHandleInputMail}
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => {
                  inputMailHandle(e.target.value);
                  setEmail(e.target.value);
                }}
              />
            </Input.Wrapper>
          </div>

          <div className="form-group">
            <label className="form-text " htmlFor="">
              Mật khẩu
            </label>
            <PasswordInput
              error={errorHandleInputPass}
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                inputPassHandle(e.target.value);
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-text " htmlFor="">
              Nhập lại mật khẩu
            </label>
            <PasswordInput
              error={errorHandleInputPassConfirm}
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => {
                inputPassConfirmHandle(e.target.value);
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <div className="form-group margin-bottom">
            <Button onClick={handleCreateUser}>Đăng ký</Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUp;
