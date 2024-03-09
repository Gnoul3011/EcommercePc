import { Button } from "@mantine/core";
import { useAuthContext } from "../../Context/AuthContext";

function AdminInfor() {
  const authContext = useAuthContext();
  console.log('authContext.auth.sub', authContext.auth.sub)
  return (
    <>
      <div className="user-info">
        <div className="user-name">{authContext.auth.sub}</div>
        <span className="user-email">{authContext.auth.mail}</span>
      </div>
    </>
  );
}

export default AdminInfor;
