import { Button, PinInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { PATHS } from "../../Constants/path";

import { useMemo, useState } from "react";
function ForgotPasswordVerification() {
  const [pin, setPin] = useState("");

  const setOTP = async () => {
    localStorage.removeItem("otp");
    console.log(pin);
    await localStorage.setItem("otp", pin);
  };
  return (
    <>
      <form className="modal-form-signin" action="">
        <h2 className="text-signin">Nhập mã xác nhận</h2>
        <div className="form-signin">
          <div className="form-group ">
            <PinInput
              length={6}
              size="xl"
              placeholder="○"
              onChange={(e) => {
                setPin(e);
              }}
            ></PinInput>
          </div>

          <Link
            to={PATHS.LOGIN.CHANGE}
            style={{ textDecoration: "none" }}
            onClick={() => {
              setOTP();
            }}
          >
            <div className="form-group margin-bottom">
              <Button>Đổi mật khẩu</Button>
            </div>
          </Link>
        </div>
      </form>
    </>
  );
}

export default ForgotPasswordVerification;
