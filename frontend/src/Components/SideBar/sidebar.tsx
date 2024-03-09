import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Constants/path";
import { Category } from "../FormChange/FormChange";

function SideBar() {
  const [sideBarCategory, setSideBarCategory] = useState<Category[]>([]);
  const navigate = useNavigate();
  const LinkToProductMore = (e: string) => {
    navigate(PATHS.MORE + `/${e}`);
  };

  useEffect(() => {
    console.log("get brands data from api");
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/category/allOfCategoryBrand"
        );
        setSideBarCategory(res.data);
      } catch (error) {
        console.log("error=> ", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      {sideBarCategory.map((e) => {
        return (
          <div
            className="category-item"
            onClick={() => {
              LinkToProductMore(e.name);
            }}
          >
            <img alt="" className="category-img" src="/img/laptop.png"></img>
            <span className="category-text">{e.name}</span>
          </div>
        );
      })}
    </>
  );
}

export default SideBar;
