import { Input, MantineProvider, NativeSelect, Pagination } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import ButtonAddUsers from "../Components/Button/button-add-users";
import LengthProduct from "../Components/LengthProduct/LengthProduct";
import PagiProductAdmin from "../Components/PaginationProductAdmin/PagiProductAdmin";
import SearchAdmin from "../Components/SearchAdmin/SearchAdmin";
import UserAdminStatus from "../Components/UserAdminStatus/UserAdminStatus";
import UserTitleAdmin from "../Components/UserTitleAdmin/UserTitleAdmin";
import { useDebounce } from "../Hooks/use-debounce";

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  deletedAt: string;
}

const UserAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [filteredUser, setFilteredUser] = useState<User[]>([]);
  const fetchUsers = useCallback(async () => {
    const response = await axios.get(
      "http://127.0.0.1:8080/user/all?active=false"
    );
    setUsers(response.data);
    setFilteredUser(response.data);
    setNumberOfPage(Math.ceil(response.data.length / infoPerPage));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [currentPage, setCurrentPage] = useState(1);
  const [infoPerPage, setInfoPerPage] = useState(5);
  const offset = (currentPage - 1) * infoPerPage;

  const onPageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  const handleSearch = (search: string) => {
    if (search.trim().length !== 0) {
      const filtered = users.filter((item) =>
        item.username.toLocaleUpperCase().includes(search.toLocaleUpperCase())
      );
      setFilteredUser(filtered);
      setNumberOfPage(Math.ceil(filtered.length / infoPerPage));
    } else {
      setFilteredUser(users);
      setNumberOfPage(Math.ceil(users.length / infoPerPage));
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
          <h4 className="page-title">Account</h4>
          <Breadcrumbs />
        </div>
        <div className="body-content">
          <div className="button-admin">
            <ButtonAddUsers />
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
                          Math.ceil(users.length / Number.MAX_VALUE)
                        );
                      } else {
                        setInfoPerPage(+e.target.value);
                        setNumberOfPage(
                          Math.ceil(users.length / +e.target.value)
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
              <UserTitleAdmin />
              {filteredUser.slice(offset, offset + infoPerPage).map((user) => (
                <UserAdminStatus user={user} />
              ))}
            </table>
            <div className="pagination-product-admin">
              <div className="dataTables-info">
                {`Showing products ${offset + 1} to ${
                  offset + infoPerPage > filteredUser!.length
                    ? filteredUser!.length
                    : offset + infoPerPage
                } of ${filteredUser?.length}`}
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

export default UserAdmin;
