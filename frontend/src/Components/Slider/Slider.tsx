import { RangeSlider } from "@mantine/core";

function Slider({ onChange }: any) {
  function valueLabelFormat(value: number) {
    let scaledValue = value;
    let stringValue = scaledValue.toLocaleString("vi-VN");

    return `${stringValue}  ${"VND"}`;
  }
  return (
    <>
      <RangeSlider
        mt={50}
        step={500000}
        min={0}
        max={100000000}
        labelAlwaysOn
        defaultValue={[0, 100000000]}
        label={valueLabelFormat}
        onChange={onChange}
      />
    </>
  );
}

export default Slider;
