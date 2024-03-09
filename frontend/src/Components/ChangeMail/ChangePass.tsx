import React from "react";
import { PATHS } from "../../Constants/path";
import { Link } from "react-router-dom";

const ChangeMail = () => {
  return (
    <div className="change-pass-user">
      <Link
        className="change-pass-users"
        style={{ textDecoration: "none" }}
        to={PATHS.CHANGEMAILUSER}
      >
        Đổi mail
      </Link>
    </div>
  );
};

export default ChangeMail;
