import {
  getFinalSettings,
  getSelectedOption,
  findSelectedItemIndex,
} from "SwiperSelect/helpers";
import { OptionType } from "SwiperSelect";
import { SettingsType } from "SwiperSelect/constants";

const options1: OptionType[] = [
  { value: "2121", text: "2121" },
  { value: "2122", text: "2122", selected: false },
  { value: "2125", text: "2125", selected: true },
  { value: "2126", text: "2126", selected: true },
];

const options2: OptionType[] = [
  { value: "2121", text: "2121" },
  { value: "2122", text: "2122" },
  { value: "2125", text: "2125", selected: false },
  { value: "2126", text: "2126" },
];

const customSettings: Partial<SettingsType> = {
  backgroundColor: "#AAA",
  fontColor: "white",
};

describe("getFinalSettings function", () => {
  it("should prioritize custom settings to override defaults", () => {
    const settings = getFinalSettings(customSettings);
    expect(settings.backgroundColor).toEqual("#AAA");
    expect(settings.fontColor).toEqual("white");
  });

  it("should maintain defaults when a particular setting is not provided customly", () => {
    const settings = getFinalSettings(customSettings);
    expect(settings.units).toEqual("€/Month");
    expect(settings.width).toEqual("80%");
  });
});

describe("getSelectedOption function", () => {
  it("should return the first object that has a selected property", () => {
    const selected = getSelectedOption(options1);
    expect(selected).toEqual({ value: "2125", text: "2125", selected: true });
  });

  it("should return the first array item when no selected field provided", () => {
    const selected = getSelectedOption(options2);
    expect(selected).toEqual({ value: "2121", text: "2121" });
  });
});

describe("findSelectedItemIndex function", () => {
  it("should return the first object index that has a selected property", () => {
    const selected = findSelectedItemIndex(options1);
    expect(selected).toEqual(2);
  });

  it("should return 0 when no selected field provided", () => {
    const selected = findSelectedItemIndex(options2);
    expect(selected).toEqual(0);
  });
});
