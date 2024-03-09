import React from "react";

const OrderTitleAdmin = () => {
  return (
    <thead className="table-light">
      <tr>
        <th style={{ width: "101px" }} className="sorting">
          Order ID
        </th>
        <th style={{ width: "200px" }} className="sorting">
          Date
        </th>
        <th className="sorting">Payment Status</th>
        <th className="sorting">Total</th>
        <th className="sorting">Order Status</th>
        <th className="sorting">Action</th>
      </tr>
    </thead>
  );
};

export default OrderTitleAdmin;
