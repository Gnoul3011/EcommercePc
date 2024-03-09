import { Autocomplete } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import Btn from "../Button";
import { PATHS } from "../../Constants/path";
import { useState } from "react";

function InputSearch() {
  const [search, setSearch] = useState("")
  return (
    <div className="search">
      <Autocomplete
        className="input-size"
        size="sm"
        leftSection={<IconSearch className="icon-search" />}
        radius="md"
        placeholder="Search"
        value={search}
        onChange={setSearch}
        data={["MSI", "Macbook", "Asus", "Acer"]}
      />
      <Link to={PATHS.SEARCH + `/${search}`}>
        <Btn maintine="a">Tìm kiếm</Btn>
      </Link>
    </div>
  );
}

export default InputSearch;
