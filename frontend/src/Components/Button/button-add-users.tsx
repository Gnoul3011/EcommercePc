import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import FormUserAdmin from "../FormUserAdmin/FormUserAdmin";

const ButtonAddUsers = () => {
  return (
    <div>
      <Button
        onClick={() => {
          modals.open({
            size: "xl",
            title: "Add new user",
            children: (
              <>
                <FormUserAdmin />
              </>
            ),
          });
        }}
      >
        Add users
      </Button>
    </div>
  );
};

export default ButtonAddUsers;
