import { Button, Input } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormChangeBrand = (props: { id: number }) => {
  const [brandName, setBrandName] = useState("");
  const navigate = useNavigate();
  const updateBrand = async () => {
    const data = { brandName: brandName };
    await axios
      .patch(`http://localhost:8080/brand/${props.id}/update`, data)
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
        <Input.Wrapper className="mb-20" label="Brand ID">
          <Input component="button" pointer>
            <Input.Placeholder placeholder=" AMD">{props.id}</Input.Placeholder>
          </Input>
        </Input.Wrapper>

        <Input.Wrapper className="mb-20" label="Brand Name">
          <Input
            placeholder="Brand name"
            onChange={(e) => {
              setBrandName(e.target.value);
            }}
          />
        </Input.Wrapper>
      </div>
      <div className="modal-footer">
        <Button
          mt="md"
          onClick={async () => {
            await updateBrand();
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

export default FormChangeBrand;
