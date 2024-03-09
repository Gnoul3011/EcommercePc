import { Select } from "@mantine/core";
import React from "react";

const LengthProduct = () => {
  return (
    <div className="dataTables-length">
      <label htmlFor="" className="form-lable">
        Display
        <Select
          withCheckIcon={false}
          style={{ width: "100px", margin: "0 10px" }}
          data={["5", "10", "20", "All"]}
        />
        Product
      </label>
    </div>
  );
};

export default LengthProduct;
