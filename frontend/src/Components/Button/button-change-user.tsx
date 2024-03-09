import { modals } from "@mantine/modals";
import { IconPencil } from "@tabler/icons-react";
import React from "react";
import FormChangeUser from "../FormChangeUser/FormChangeUser";

const ButtonChangeUser = (props: { username: string }) => {
  return (
    <IconPencil
      onClick={() => {
        modals.open({
          size: "xl",
          title: "Change user's information",
          children: (
            <>
              <FormChangeUser username={props.username}/>
            </>
          ),
        });
      }}
      style={{ marginRight: "5px" }}
    />
  );
};

export default ButtonChangeUser;
