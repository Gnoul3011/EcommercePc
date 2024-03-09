import React from "react";
import { PATHS } from "../../Constants/path";
import { Link } from "react-router-dom";

const ChangePass = () => {
  return (
    <div className="change-pass-user">
      <Link
        className="change-pass-users"
        style={{ textDecoration: "none" }}
        to={PATHS.CHANGEPASSUSER}
      >
        Đổi mật khẩu
      </Link>
    </div>
  );
};

export default ChangePass;
