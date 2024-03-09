import { Avatar, Menu } from "@mantine/core";
import { Button, Text, rem } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import Btn from "../Components/Button";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconLogout,
} from "@tabler/icons-react";
import InputSearch from "../Components/Input/input-search";
import { PATHS } from "../Constants/path";
import { useAuthContext } from "../Context/AuthContext";
import { useState } from "react";
import UserInfor from "../Components/UserInfor/UserInfor";
import UserOder from "../Components/UserOrder/UserOrder";
import Seaparator from "../Components/Seaparator/Seaparator";

const Header = () => {
  const [opened, setOpened] = useState(false);
  const authContext = useAuthContext();
  let url = useLocation();
  const slicedPath = url.pathname.split("/").slice(0, 2).join("/");

  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <Link to="/" className="logo">
            <img src="/img/logoipsum-247.png" alt="" />
            <img src="/img/Techshop.png" alt="" />
          </Link>

          {slicedPath === "/login" ? null : <InputSearch />}

          {!authContext.auth.isAuthenticated ? (
            slicedPath === "/login" ? null : (
              <Link to="/login">
                <Btn maintine="a">Đăng Nhập</Btn>
              </Link>
            )
          ) : (
            <div className="user-login">
              <Link to={PATHS.CART}>
                <div className="cart">
                  <button
                    title="cart-btn"
                    type="button"
                    className="button-cart"
                  >
                    <Avatar src="/img/Button.png" />
                  </button>
                </div>
              </Link>
              <Menu opened={opened} onChange={setOpened}>
                <Menu.Target>
                  <div className="logo-user">
                    <Avatar src="/img/Avatar.png" alt="it's me" />
                  </div>
                </Menu.Target>
                <Menu.Dropdown>
                  <UserInfor />
                  <Seaparator />
                  <UserOder />
                  <Seaparator />
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconLogout
                        style={{
                          width: rem(14),
                          height: rem(14),
                        }}
                      />
                    }
                    onClick={authContext.logout}
                  >
                    SignOut
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
