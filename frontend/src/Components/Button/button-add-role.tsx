import { Button, MantineProvider } from "@mantine/core";
import { ModalsProvider, modals } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React from "react";
import FormRole from "../FormRole/FormRole";

const ButtonAddRole = () => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <Button
          onClick={() => {
            modals.open({
              size: "xl",
              title: "Add New Role ",
              children: (
                <>
                  <FormRole />
                </>
              ),
            });
          }}
        >
          Add new role
        </Button>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default ButtonAddRole;
