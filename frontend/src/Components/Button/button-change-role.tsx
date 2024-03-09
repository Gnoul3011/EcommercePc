import { modals } from "@mantine/modals";
import React from "react";
import FormChangeRole from "../FormChangeRole/FormChangeRole";
import { IconPencil } from "@tabler/icons-react";

const ButtonChangeRole = () => {
  return (
    <IconPencil
      onClick={() => {
        modals.open({
          size: "xl",
          title: "Change Role information",
          children: (
            <>
              <FormChangeRole />
            </>
          ),
        });
      }}
      style={{ marginRight: "5px" }}
    />
  );
};

export default ButtonChangeRole;
