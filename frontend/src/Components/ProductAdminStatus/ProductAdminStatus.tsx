import { modals } from "@mantine/modals";
import { IconEye, IconPencil, IconPlus } from "@tabler/icons-react";
import formatPrice from "../../Helper/formatPrice";
import { AdminProductInformation } from "../../PagesAdmin/ProductAdmin";
import ButtonDelete from "../Button/button-delete";
import FormChange from "../FormChange/FormChange";
import FormView from "../FormView/FormView";
import SeaparatorTable from "../Seaparator/SeaparatorTable";
import { Switch } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import FormProductWarranty from "../FormProductWarranty/FormProductWarranty";

interface Props {
  product: AdminProductInformation;
}

const ProductAdminStatus = (props: Props) => {
  const { product } = props;

  const [checked, setChecked] = useState(product.deletedAt === null);

  const handleUnlockProduct = async () => {
    const response = await axios.patch(
      `http://127.0.0.1:8080/product/undo-delete?productLine=${product.productLine}`
    );
  };

  const handleLockProduct = async () => {
    const response = await axios.delete(
      `http://127.0.0.1:8080/product/delete?productLine=${product.productLine}`
    );
  };
  return (
    <tbody>
      <tr>
        <td className="dtr-control pd-20">
          <img
            style={{
              width: "48px",
              height: "48px",
              marginRight: "10px",
            }}
            src={`http://127.0.0.1:8080/product/get-file?filePath=${product.thumbnailUri}`}
            alt=""
          />
          <p className="text-product-admin">{product.productName}</p>
        </td>
        <td className="pd-20 text-left  ">{product.categoryName}</td>
        <td className="pd-20 text-left">{product.createdAt}</td>
        <td className="pd-20 text-left  ">{formatPrice(product.price)}</td>
        <td className="pd-20 text-left  ">{product.stock}</td>
        <td className="pd-20 text-left  ">
          <Switch
            size="lg"
            onLabel="Active"
            offLabel="Locked"
            checked={checked}
            onChange={(e) => {
              setChecked(e.currentTarget.checked);
              if (e.currentTarget.checked === true) {
                handleUnlockProduct();
              } else {
                handleLockProduct();
              }
            }}
          />
        </td>
        <td className="table-action pd-20 text-left">
          <IconEye
            onClick={() => {
              modals.open({
                size: "xl",
                title: "Product's Information",
                children: (
                  <>
                    <FormView productLine={product.productLine} />
                  </>
                ),
              });
            }}
            style={{ marginRight: "5px" }}
          />
          <IconPencil
            onClick={() => {
              modals.open({
                size: "xl",
                title: "Product's Information",
                children: (
                  <>
                    <FormChange productLine={product.productLine} />
                  </>
                ),
              });
            }}
            style={{ marginRight: "5px" }}
          />
          <IconPlus
            onClick={() => {
              modals.open({
                size: "xl",
                title: "Add new product",
                children: (
                  <>
                    <FormProductWarranty
                      productId={props.product.id}
                      productLine={props.product.productLine}
                    />
                  </>
                ),
              });
            }}
          />
        </td>
      </tr>

      <SeaparatorTable />
    </tbody>
  );
};

export default ProductAdminStatus;
