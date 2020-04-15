import React, { useState } from "react";
import "App.css";
import SwiperSelect, { OptionType } from "SwiperSelect";
import { getSelectedOption } from "SwiperSelect/helpers";
import { SettingsType } from "SwiperSelect/constants";

const selectOptions: OptionType[] = [
  { value: "2121", text: "2121" },
  { value: "2122", text: "2122" },
  { value: "2123", text: "2123" },
  { value: "2125", text: "2125", selected: true },
  { value: "2126", text: "2126" },
  { value: "2127", text: "2127" },
  { value: "2128", text: "2128" },
  { value: "2129", text: "2129" },
  { value: "2130", text: "2130" },
  { value: "2131", text: "2131" },
  { value: "2132", text: "2132" },
  { value: "2133", text: "2133" },
  { value: "2134", text: "2134" },
  { value: "2135", text: "2135" },
  { value: "2136", text: "2136" },
];

const customSettings: SettingsType = {
  width: "50%",
  height: "50px",
  backgroundColor: "#BBB",
  fontColor: "#333",
  activeFontColor: "black",
  fontFamily: "Open Sans",
  fontSize: "18px",
  units: "€/Month",
};

const App = () => {
  const [options, setOptions] = useState<OptionType[]>(selectOptions);
  const [selectedValue1, setSelectedValue1] = useState<
    Pick<OptionType, "value">
  >();
  const [selectedValue2, setSelectedValue2] = useState<
    Pick<OptionType, "value">
  >();

  const updateOptions = (val: Pick<OptionType, "value">) => {
    const optionsUpdated = options.map(o => {
      o.selected = false;
      // @ts-ignore
      if (o.value === val) o.selected = true;
      return o;
    });
    setOptions(optionsUpdated);
  };

  const onSubmit1 = (val: Pick<OptionType, "value">) => {
    setSelectedValue1(val);
    updateOptions(val);
  };

  const onSubmit2 = (val: Pick<OptionType, "value">) => {
    setSelectedValue2(val);
    updateOptions(val);
  };

  return (
    <section className="App">
      <h2>Default-styled Select element</h2>
      <h2>
        {selectedValue1
          ? `Selected value 1: ${selectedValue1}`
          : `Default value 1: ${getSelectedOption(options).value}`}
      </h2>
      <SwiperSelect options={options} onSubmit={onSubmit1} />

      <div style={{ height: "100px" }} />

      <h2>Customly-styled Select element</h2>
      <h2>
        {selectedValue2
          ? `Selected value 2: ${selectedValue2}`
          : `Default value 2: ${getSelectedOption(options).value}`}
      </h2>
      <SwiperSelect
        options={options}
        onSubmit={onSubmit2}
        settings={customSettings}
      />
    </section>
  );
};

export default App;
