import React from "react";

const ProductTitleAdmin = () => {
  return (
    <thead className="table-light">
      <tr>
        <th className="sorting" style={{ width: "360px" }}>
          Product
        </th>
        <th className="sorting">Category</th>
        <th className="sorting">Added Date</th>
        <th className="sorting">Price</th>
        <th className="sorting">Quantity</th>
        <th className="sorting">Status</th>
        <th className="sorting">Action</th>
      </tr>
    </thead>
  );
};

export default ProductTitleAdmin;
