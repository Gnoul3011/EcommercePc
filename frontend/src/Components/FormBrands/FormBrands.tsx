import { IconCheck, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { Button, ComboboxItem, Input, NativeSelect } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useCallback, useEffect, useState } from "react";
import { Category } from "../FormChange/FormChange";
import axios from "axios";

const FormBrands = (props: { onFinish: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState(-1);
  const [brandName, setBrandName] = useState("");
  const [errorHandle, setErrorHandle] = useState("");

  const fetchCategories = useCallback(async () => {
    const response = await axios.get(
      "http://127.0.0.1:8080/category/all/simple?active=false"
    );
    setCategories(response.data);
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  //Error handle
  const handleErrorInput = (e: string) => {
    if (!e) {
      setErrorHandle("Vui lòng nhập tên Brand muốn tạo");
    } else {
      setErrorHandle("");
    }
  };
  ////////////

  useEffect(() => {}, [errorHandle]);

  return (
    <div>
      <div className="modal-body">
        <NativeSelect
          style={{ width: "49%" }}
          label="Category"
          value={categoryId}
          data={
            categories
              ? categories.map((item): ComboboxItem => {
                  if (categoryId === -1) setCategoryId(+item.id);
                  return {
                    value: item.id,
                    label: item.name,
                    disabled: false,
                  };
                })
              : []
          }
          onChange={(event) => {
            setCategoryId(+event.target.value);
          }}
        />
        <Input.Wrapper className="mb-20" label="Brand Name" error={errorHandle}>
          <Input
            value={brandName}
            error={errorHandle}
            onChange={(e) => {
              handleErrorInput(e.target.value);
              setBrandName(e.target.value);
            }}
          />
        </Input.Wrapper>
      </div>
      <div className="modal-footer">
        <Button
          mt="md"
          onClick={async () => {
            await axios
              .post("http://127.0.0.1:8080/brand/create", {
                brandName,
                categoryId,
              })
              .then((req) => {
                notifications.show({
                  withCloseButton: true,
                  autoClose: 1500,
                  message: `Thêm thành công brand: ${brandName} `,
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
                  message: `Thêm không thành công brand`,
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
          Add Brand
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

export default FormBrands;
