import { Input, NativeSelect, Pagination, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import PagiProductAdmin from "../Components/PaginationProductAdmin/PagiProductAdmin";
import ProductAdminStatus from "../Components/ProductAdminStatus/ProductAdminStatus";
import ProductTitleAdmin from "../Components/ProductTitleAdmin/ProductTitleAdmin";
import LengthProduct from "../Components/LengthProduct/LengthProduct";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import ButtonAddAdmin from "../Components/Button/button-add-product-admin";
import SearchAdmin from "../Components/SearchAdmin/SearchAdmin";
import axios from "axios";
import { useDebounce } from "../Hooks/use-debounce";

export interface AdminProductInformation {
  id: number;
  productLine: string;
  productName: string;
  price: number;
  discount: number;
  thumbnailUri: string;
  stock: number;
  categoryName: string;
  brandName: string;
  deletedAt: string;
  createdAt: string;
}

const ProductAdmin = () => {
  const [products, setProducts] = useState<AdminProductInformation[]>([]);
  const [newProduct, setNewProduct] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [filteredAdminProductInformation, setFilteredAdminProductInformation] =
    useState<AdminProductInformation[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/product/all");
        setProducts(response.data);
        setFilteredAdminProductInformation(response.data);
        setNumberOfPage(Math.ceil(response.data.length / infoPerPage));
      } catch {}
    };
    fetchProducts();
  }, [newProduct, products]);

  const [currentPage, setCurrentPage] = useState(1);
  const [infoPerPage, setInfoPerPage] = useState(5);
  const offset = (currentPage - 1) * infoPerPage;

  const onPageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const handleSearch = (search: string) => {
    if (search.trim().length !== 0) {
      const filtered = products.filter((item) =>
        item.productName
          .toLocaleUpperCase()
          .includes(search.toLocaleUpperCase())
      );
      setFilteredAdminProductInformation(filtered);
      setNumberOfPage(Math.ceil(filtered.length / infoPerPage));
    } else {
      setFilteredAdminProductInformation(products);
      setNumberOfPage(Math.ceil(products.length / infoPerPage));
    }
  };

  const handleSearchDebounce = useDebounce<string>(
    (value) => handleSearch(value),
    1000
  );

  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <div className="header-content">
          <h4 className="page-title">Products</h4>
          <Breadcrumbs />
        </div>
        <div className="body-content">
          <div className="button-admin">
            <ButtonAddAdmin setNewProduct={setNewProduct} />
          </div>
          <div className="product-datatable-wrapper">
            <div className="product-datatable-sort">
              <div className="dataTables-length">
                <label htmlFor="" className="form-lable">
                  Display
                  <NativeSelect
                    style={{ width: "100px", margin: "0 10px" }}
                    data={["5", "10", "20", "All"]}
                    defaultValue={infoPerPage}
                    onChange={(e) => {
                      if (e.target.value === "All") {
                        setInfoPerPage(Number.MAX_VALUE);
                        setNumberOfPage(
                          Math.ceil(products.length / Number.MAX_VALUE)
                        );
                      } else {
                        setInfoPerPage(+e.target.value);
                        setNumberOfPage(
                          Math.ceil(products.length / +e.target.value)
                        );
                      }
                    }}
                  />
                  Product
                </label>
              </div>
              <div className="dataTables-filter">
                <label htmlFor="" className="form-lable">
                  Search
                  <Input
                    style={{ marginLeft: "10px" }}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      handleSearchDebounce(e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>
            <table className="table-centered">
              <ProductTitleAdmin />
              {filteredAdminProductInformation &&
                filteredAdminProductInformation
                  .slice(offset, offset + infoPerPage)
                  .map((product) => {
                    return <ProductAdminStatus product={product} />;
                  })}
            </table>
            <div className="pagination-product-admin">
              <div className="dataTables-info">
                {`Showing products ${offset + 1} to ${
                  offset + infoPerPage > filteredAdminProductInformation!.length
                    ? filteredAdminProductInformation!.length
                    : offset + infoPerPage
                } of ${filteredAdminProductInformation?.length}`}
              </div>
              <Pagination
                total={numberOfPage}
                defaultValue={1}
                value={currentPage}
                onChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default ProductAdmin;
