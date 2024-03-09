import { Link } from "react-router-dom";
import { PATHS } from "../../Constants/path";
function UserOder() {
  return (
    <div className="user-info">
      <Link
        to={PATHS.ORDER}
        style={{ textDecoration: "none" }}
        className="user-order"
      >
        Đơn hàng
      </Link>
      <Link
        className="user-info-name"
        to={PATHS.USERINFO}
        style={{ textDecoration: "none" }}
      >
        Thông tin cá nhân
      </Link>
    </div>
  );
}

export default UserOder;
