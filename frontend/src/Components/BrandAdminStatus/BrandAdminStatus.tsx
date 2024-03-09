import React from "react";
import ButtonChangeBrand from "../Button/button-change-brand";
import ButtonDelete from "../Button/button-delete";
import SeaparatorTable from "../Seaparator/SeaparatorTable";

const BrandAdminStatus = (props: { id: number; name: string }) => {
  return (
    <tbody>
      <tr className="text-hover">
        <td className="sorting">{props.id}</td>
        <td className="sorting">{props.name}</td>
        <td className="table-action sorting">
          <ButtonChangeBrand id={props.id} />
          {/* <ButtonDelete /> */}
        </td>
      </tr>
      <SeaparatorTable />
    </tbody>
  );
};

export default BrandAdminStatus;
