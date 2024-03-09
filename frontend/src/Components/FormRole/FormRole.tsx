import { IconCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { Button, Input } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import Seaparator from "../Seaparator/Seaparator";
const FormRole = () => {
  return (
    <div>
      <div className="modal-body">
        <div className="input-2">
          <Input.Wrapper style={{ width: "49%" }} className="mb-20" label="ID">
            <Input />
          </Input.Wrapper>
          <Input.Wrapper
            style={{ width: "49%" }}
            className="mb-20"
            label="Name"
          >
            <Input />
          </Input.Wrapper>
        </div>
        <Input.Wrapper className="mb-20" label="Description">
          <Input />
        </Input.Wrapper>
        <Seaparator />
      </div>
      <div className="modal-footer">
        <Button
          mt="md"
          onClick={() => {
            notifications.show({
              withCloseButton: true,
              autoClose: 1500,
              message: "Thêm role thành công",
              color: "teal",
              icon: <IconCheck />,
              className: "my-notification-class",
              loading: false,
            });
            modals.closeAll();
          }}
        >
          Add Role
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

export default FormRole;
