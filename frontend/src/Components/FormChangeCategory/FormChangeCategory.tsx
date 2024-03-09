import { Button, Input } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Constants/path";

const FormChangeCategory = (props: { id: string }) => {
  const [nameCategory, setNameCategory] = useState("");
  const navigate = useNavigate();
  const updateCategory = async () => {
    const data = { nameCategory: nameCategory };
    await axios
      .patch(`http://localhost:8080/category/${props.id}/update`, data)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          //alert(`OTP đã được gửi đến mail: ${email}`);
          console.log(res.data);
        }
      });
    notifications.show({
      withCloseButton: true,
      autoClose: 1500,
      message: "Cập nhật category thành công",
      color: "teal",
      icon: <IconCheck />,
      className: "my-notification-class",
      loading: false,
    });
    navigate("/admin/category");
  };

  return (
    <div>
      <div className="modal-body">
        <Input.Wrapper className="mb-20" label="Category ID">
          <Input component="button" pointer>
            <Input.Placeholder>{props.id}</Input.Placeholder>
          </Input>
        </Input.Wrapper>
        <Input.Wrapper className="mb-20" label="Brand Name">
          <Input
            placeholder="Laptop"
            onChange={(e) => {
              setNameCategory(e.target.value);
            }}
          />
        </Input.Wrapper>
      </div>
      <div className="modal-footer">
        <Button
          mt="md"
          onClick={async () => {
            await updateCategory();
            modals.closeAll();
          }}
        >
          Save and change
        </Button>
        <Button
          style={{ backgroundColor: "#eef2f7", color: "black" }}
          onClick={() => {
            modals.closeAll();
          }}
          mt="md"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default FormChangeCategory;
