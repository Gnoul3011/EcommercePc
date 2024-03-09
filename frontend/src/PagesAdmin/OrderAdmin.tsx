import {
  Input,
  MantineProvider,
  NativeSelect,
  Pagination,
  SegmentedControl,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import OrderAdminStatus from "../Components/OrderAdminStatus/OrderAdminStatus";
import OrderTitleAdmin from "../Components/OrderTitleAdmin/OrderTitleAdmin";
import { useDebounce } from "../Hooks/use-debounce";

export interface AdminOrder {
  id: number;
  username: string;
  status: string;
  total: number;
  createdAt: string;
}

const OrderAdmin = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [search, setSearch] = useState<string>("");
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [filteredAdminOrder, setFilteredAdminOrder] = useState<AdminOrder[]>(
    []
  );
  const fetchOrders = useCallback(async () => {
    const response = await axios.get("http://127.0.0.1:8080/order/getAllOrder");
    setOrders(response.data);
    setFilteredAdminOrder(response.data);
    setNumberOfPage(Math.ceil(response.data.length / infoPerPage));
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders()]);

  const [currentPage, setCurrentPage] = useState(1);
  const [infoPerPage, setInfoPerPage] = useState(5);
  const offset = (currentPage - 1) * infoPerPage;

  const onPageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const handleSearch = (search: string) => {
    if (!search) {
      setFilteredAdminOrder(orders);
      setNumberOfPage(Math.ceil(orders.length / infoPerPage));
      return;
    }
    const filtered = orders.filter((item) => item.id === +search);
    setFilteredAdminOrder(filtered);
    setNumberOfPage(Math.ceil(filtered.length / infoPerPage));
  };

  const handleSearchDebounce = useDebounce<string>(
    (value) => handleSearch(value),
    1000
  );

  const [currentFilter, setCurrentFilter] = useState("ALL");
  const onChangeFilter = (index: string) => {
    setCurrentFilter(index);
    if (index === "ALL") {
      setFilteredAdminOrder(orders);
      setNumberOfPage(Math.ceil(orders.length / infoPerPage));
    } else {
      const filteredOrders = orders.filter((e) => e.status === index);
      setFilteredAdminOrder(filteredOrders);
      setNumberOfPage(Math.ceil(filteredOrders.length / infoPerPage));
    }
    setCurrentPage(1);
  };

  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <div className="header-content">
          <h4 className="page-title">Orders</h4>
          <Breadcrumbs />
        </div>
        <div className="body-content">
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
                          Math.ceil(orders.length / Number.MAX_VALUE)
                        );
                      } else {
                        setInfoPerPage(+e.target.value);
                        setNumberOfPage(
                          Math.ceil(orders.length / +e.target.value)
                        );
                      }
                    }}
                  />
                  Order
                </label>
              </div>
              <SegmentedControl
                style={{ backgroundColor: "#fff" }}
                fullWidth
                color="blue"
                size="md"
                radius="lg"
                data={[
                  {
                    value: "ALL",
                    label: "Tất cả",
                  },
                  {
                    value: "PENDING",
                    label: "Đang xử lý",
                  },
                  {
                    value: "CONFIRMED",
                    label: "Đã xác nhận",
                  },
                  {
                    value: "DELIVERING",
                    label: "Đang giao",
                  },
                  {
                    value: "SUCCESS",
                    label: "Đã giao",
                  },
                  {
                    value: "CANCELED",
                    label: "Đã hủy",
                  },
                ]}
                value={currentFilter}
                onChange={onChangeFilter}
              />
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
              <OrderTitleAdmin />
              {filteredAdminOrder
                .slice(offset, offset + infoPerPage)
                .map((order) => (
                  <OrderAdminStatus key={order.id} order={order} />
                ))}
            </table>
            <div className="pagination-product-admin">
              <div className="dataTables-info">
                {`Showing products ${offset + 1} to ${
                  offset + infoPerPage > filteredAdminOrder!.length
                    ? filteredAdminOrder!.length
                    : offset + infoPerPage
                } of ${filteredAdminOrder?.length}`}
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

export default OrderAdmin;
