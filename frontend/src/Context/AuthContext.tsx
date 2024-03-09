
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";
import { error } from "console";
import * as jwt from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Auth {
  aud: string | null;
  mail: string | null;
  sub: string | null;
  iat: string | number | null;
  exp: string | number | null;
  isAuthenticated: boolean;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export type AuthContextType = {
  auth: Auth;
  login: (loginInfo: LoginInfo) => void;
  checkSession: (callback?: () => void) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type ChildrenProps = {
  children: JSX.Element;
};

type Role = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const AuthProvider = ({ children }: ChildrenProps) => {
  const [auth, setAuth] = useState<Auth>({
    aud: null,
    mail: null,
    sub: null,
    exp: null,
    iat: null,
    isAuthenticated: false,
  });

  const login = (loginInfo: LoginInfo) => {
    const data = { username: loginInfo.username, password: loginInfo.password };
    axios
      .post("http://localhost:8080/auth/authenticate", data)
      .then(async (response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data.token);
          let data = jwt.jwtDecode(response.data.token);

          const res = await axios.get("http://localhost:8080/user/getAccount");

          console.log(res);
          setAuth({
            aud: res.data.role ?? "USER",
            mail: res.data.email ?? "",
            sub: data.sub ?? "",
            iat: data.iat ?? "",
            exp: data.exp ?? "",
            isAuthenticated: true,
          });

          notifications.show({
            withCloseButton: true,
            autoClose: 2000,
            message: `Đăng nhập thành công`,
            color: "teal",
            icon: <IconCheck />,
            className: "my-notification-class",
            loading: false,
          });
        }
      })
      .catch((e) => {
        notifications.show({
          withCloseButton: true,
          autoClose: 2500,
          message: "Tài khoản hoặc mật khẩu không chính xác",
          color: "red",
          icon: <IconX />,
          className: "my-notification-class",
          loading: false,
        });
      });
  };
  const logout = async () => {
    localStorage.removeItem("accessToken");
    setAuth({
      aud: null,
      mail: null,
      sub: null,
      iat: null,
      exp: null,
      isAuthenticated: false,
    });
    notifications.show({
      withCloseButton: true,
      autoClose: 1500,
      message:
        "Tài khoản đã đăng xuất hoặc hết phiên đăng nhập, vui lòng đăng nhập lại",
      color: "red",
      icon: <IconX />,
      className: "my-notification-class",
      loading: false,
      onClose: () => {
        window.location.replace('/')
      }
    });
  };

  const checkSession = async (callback?: () => void) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      let data = jwt.jwtDecode(accessToken);
      if (data.exp && data.iat) if (Date.now() >= data.exp * 1000) logout();
      const res = await axios.get("http://localhost:8080/user/getAccount");
      setAuth({
        aud: res.data.role ?? "USER",
        mail: res.data.email ?? "",
        sub: data.sub ?? "",
        iat: data.iat ?? "",
        exp: data.exp ?? "",
        isAuthenticated: true,
      });
      if (callback && res.data.role === "USER") {
        callback();
      }
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, checkSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const object = useContext(AuthContext);
  if (!object) {
    throw new Error("useGetComplexObject must be used within a Provider");
  }
  return object;
};

export default AuthProvider;
function useCallBack(arg0: () => Promise<void>, arg1: never[]) {
  throw new Error("Function not implemented.");
}
