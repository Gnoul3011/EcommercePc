import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

function NoProduct() {
  return (
    <>
      <div className="container">
        <Breadcrumbs />
        <div className="productodered">
          <img src="/img/Cartillustartion.png" alt="" />
          <div className="productodered-content">
            <span className="productodered-title">Giỏ hàng của bạn trống</span>
            <span className="productodered-text">
              Có vẻ bạn chưa thêm mặt hàng nào vào giỏ
            </span>
          </div>
          <Link to="/">
            <Button>Tiếp tục mua sản phẩm</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NoProduct;
