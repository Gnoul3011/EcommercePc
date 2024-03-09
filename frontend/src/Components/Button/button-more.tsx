import { Link } from "react-router-dom";
import Btn from "../../Components/Button";
import { PATHS } from "../../Constants/path";
function ButtonMore(props: { brandName?: string; categoryName: string }) {
  const url = props.brandName
    ? PATHS.MORE + `/${props.categoryName}/${props.brandName}`
    : PATHS.MORE + `/${props.categoryName}`;
  return (
    <>
      <Link to={url}>
        <Btn
          maintine="a"
          customStyle={{ margin: "16px 0", color: "black" }}
          color="#E5E7EB"
          type="button"
        >
          Xem thêm
        </Btn>
      </Link>
    </>
  );
}

export default ButtonMore;
