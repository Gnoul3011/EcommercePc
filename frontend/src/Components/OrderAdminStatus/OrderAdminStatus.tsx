import React from "react";
import SeaparatorTable from "../Seaparator/SeaparatorTable";
import ButtonChangeOrder from "../Button/button-change-order";
import { AdminOrder } from "../../PagesAdmin/OrderAdmin";
import formatPrice from "../../Helper/formatPrice";
import { Button } from "@mantine/core";

const OrderAdminStatus = (props: { order: AdminOrder }) => {
  const { order } = props;

  let badgeColor = "dark";
  switch (order.status) {
    case "PENDING":
      badgeColor = "yellow";
      break;
    case "CONFIRMED":
      badgeColor = "lime";
      break;
    case "DELIVERING":
      badgeColor = "blue";
      break;
    case "SUCCESS":
      badgeColor = "teal";
      break;
    case "CANCELED":
      badgeColor = "red";
      break;
    default:
      badgeColor = "dark";
  }

  return (
    <tbody>
      <tr>
        <td className="pd-20 text-left">#{order.id}</td>
        <td className="pd-20 text-left">{order.createdAt}</td>
        <td className="pd-20 text-left">{order.username}</td>
        <td className="pd-20 text-left">{formatPrice(order.total)}</td>
        <td className="pd-20 text-left">
          <Button style={{cursor: "default"}} color={badgeColor}>{order.status}</Button>
        </td>
        <td className="table-action pd-20 text-left">
          <ButtonChangeOrder orderId={order.id} />
        </td>
      </tr>

      <SeaparatorTable />
    </tbody>
  );
};

export default OrderAdminStatus;
