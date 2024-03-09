import React from "react";
import { TopProduct, TopUser } from "../../PagesAdmin/Dashboard";
import formatPrice from "../../Helper/formatPrice";

const TrustedCustomer = (props: { user: TopUser }) => {
  const { user } = props;
  return (
    <table style={{ margin: "30px 0 30px 0", width: "100%" }}>
      <tbody>
        <tr style={{ textAlign: "left" }}>
          <td>
            <h5 className="table-text" style={{ width: "400px" }}>
              {user.username}
            </h5>
          </td>
          <td style={{ width: "120px" }}>
            <h5 className="table-text">{formatPrice(user.total)}</h5>
            <span className="text-muted">Total Spent</span>
          </td>
          <td style={{ width: "100px" }}>
            <h5 className="table-text">{user.totalOrder}</h5>
            <span className="text-muted">Total order</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TrustedCustomer;
