import React, { useCallback, useEffect, useState } from "react";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import ButtonAddCategory from "../Components/Button/button-add-category";
import CategoryAdminStatus from "../Components/CategoryAdminStatus/CategoryAdminStatus";
import axios from "axios";

interface Category {
  id: string;
  name: string;
}

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    const response = await axios.get(
      "http://127.0.0.1:8080/category/all/simple?active=false"
    );
    setCategories(response.data);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, categories]);

  return (
    <div>
      <div className="header-content">
        <h4 className="page-title">Category</h4>
        <Breadcrumbs />
      </div>
      <div className="body-content">
        <div className="button-admin">
          <ButtonAddCategory onFinish={fetchCategories} />
        </div>
        <table className="table-centered">
          <thead className="table-light">
            <tr>
              <th className="sorting" style={{ width: "150px" }}>
                ID Category
              </th>
              <th className="sorting">Name Category</th>
              <th className="sorting" style={{ width: "150px" }}>
                Action
              </th>
            </tr>
          </thead>
          {categories.map((category) => (
            <CategoryAdminStatus
              key={category.id}
              id={category.id}
              name={category.name}
            />
          ))}
        </table>
      </div>
    </div>
  );
};

export default CategoriesAdmin;
