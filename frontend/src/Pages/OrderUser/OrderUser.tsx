import { Avatar, Pagination, SegmentedControl } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import OderUserStatus from "../../Components/OrderUserStatus/OderUserStatus";
import UserInfor from "../../Components/UserInfor/UserInfor";
import UserOder from "../../Components/UserOrder/UserOrder";
import ChangePass from "../../Components/ChangePass/ChangePass";
import ChangeMail from "../../Components/ChangeMail/ChangePass";

export type AccountOrders = {
  id: number;
  username: string;
  status: string;
  total: number;
  createdAt: string;
};

function OderUser() {
  const [accountOrder, setAccountOrder] = useState<AccountOrders[]>([]);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [filteredAccountOrder, setFilteredAccountOrder] = useState<
    AccountOrders[]
  >([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/order/getOrder`);
        setAccountOrder(res.data);
        setFilteredAccountOrder(res.data);
        setNumberOfPage(Math.ceil(res.data.length / infoPerPage));
      } catch (error) {}
    };
    fetchOrders();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const infoPerPage = 2;
  const offset = (currentPage - 1) * infoPerPage;

  //Filter
  const [currentFilter, setCurrentFilter] = useState("ALL");
  const onChangeFilter = (index: string) => {
    setCurrentFilter(index);
    if (index === "ALL") {
      setFilteredAccountOrder(accountOrder);
      setNumberOfPage(Math.ceil(accountOrder.length / infoPerPage));
    } else {
      const filteredOrders = accountOrder.filter((e) => e.status === index);
      setFilteredAccountOrder(filteredOrders);
      setNumberOfPage(Math.ceil(filteredOrders.length / infoPerPage));
    }
    setCurrentPage(1);
  };

  const onPageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const displayInfo = filteredAccountOrder
    .slice(offset, offset + infoPerPage)
    .map((e) => {
      return (
        <div key={e.id}>
          <OderUserStatus
            key={e.id}
            username={e.username}
            total={e.total}
            id={e.id}
            createdAt={e.createdAt}
            status={e.status}
          />
        </div>
      );
    });

  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <div className="infouser-content">
          <div className="infouser-sidebar">
            <div className="infouser-avatar">
              <Avatar style={{ marginTop: "20px" }}></Avatar>
              <div className="margin-right">
                <UserInfor />
              </div>
            </div>
            <UserOder />
            <ChangePass />
            <div style={{ marginTop: "15px" }}>
              <ChangeMail />
            </div>
          </div>

          <div className="orderuser-container">
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

            <div className="orderuser-status">
              {displayInfo}
              <Pagination
                className="pagination-center"
                style={{ marginBottom: "-20px", marginTop: "30px" }}
                total={numberOfPage}
                defaultValue={1}
                value={currentPage}
                onChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OderUser;
