import { IconEye } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

import React from "react";
import FormView from "../FormView/FormView";


const ButtonView = () => {
  return (
    <IconEye
      onClick={() => {
        modals.open({
          size: "xl",
          title: "Product's Information",
          children: (
            <>
              {/* <FormView id={props.id}/> */}
            </>
          ),
        });
      }}
      style={{ marginRight: "5px" }}
    />
  );
};

export default ButtonView;
