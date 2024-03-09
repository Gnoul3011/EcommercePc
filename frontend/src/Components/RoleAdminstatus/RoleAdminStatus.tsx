import React from "react";
import ButtonDelete from "../Button/button-delete";
import SeaparatorTable from "../Seaparator/SeaparatorTable";
import ButtonChangeRole from "../Button/button-change-role";
import { Switch } from "@mantine/core";

const RoleAdminStatus = () => {
  return (
    <tbody>
      <tr className="text-hover">
        <td className="sorting">ADMIN</td>
        <td className="sorting">Admin</td>
        <td className="sorting">For administration the web page</td>
        <td className="sorting">2023-04-02 13:44:39</td>
        <td className="sorting">
          <Switch size="md" onLabel="YES" offLabel="NO" />
        </td>

        <td className="table-action sorting">
          <ButtonChangeRole />
        </td>
      </tr>
      <SeaparatorTable />
    </tbody>
  );
};

export default RoleAdminStatus;
