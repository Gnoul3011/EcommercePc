import { Checkbox, NativeSelect } from "@mantine/core";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";

function FilterSection({
  onChange,
  onChangFilterSlide,
  onChangePrice,
  onChangeNumberOfPage,
}: any) {
  const [checkedCheckbox, setCheckedCheckbox] = useState<
    (EventTarget & HTMLInputElement)[]
  >([]);
  const [priceRange, setPriceRange] = useState([Number.MAX_VALUE, 0]);
  useEffect(() => {
    const range = {
      min: Number.MAX_VALUE,
      max: Number.MIN_VALUE,
    };
    if (checkedCheckbox)
      checkedCheckbox.forEach((checkbox) => {
        const checkboxRange = checkbox.value
          .split(",")
          .map((item: string): number => +item);
        if (range.min > checkboxRange[0]) range.min = checkboxRange[0];
        if (range.max < checkboxRange[1]) range.max = checkboxRange[1];
      });
    setPriceRange((prevState) => {
      if (prevState) {
        let newState = [...prevState];
        newState[0] = range.min;
        newState[1] = range.max;
        return newState;
      }
      return prevState;
    });
  }, [checkedCheckbox]);

  useEffect(() => {
    onChangePrice(priceRange[0], priceRange[1]);
  }, [priceRange]);
  return (
    <>
      <div className="filter-section">
        <div className="filter-product">
          <div className="filter-price">
            <Slider
              onChange={onChangFilterSlide}
              //onChangeNumberOfPage={onChangeNumberOfPage}
            />
          </div>
          <div className="filter-options">
            <label className="filter-text" htmlFor="">
              Filter:
            </label>
            <div className="filter-select">
              <NativeSelect
                placeholder="Chọn giá trị bạn muốn loc"
                data={[
                  {
                    label: "Sản phẩm nổi bật",
                    value: "1",
                  },
                  {
                    label: "Giá: Tăng dần",
                    value: "2",
                  },
                  {
                    label: "Giá: Giảm dần",
                    value: "3",
                  },
                  {
                    label: "Tên: A-Z",
                    value: "4",
                  },
                  {
                    label: "Tên: Z-A",
                    value: "5",
                  },
                ]}
                defaultValue={"1"}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="filter-selection">
          <h4 className="filter-selection-text">Giá:</h4>
          <div className="filter-checkbox">
            <Checkbox
              className="m10"
              label="100.000đ - 500.000đ"
              value={["100000", "500000"]}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedCheckbox([...checkedCheckbox, e.target]);
                  onChangeNumberOfPage(e);
                } else {
                  setCheckedCheckbox([
                    ...checkedCheckbox.filter((item) => item !== e.target),
                  ]);
                }
              }}
            />
            <Checkbox
              className="m10"
              label="500.000đ - 2.000.000đ"
              value={["500000", "2000000"]}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedCheckbox([...checkedCheckbox, e.target]);
                  onChangeNumberOfPage(e);
                } else {
                  setCheckedCheckbox([
                    ...checkedCheckbox.filter((item) => item !== e.target),
                  ]);
                }
              }}
            />
            <Checkbox
              className="m10"
              label="2.000.000đ - 10.000.000đ"
              value={["2000000", "10000000"]}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedCheckbox([...checkedCheckbox, e.target]);
                  onChangeNumberOfPage(e);
                } else {
                  setCheckedCheckbox([
                    ...checkedCheckbox.filter((item) => item !== e.target),
                  ]);
                }
              }}
            />
            <Checkbox
              className="m10"
              label="10.000.000đ - 20.000.000đ"
              value={["10000000", "20000000"]}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedCheckbox([...checkedCheckbox, e.target]);
                  onChangeNumberOfPage(e);
                } else {
                  setCheckedCheckbox([
                    ...checkedCheckbox.filter((item) => item !== e.target),
                  ]);
                }
              }}
            />
            <Checkbox
              className="m10"
              label="20.000.000đ - 50.000.000đ"
              value={["20000000", "50000000"]}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedCheckbox([...checkedCheckbox, e.target]);
                  onChangeNumberOfPage(e);
                } else {
                  setCheckedCheckbox([
                    ...checkedCheckbox.filter((item) => item !== e.target),
                  ]);
                }
              }}
            />
            <Checkbox
              className="m10"
              label="50.000.000đ - 75.000.000đ"
              value={["50000000", "75000000"]}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedCheckbox([...checkedCheckbox, e.target]);
                  onChangeNumberOfPage(e);
                } else {
                  setCheckedCheckbox([
                    ...checkedCheckbox.filter((item) => item !== e.target),
                  ]);
                }
              }}
            />
            <Checkbox
              className="m10"
              label="75.000.000đ - 100.000.000đ"
              value={["75000000", "100000000"]}
              onChange={(e) => {
                if (e.target.checked) {
                  setCheckedCheckbox([...checkedCheckbox, e.target]);
                  onChangeNumberOfPage(e);
                } else {
                  setCheckedCheckbox([
                    ...checkedCheckbox.filter((item) => item !== e.target),
                  ]);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSection;
