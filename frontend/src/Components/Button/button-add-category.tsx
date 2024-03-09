import { Button, MantineProvider } from "@mantine/core";
import { ModalsProvider, modals } from "@mantine/modals";
import React from "react";
import { Notifications } from "@mantine/notifications";
import FormCategory from "../FormCategory/FormCategory";

const ButtonAddCategory = (props: {onFinish: () => void}) => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <Button
          onClick={() => {
            modals.open({
              size: "xl",
              title: "Add New Category",
              children: (
                <>
                  <FormCategory onFinish={props.onFinish}/>
                </>
              ),
            });
          }}
        >
          Add category
        </Button>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default ButtonAddCategory;
