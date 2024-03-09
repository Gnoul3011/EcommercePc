import { SegmentedControl, SegmentedControlItem } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../../Pages/HomePage/Content";
import ProductListNoButtonMore from "../Product/ProductListNoButtonMore";

function TabProduct({ onChange }: any) {
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
  useEffect(() => {
    console.log("get category data from api");
    const fetchProducts = async () => {
      try {
        // const res = await axios.get(
        //   "http://localhost:8080/category/allOfCategory"
        // );
        const res = await axios.get(
          "http://localhost:8080/category/allOfCategoryBrand"
        );
        console.log("products category=> ", res);
        setFilteredCategory(res.data);
      } catch (error) {
        console.log("error=> ", error);
      }
    };
    fetchProducts();
  }, []);

  const dataFilterDefault = [{ label: "ALL", value: "ALL" }];
  const dataFilter = filteredCategory.map((e): SegmentedControlItem => {
    return {
      value: e.name,
      label: e.name,
    };
  });

  const [currentFilter, setCurrentFilter] = useState("ALL");

  const onChangeFilter = (index: string) => {
    setCurrentFilter(index);
  };

  return (
    <>
      <SegmentedControl
        style={{ background: "#FFF", marginTop: "20px" }}
        color="blue"
        size="lg"
        radius="md"
        defaultValue="ALL"
        data={[...dataFilterDefault, ...dataFilter]}
        onChange={(e) => {
          onChangeFilter(e);
          onChange(e);
        }}
      />

      {filteredCategory.map((e) => {
        if (e.name === currentFilter)
          return (
            <div key={e.id}>
              {/* <div className="title">{item.brandName}</div> */}
              <ProductListNoButtonMore
                brands={e.brands}
                category={currentFilter}
              />
            </div>
          );
        //if (e.name == "ALL") return null;
      })}
    </>
  );
}

export default TabProduct;
