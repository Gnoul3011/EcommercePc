import { rem } from "@mantine/core";
import { IconArrowBarRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

function UserInfor() {
  const authContext = useAuthContext();
  return (
    <>
      <div className="user-info">
        <div className="user-name">{authContext.auth.sub}</div>
        <span className="user-email">{authContext.auth.mail}</span>
        {authContext.auth.aud === "ADMIN" ? (
          <Link
            style={{
              textDecoration: "none",
              margin: "10px -10px 0 -10px",
            }}
            to={"/admin"}
          >
            Đi tới trang admin
            <IconArrowBarRight
              style={{
                width: rem(14),
                height: rem(14),
              }}
            />
          </Link>
        ) : null}
      </div>
    </>
  );
}

export default UserInfor;
