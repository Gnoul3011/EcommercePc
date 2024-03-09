import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { Button, Input } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useState } from "react";
import axios from "axios";

const FormCategory = (props: { onFinish: () => void }) => {
  const [categoryName, setCategoryName] = useState("");
  const [errorHandle, setErrorHandle] = useState("");
  const handleErrorInput = (e: string) => {
    if (!e) {
      setErrorHandle("Vui lòng nhập tên category muốn tạo");
    } else {
      setErrorHandle("");
    }
  };
  return (
    <div>
      <div className="modal-body">
        <Input.Wrapper
          className="mb-20"
          label="Category Name"
          error={errorHandle}
        >
          <Input
            value={categoryName}
            error={errorHandle}
            onChange={(e) => {
              handleErrorInput(e.target.value);
              setCategoryName(e.target.value);
            }}
          />
        </Input.Wrapper>
      </div>
      <div className="modal-footer">
        <Button
          mt="md"
          onClick={async () => {
            await axios
              .post("http://127.0.0.1:8080/category/create", {
                categoryName,
              })
              .then((req) => {
                notifications.show({
                  withCloseButton: true,
                  autoClose: 1500,
                  message: `Thêm thành công category: ${categoryName} `,
                  color: "teal",
                  icon: <IconCheck />,
                  className: "my-notification-class",
                  loading: false,
                });
              })
              .catch((e) => {
                notifications.show({
                  withCloseButton: true,
                  autoClose: 1500,
                  message: `Thêm không thành công category`,
                  color: "red",
                  icon: <IconX />,
                  className: "my-notification-class",
                  loading: false,
                });
              });

            props.onFinish();
            modals.closeAll();
          }}
        >
          Add Category
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

export default FormCategory;
