import { Pagination, isNumberLike } from "@mantine/core";

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import FilterSection from "../../Components/FilterSection/FilterSection";
import Product, { ProductItem } from "../../Components/Product";
import ProductListFollowCategory from "../../Components/Product/ProductListFollowCategory";
import formatPrice from "../../Helper/formatPrice";
import { ProductItems } from "../HomePage/Content";
import { useDebounce } from "../../Hooks/use-debounce";

type CategoryProductMore = {
  id: number;
  name: string;
  //products: ProductItems[];
  products: ProductItems[];
};

type BrandProductMore = {
  id: number;
  brandName: string;
  //products: ProductItems[];
  products: ProductItems[];
};

function ProductMore() {
  const { name, brandName } = useParams();
  const [category, setCategory] = useState<CategoryProductMore>();
  const [productMorefollowBrand, setProductMoreFollowBrand] =
    useState<BrandProductMore>();
  const [productMoreFollowBrandFilter, setProductMoreFollowBrandFilter] =
    useState<ProductItem[]>();
  const [numberOfPage, setNumberOfPage] = useState(0);

  useEffect(() => {
    const fetchProductsBrand = async () => {
      try {
        const url =
          name && brandName
            ? `http://localhost:8080/category/${name}/${brandName}`
            : `http://localhost:8080/category/${name}`;
        const res = await axios.get(url);
        setCategory(res.data);
        setProductMoreFollowBrandFilter(res.data.products);
        console.log("products more follow brand based on Category=> ", res);
        setProductMoreFollowBrand(res.data);
        setNumberOfPage(Math.ceil(res.data.products.length / infoPerPage));
      } catch (error) {
        console.log("error=> ", error);
      }
    };
    fetchProductsBrand();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const infoPerPage = 2;
  const offset = (currentPage - 1) * infoPerPage;

  //filter
  const [currentFilter, setCurrentFilter] = useState("1");
  const onChangeFilter = (index: string) => {
    setCurrentFilter(index);
    if (productMorefollowBrand)
      switch (index) {
        case "2": {
          setProductMoreFollowBrandFilter(
            productMorefollowBrand.products.sort(
              (a: ProductItem, b: ProductItem) => a.price - b.price
            )
          );
          setNumberOfPage(
            Math.ceil(productMorefollowBrand.products.length / infoPerPage)
          );
          break;
        }
        case "3": {
          setProductMoreFollowBrandFilter(
            productMorefollowBrand.products.sort(
              (a: ProductItem, b: ProductItem) => b.price - a.price
            )
          );
          setNumberOfPage(
            Math.ceil(productMorefollowBrand.products.length / infoPerPage)
          );
          break;
        }
        case "4": {
          setProductMoreFollowBrandFilter((prevState) => {
            return productMorefollowBrand.products.sort(
              (a: ProductItem, b: ProductItem) =>
                a.productName > b.productName ? 1 : -1
            );
          });
          setNumberOfPage(
            Math.ceil(productMorefollowBrand.products.length / infoPerPage)
          );
          break;
        }
        case "5": {
          setProductMoreFollowBrandFilter(() => {
            return productMorefollowBrand.products.sort(
              (a: ProductItem, b: ProductItem) =>
                a.productName > b.productName ? -1 : 1
            );
          });
          setNumberOfPage(
            Math.ceil(productMorefollowBrand.products.length / infoPerPage)
          );
          break;
        }
        default: {
          setProductMoreFollowBrandFilter(productMorefollowBrand.products);
          setNumberOfPage(
            Math.ceil(productMorefollowBrand.products.length / infoPerPage)
          );
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
    console.log(min, max);
    if (productMorefollowBrand) {
      if (min === Number.MAX_VALUE && max === Number.MIN_VALUE) {
        setProductMoreFollowBrandFilter(productMorefollowBrand?.products);
        setNumberOfPage(
          Math.ceil(productMorefollowBrand.products.length / infoPerPage)
        );
      } else {
        setProductMoreFollowBrandFilter(
          productMorefollowBrand.products.filter((item) => {
            return item.price >= min && item.price <= max;
          })
        );
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
        <div className="product">
          <div className="title">{brandName ? brandName : name}</div>

          {productMoreFollowBrandFilter && (
            <ProductListFollowCategory
              products={productMoreFollowBrandFilter.slice(
                offset,
                offset + infoPerPage
              )}
            />
          )}
        </div>
        <div className="pagination">
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

export default ProductMore;
