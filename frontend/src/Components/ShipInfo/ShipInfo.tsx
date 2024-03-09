import { OrderInformation } from "../../Pages/InfoOrder/InfoOrder";

interface Props {
  orderInformation: OrderInformation | undefined;
}

function ShipInfo(props: Props) {
  return (
    <>
      <div className="infoorder-ship-information">
        <h2 className="infoorder-text ">Họ và Tên: {props.orderInformation?.fullname}</h2>
        <p className="infoorder-text">Email: {props.orderInformation?.email}</p>
        <p className="infoorder-text">Số điện thoại: {props.orderInformation?.phoneNumber}</p>
        <p className="infoorder-text ">Địa chỉ: {props.orderInformation?.address}</p>
        <p className="infoorder-text ">Ghi chú: {props.orderInformation?.note}</p>
      </div>
    </>
  );
}

export default ShipInfo;
