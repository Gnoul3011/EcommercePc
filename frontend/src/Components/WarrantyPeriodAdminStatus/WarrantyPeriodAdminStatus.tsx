import { IconPencil } from "@tabler/icons-react";
import ButtonChangeWarrantyPeriod from "../Button/button-change-warranty-period";
import SeaparatorTable from "../Seaparator/SeaparatorTable";
import { modals } from "@mantine/modals";
import FormChangeWarrantyPeriod from "../FormChangeWarrantyPeriod/FormChangeWarrantyPeriod";

const WarrantyPeriodAdminStatus = (props: { id: string; months: number }) => {
  return (
    <tbody>
      <tr className="text-hover">
        <td className="sorting">{props.id}</td>
        <td className="sorting">{props.months} tháng</td>
        <td className="table-action sorting">
        <IconPencil
            onClick={() => {
              modals.open({
                size: "xl",
                title: "Change Warranty Period",
                children: (
                  <>
                    <FormChangeWarrantyPeriod id={props.id} months={props.months}/>
                  </>
                ),
              });
            }}
            style={{ marginRight: "5px" }}
          />
          {/* <ButtonDelete /> */}
        </td>
      </tr>
      <SeaparatorTable />
    </tbody>
  );
};

export default WarrantyPeriodAdminStatus;
