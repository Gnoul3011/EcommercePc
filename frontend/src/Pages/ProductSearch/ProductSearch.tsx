import { Pagination } from "@mantine/core";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import ProductSearchs from "../../Components/Product/ProductSearch";
import { useCallback, useEffect, useState } from "react";
import { ProductItem } from "../../Components/Product";
import axios from "axios";
import FilterSection from "../../Components/FilterSection/FilterSection";
import { useDebounce } from "../../Hooks/use-debounce";

function ProductSearch() {
  const { search } = useParams();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const fetchProducts = useCallback(async () => {
    if (search) {
      let data = JSON.stringify({
        search: "%" + search.split(" ").join("%") + "%",
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8080/product/search",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      setProducts(response.data);
      setFilteredProducts(response.data);
      setNumberOfPage(Math.ceil(response.data.length / infoPerPage));
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const infoPerPage = 2;
  const offset = (currentPage - 1) * infoPerPage;
  const [numberOfPage, setNumberOfPage] = useState(0);

  //filter
  const [currentFilter, setCurrentFilter] = useState("1");
  const onChangeFilter = (index: string) => {
    setCurrentFilter(index);
    if (products)
      switch (index) {
        case "2": {
          setFilteredProducts(
            products.sort((a: ProductItem, b: ProductItem) => a.price - b.price)
          );
          setNumberOfPage(Math.ceil(products.length / infoPerPage));
          break;
        }
        case "3": {
          setFilteredProducts(
            products.sort((a: ProductItem, b: ProductItem) => b.price - a.price)
          );
          setNumberOfPage(Math.ceil(products.length / infoPerPage));
          break;
        }
        case "4": {
          setFilteredProducts((prevState) => {
            return products.sort((a: ProductItem, b: ProductItem) =>
              a.productName > b.productName ? 1 : -1
            );
          });
          setNumberOfPage(Math.ceil(products.length / infoPerPage));
          break;
        }
        case "5": {
          setFilteredProducts(() => {
            return products.sort((a: ProductItem, b: ProductItem) =>
              a.productName > b.productName ? -1 : 1
            );
          });
          setNumberOfPage(Math.ceil(products.length / infoPerPage));
          break;
        }
        default: {
          setFilteredProducts(products);
          setNumberOfPage(Math.ceil(products.length / infoPerPage));
        }
      }
    setCurrentPage(1);
  };

  const onPageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const numberOfPageComboBox = (e: ProductItem[]) => {
    if (e.length) setNumberOfPage(Math.ceil(e.length / infoPerPage));
  };
  const valueLabelFormat = useDebounce<number[]>(
    (value) => priceFilter(value[0], value[1]),
    1000
  );

  const priceFilter = (min: number, max: number) => {
    if (products.length > 0) {
      if (min === Number.MAX_VALUE && max === Number.MIN_VALUE) {
        setFilteredProducts(products);
        setNumberOfPage(Math.ceil(products.length / infoPerPage));
      } else {
        const filtered = products.filter((item) => {
          return item.price >= min && item.price <= max;
        });
        setFilteredProducts(filtered);
        setNumberOfPage(Math.ceil(filtered.length / infoPerPage));
      }
    }
  };

  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <FilterSection
          onChangePrice={priceFilter}
          onChange={onChangeFilter}
          onChangFilterSlide={valueLabelFormat}
          onChangeNumberOfPage={numberOfPageComboBox}
        />
        {filteredProducts.length === 0 &&  <p>Không có sản phẩm nào</p>}
        {filteredProducts &&
          filteredProducts
            .slice(offset, offset + infoPerPage)
            .map((product) => <ProductSearchs key={product.id} product={product} />)}
        <div className="pagination-center">
          <Pagination
            total={numberOfPage}
            defaultValue={1}
            value={currentPage}
            onChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
}

export default ProductSearch;
