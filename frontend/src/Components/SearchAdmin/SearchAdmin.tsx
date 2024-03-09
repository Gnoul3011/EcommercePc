import { Input } from "@mantine/core";
import React from "react";

const SearchAdmin = () => {
  return (
    <div className="dataTables-filter">
      <label htmlFor="" className="form-lable">
        Search
        <Input style={{ marginLeft: "10px" }} />
      </label>
    </div>
  );
};

export default SearchAdmin;
