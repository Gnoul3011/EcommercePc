import { modals } from "@mantine/modals";
import { IconPencil } from "@tabler/icons-react";
import React from "react";
import FormChangeCategory from "../FormChangeCategory/FormChangeCategory";

const ButtonChangeCategory = (props: { id: string }) => {
  return (
    <IconPencil
      onClick={() => {
        modals.open({
          size: "xl",
          title: "Change Category's information",
          children: (
            <>
              <FormChangeCategory id={props.id} />
            </>
          ),
        });
      }}
      style={{ marginRight: "5px" }}
    />
  );
};

export default ButtonChangeCategory;
