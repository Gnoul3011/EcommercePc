import { Pagination } from "@mantine/core";
import React from "react";

const PagiProductAdmin = () => {
  return (
    <div className="pagination-product-admin">
      <div className="dataTables-info">Showing products 1 to 5 of 22</div>
      <Pagination total={5} />
    </div>
  );
};

export default PagiProductAdmin;
