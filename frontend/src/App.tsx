import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { PATHS } from "./Constants/path";
import OderUser from "./Pages/OrderUser/OrderUser";

import MainLayout from "./Layouts/Index";
import AdminLayouts from "./LayoutsAdmin/AdminLayouts";
import ChangeMailUser from "./Pages/ChangeMailUser/ChangeMailUser";
import ChangePassUser from "./Pages/ChangePassUser/ChangePassUser";
import Home from "./Pages/HomePage";
import InfoOrder from "./Pages/InfoOrder/InfoOrder";
import AddNewInfo from "./Pages/InfoUser/AddNewInfo";
import InfoUser from "./Pages/InfoUser/InfoUser";
import LoginPage from "./Pages/LoginPage";
import ChangePassword from "./Pages/LoginPage/ChangePassword";
import ForgotPassword from "./Pages/LoginPage/ForgotPassword";
import ForgotPasswordVerification from "./Pages/LoginPage/ForgotPasswordVerification";
import SignIn from "./Pages/LoginPage/SignIn";
import SignUp from "./Pages/LoginPage/SignUp";
import ProductCart from "./Pages/ProductCart/ProductCart";
import ProductCheckout from "./Pages/ProductCheckout/ProductCheckout";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import ProductMore from "./Pages/ProductMore/ProductMore";
import ProductOdered from "./Pages/ProductOdered/ProductOdered";
import ProductSearch from "./Pages/ProductSearch/ProductSearch";
import BrandAdmin from "./PagesAdmin/BrandAdmin";
import CategoriesAdmin from "./PagesAdmin/CategoriesAdmin";
import Dashborad from "./PagesAdmin/Dashboard";
import OrderAdmin from "./PagesAdmin/OrderAdmin";
import ProductAdmin from "./PagesAdmin/ProductAdmin";
import UserAdmin from "./PagesAdmin/UserAdmin";
import WarrantyPeriodsAdmin from "./PagesAdmin/WarrantyPeriods";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path={PATHS.LOGIN.INDEX} element={<LoginPage />}>
              <Route index element={<SignIn />} />
              <Route path={PATHS.LOGIN.SIGNUP} element={<SignUp />} />
              <Route
                path={PATHS.LOGIN.FPASSWORD}
                element={<ForgotPassword />}
              />
              <Route
                path={PATHS.LOGIN.FPVERIFI}
                element={<ForgotPasswordVerification />}
              ></Route>
              <Route
                path={PATHS.LOGIN.CHANGE}
                element={<ChangePassword />}
              ></Route>
            </Route>
            <Route path="/Home" element={<Home />} />
            <Route
              path={PATHS.MORE + "/:name/:brandName"}
              element={<ProductMore />}
            />
            <Route path={PATHS.MORE + "/:name"} element={<ProductMore />} />
            <Route
              path={PATHS.PRODUCT + "/:productLine"}
              element={<ProductDetail />}
            />

            <Route path={PATHS.CART} element={<ProductCart />} />
            <Route path={PATHS.PAYMENT} element={<ProductCheckout />} />
            <Route
              path={PATHS.SEARCH + "/:search"}
              element={<ProductSearch />}
            />
            <Route path={PATHS.ORDERED} element={<ProductOdered />} />
            <Route path={PATHS.ORDER} element={<OderUser />} />
            <Route path={PATHS.USERINFO} element={<InfoUser />} />
            <Route path={PATHS.ADDUSERINFO} element={<AddNewInfo />} />
            <Route
              path={PATHS.INFORDER + "/:orderId"}
              element={<InfoOrder />}
            />
            <Route path={PATHS.CHANGEPASSUSER} element={<ChangePassUser />} />
            <Route path={PATHS.CHANGEMAILUSER} element={<ChangeMailUser />} />
          </Route>
          <Route path="/admin" element={<AdminLayouts />}>
            <Route index element={<Dashborad />} />
            <Route path="/admin/product" element={<ProductAdmin />} />
            <Route path="/admin/brands" element={<BrandAdmin />} />
            <Route path="/admin/category" element={<CategoriesAdmin />} />
            <Route path="/admin/order" element={<OrderAdmin />} />
            <Route path="/admin/user" element={<UserAdmin />} />
            <Route
              path="/admin/warranty-periods"
              element={<WarrantyPeriodsAdmin />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
