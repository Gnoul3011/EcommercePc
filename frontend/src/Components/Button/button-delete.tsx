import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";

interface Props {
  productLine?: string;
}

const ButtonDelete = (props: Props) => {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete ",
      centered: true,
      children: <Text size="sm">Do you want to delete ?</Text>,
      labels: { confirm: "Delete ", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await axios.delete(
          `http://127.0.0.1:8080/product/delete?productLine=${props.productLine}`
        );
      },
    });

  return <IconTrash onClick={openDeleteModal} />;
};

export default ButtonDelete;
