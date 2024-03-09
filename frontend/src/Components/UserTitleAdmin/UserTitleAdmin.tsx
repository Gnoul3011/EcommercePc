import React from "react";



const UserTitleAdmin = () => {
  return (
    <thead className="table-light">
      <tr>
        <th className="sorting">Customer</th>
        <th className="sorting" style={{ width: "250px" }}>
          Email
        </th>
        <th className="sorting">Role</th>
        <th className="sorting">Create Date</th>
        <th className="sorting">Status</th>
        <th className="sorting">Action</th>
      </tr>
    </thead>
     
  );
};

export default UserTitleAdmin;
