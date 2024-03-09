import { Button, MantineProvider } from "@mantine/core";
import { ModalsProvider, modals } from "@mantine/modals";
import React from "react";
import { Notifications } from "@mantine/notifications";
import FormWarrantyPeriod from "../FormWarrantyPeriod/FormWarrantyPeriod";

const ButtonAddWarrantyPeriod = (props: { onFinish: () => void }) => {
  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <Button
          onClick={() => {
            modals.open({
              size: "xl",
              title: "Add New Period",
              children: (
                <>
                  <FormWarrantyPeriod onFinish={props.onFinish} />
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

export default ButtonAddWarrantyPeriod;
