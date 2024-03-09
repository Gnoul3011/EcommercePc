import { modals } from "@mantine/modals";
import { IconPencil } from "@tabler/icons-react";
import FormChangeWarrantyPeriod from "../FormChangeWarrantyPeriod/FormChangeWarrantyPeriod";

const ButtonChangeWarrantyPeriod = (props: { id: string, months: number }) => {
  return (
    <IconPencil
      onClick={() => {
        modals.open({
          size: "xl",
          title: "Change WarrantyPeriod's information",
          children: (
            <>
              <FormChangeWarrantyPeriod id={props.id}  months={props.months}/>
            </>
          ),
        });
      }}
      style={{ marginRight: "5px" }}
    />
  );
};

export default ButtonChangeWarrantyPeriod;
