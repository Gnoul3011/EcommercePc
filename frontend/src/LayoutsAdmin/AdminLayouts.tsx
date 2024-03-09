import {
  AppShell,
  Avatar,
  Burger,
  Divider,
  Group,
  Menu,
  rem,
} from "@mantine/core";
import {
  IconCalendarTime,
  IconLogout,
  IconTimeDuration0,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  IconArchive,
  IconBrandNem,
  IconBriefcase,
  IconFlag,
  IconHome,
  IconTruckDelivery,
  IconUser,
} from "@tabler/icons-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import Seaparator from "../Components/Seaparator/Seaparator";
import AdminInfor from "../Components/AdminInfo/AdminInfo";
import { PATHS } from "../Constants/path";
import { IconArrowBarRight } from "@tabler/icons-react";

function AdminLayouts() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, setOpened] = useState(false);
  const authContext = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(authContext.auth);
  useEffect(() => {
    console.log("check-session");
    authContext.checkSession(() => {
      navigate(PATHS.HOME);
    });
  }, [location.key]);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Menu opened={opened} onChange={setOpened}>
            <Menu.Target>
              <div className="logo-user" style={{ marginRight: "50px" }}>
                <Avatar src="/img/Avatar.png" alt="it's me" />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection>Welcome!</Menu.Item>
              <AdminInfor />
              <Seaparator />
              <Link style={{ textDecoration: "none" }} to={"/"}>
                <Menu.Item
                  leftSection={
                    <IconHome
                      style={{
                        width: rem(14),
                        height: rem(14),
                      }}
                    />
                  }
                  rightSection={
                    <IconArrowBarRight
                      style={{
                        width: rem(14),
                        height: rem(14),
                      }}
                    />
                  }
                  style={{ fontSize: "16px" }}
                >
                  Đi tới trang chủ
                </Menu.Item>
              </Link>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Link to="/admin" className="logo" style={{ margin: "0 0 20px 30px" }}>
          <img src="/img/logoipsum-247.png" alt="" />
          <img src="/img/Techshop.png" alt="" />
        </Link>

        <Link to="/admin" className="admin-title">
          <IconHome />
          <span className="admin-text">Dashboard</span>
        </Link>
        <Seaparator />

        <Link to="/admin/product" className="admin-title">
          <IconBriefcase />
          <span className="admin-text">Product</span>
        </Link>
        <Link to="/admin/brands" className="admin-title">
          <IconBrandNem />
          <span className="admin-text">Brands</span>
        </Link>
        <Link to="/admin/category" className="admin-title">
          <IconArchive />
          <span className="admin-text">Categories</span>
        </Link>
        <Link to="/admin/warranty-periods" className="admin-title">
          <IconCalendarTime />
          <span className="admin-text">Warranty Periods</span>
        </Link>
        <Seaparator />
        <Link to="/admin/order" className="admin-title">
          <IconTruckDelivery />
          <span className="admin-text">Order</span>
        </Link>
        <Seaparator />
        <Link to="/admin/user" className="admin-title">
          <IconUser />
          <span className="admin-text">Users</span>
        </Link>
      </AppShell.Navbar>
      <AppShell.Main>
        <div className="container-fluid">
          <Outlet />
          <div className="container-footer">
            <Divider my="sm" />
            <div className="container-footer-text">
              <div className="container-footer-name">
                2023 © Techshop - Mystery V
              </div>
              <div>
                <span className="container-footer-contact">About</span>
                <span className="container-footer-contact">Support</span>
                <span className="container-footer-contact">Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminLayouts;
