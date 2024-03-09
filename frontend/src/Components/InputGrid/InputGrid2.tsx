import { Input } from "@mantine/core";

interface props {
  firstName: string,
  lastName: string
}

function InputGrid2(props: props) {
  return (
    <>
      <div className="productcheckout-grid">
        <div className="productcheckout-grid-input">
          <span className="productcheckput-text">Họ và tên đệm:</span>
          <Input.Wrapper style={{ marginRight: "8px" }}>
            <Input placeholder="Nguyễn" value={props.firstName}/>
          </Input.Wrapper>
        </div>
        <div className="productcheckout-grid-input">
          <span className="productcheckput-text">Tên:</span>
          <Input.Wrapper style={{ marginLeft: "8px" }}>
            <Input placeholder="Lương" value={props.lastName}/>
          </Input.Wrapper>
        </div>
      </div>
    </>
  );
}

export default InputGrid2;
