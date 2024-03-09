import { Button, Input } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Constants/path";

const FormChangeWarrantyPeriod = (props: { id: string, months: number }) => {
  const [warrantyMonths, setWarrantyMonths] = useState(props.months);
  const navigate = useNavigate();
  const updateWarrantyPeriod = async () => {
    const data = { months: warrantyMonths };
    await axios
      .patch(`http://localhost:8080/warranty-period/${props.id}/update`, data)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          console.log(res.data);
        }
      });
    notifications.show({
      withCloseButton: true,
      autoClose: 1500,
      message: "Cập nhật waranty period thành công",
      color: "teal",
      icon: <IconCheck />,
      className: "my-notification-class",
      loading: false,
    });
    navigate("/admin/warranty-periods");
  };

  return (
    <div>
      <div className="modal-body">
        <Input.Wrapper className="mb-20" label="Warranty period ID">
          <Input component="button" pointer>
            <Input.Placeholder>{props.id}</Input.Placeholder>
          </Input>
        </Input.Wrapper>
        <Input.Wrapper className="mb-20" label="Month">
          <Input
            value={warrantyMonths}
            onChange={(e) => {
              setWarrantyMonths(+e.target.value);
            }}
          />
        </Input.Wrapper>
      </div>
      <div className="modal-footer">
        <Button
          mt="md"
          onClick={async () => {
            await updateWarrantyPeriod();
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

export default FormChangeWarrantyPeriod;
