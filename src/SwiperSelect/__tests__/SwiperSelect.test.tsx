import React from "react";
import { shallow, mount } from "enzyme";
import SwiperSelect, { OptionType } from "SwiperSelect";
import SwipeToSelect from "SwiperSelect/SwipeToSelect";
import { EnableEdit, SubmitButton } from "SwiperSelect/componentsStyled";
import { SETTINGS } from "SwiperSelect/constants";

const options: OptionType[] = [
  { value: "2121", text: "2121" },
  { value: "2122", text: "2122", selected: false },
  { value: "2125", text: "2125", selected: true },
  { value: "2126", text: "2126", selected: true },
];

describe("Test EnableEdit button", () => {
  it("Test click event", () => {
    const mockCallBack = jest.fn();

    const button = mount(
      <EnableEdit settings={SETTINGS} onClick={mockCallBack} />,
    );

    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

describe("Test Submit button", () => {
  it("Test click event", () => {
    const mockCallBack = jest.fn();

    const button = mount(
      <SubmitButton type="submit" onClick={mockCallBack} settings={SETTINGS} />,
    );

    button.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});

describe("SwiperSelect", () => {
  it("should render correctly and match the snapshot", () => {
    const component = shallow(
      <SwiperSelect options={options} onSubmit={() => {}} />,
    );

    expect(component).toMatchSnapshot();
  });
});

describe("SwipeToSelect", () => {
  it("should render correctly and match the snapshot", () => {
    const component = shallow(
      <SwipeToSelect
        options={options}
        settings={SETTINGS}
        onSubmit={() => {}}
      />,
    );

    expect(component).toMatchSnapshot();
  });
});
