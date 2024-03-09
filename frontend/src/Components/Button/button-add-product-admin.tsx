import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import FromProduct from "../FormProduct/FormProduct";

const ButtonAddAdmin = (props: {setNewProduct: (productLine: string) => void}) => {
  return (
    <div>
      <Button
        onClick={() => {
          modals.open({
            size: "xl",
            title: "Add new product",
            children: (
              <>
                <FromProduct setNewProduct={props.setNewProduct}/>
              </>
            ),
          });
        }}
      >
        Add product
      </Button>
    </div>
  );
};

export default ButtonAddAdmin;
