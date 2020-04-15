import React, { useState } from "react";
import "App.css";
import SwiperSelect, { OptionType } from "SwiperSelect";
import { getSelectedOption } from "SwiperSelect/helpers";

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

const App = () => {
  const [options, setOptions] = useState<OptionType[]>(selectOptions);
  const [selectedValue, setSelectedValue] = useState<
    Pick<OptionType, "value">
  >();

  const onSubmit = (val: Pick<OptionType, "value">) => {
    setSelectedValue(val);

    const optionsUpdated = options.map(o => {
      o.selected = false;

      // @ts-ignore
      if (o.value === val) o.selected = true;
      return o;
    });
    setOptions(optionsUpdated);
  };

  return (
    <section className="App">
      <h1>
        {selectedValue
          ? `Selected value: ${selectedValue}`
          : `Default value: ${getSelectedOption(options).value}`}
      </h1>
      <br />
      <SwiperSelect options={options} onSubmit={onSubmit} />
    </section>
  );
};

export default App;
