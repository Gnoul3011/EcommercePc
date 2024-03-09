import { Button, Input, NativeSelect, PasswordInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "../../PagesAdmin/UserAdmin";

const FormChangeUser = (props: { username: string }) => {
  const [user, setUser] = useState<User>();
  const [password, setPassword] = useState<string>("");

  const fetchUser = useCallback(async () => {
    const response = await axios.get(
      `http://127.0.0.1:8080/user/${props.username}`
    );
    setUser(response.data);
  }, [props.username]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  let data = ({
    username: user?.username,
    password: password,
    email: user?.email,
    role: user?.role,
  });

  const handleUpdateUser = async () => {
    const response = await axios.patch(
      `http://127.0.0.1:8080/user/update-info`,
      data
    );
    console.log(response);
  };

  return (
    <div>
      <div className="modal-body">
        <div className="input-2">
          <Input.Wrapper
            style={{ width: "49%" }}
            className="mb-20"
            label="Username"
          >
            <Input
              placeholder="abc@gmail.com"
              value={user?.username}
              disabled
            />
          </Input.Wrapper>
        </div>
        <div className="input-2">
          <Input.Wrapper
            style={{ width: "49%" }}
            className="mb-20"
            label="Email"
          >
            <Input
              placeholder="abc@gmail.com"
              value={user?.email}
              onChange={(e) => {
                setUser((prevState) => {
                  if (prevState) {
                    let newState = { ...prevState };
                    newState.email = e.target.value;
                    return newState;
                  }
                  return prevState;
                });
              }}
            />
          </Input.Wrapper>
          <PasswordInput
            style={{ width: "49%" }}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <NativeSelect
          style={{ width: "49%" }}
          label="Role"
          value={user?.role}
          onChange={(e) => {
            setUser((prevState) => {
              if (prevState) {
                let newState = { ...prevState };
                newState.role = e.target.value;
                return newState;
              }
              return prevState;
            });
          }}
          data={[
            { value: "ADMIN", label: "Quản trị viên" },
            { value: "USER", label: "Người dùng" },
            { value: "MANAGER", label: "Nhân viên" },
          ]}
        />
      </div>
      <div className="modal-footer">
        <Button
          mt="md"
          onClick={() => {
            handleUpdateUser();
            notifications.show({
              withCloseButton: true,
              autoClose: 1500,
              message: "Cập nhật thông tin tài khoản thành công",
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

export default FormChangeUser;
