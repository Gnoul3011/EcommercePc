import React, { useState } from "react";
import ButtonDelete from "../Button/button-delete";
import SeaparatorTable from "../Seaparator/SeaparatorTable";
import ButtonChangeUser from "../Button/button-change-user";
import { User } from "../../PagesAdmin/UserAdmin";
import { Switch } from "@mantine/core";
import axios from "axios";

const UserAdminStatus = (props: { user: User }) => {
  const { user } = props;
  const [checked, setChecked] = useState(user.deletedAt === null);

  const handleUnlockUser = async () => {
    const response = await axios.patch(
      `http://127.0.0.1:8080/user/${user.id}/active`
    );
  };

  const handleLockUser = async () => {
    const response = await axios.delete(
      `http://127.0.0.1:8080/user/delete?id=${user.id}`
    );
  };

  return (
    <tbody>
      <tr>
        <td className="pd-20 text-left  ">{user.username}</td>
        <td className="pd-20 text-left">{user.email}</td>
        <td className="pd-20 text-left  ">{user.role}</td>
        <td className="pd-20 text-left  ">
          {new Date(user.createdAt).toLocaleDateString()}
        </td>
        <td className="pd-20 text-left  ">
          <Switch
            size="lg"
            onLabel="Active"
            offLabel="Locked"
            checked={checked}
            onChange={(e) => {
              setChecked(e.currentTarget.checked);
              if (e.currentTarget.checked === true) {
                handleUnlockUser();
              } else {
                handleLockUser();
              }
            }}
          />
        </td>
        <td className="table-action pd-20 text-left">
          <ButtonChangeUser username={user.username} />
        </td>
      </tr>
      <SeaparatorTable />
    </tbody>
  );
};

export default UserAdminStatus;
