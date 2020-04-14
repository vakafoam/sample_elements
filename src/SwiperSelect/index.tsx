import React, { useState, useEffect } from "react";

import SwipeToSelect from "./SwipeToSelect";
import {
  EnableEdit,
  SelectedState,
  SelectedValue,
  ValueUnits,
} from "./componentsStyled";
import { getFinalSettings, getSelectedOption } from "./helpers";

export interface SettingsType {
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontColor?: string;
  activeFontColor?: string;
  fontFamily?: string;
  fontSize?: string;
  units?: string;
}

// interface SettingsPropsType {
//   settings: SettingsType;
// }

export interface OptionType {
  value: string | number;
  text?: string | number;
  selected?: boolean;
}

export interface PropsType {
  options: OptionType[];
  settings?: SettingsType;
  onSubmit: (v: Pick<OptionType, "value">) => void;
}

const SwiperSelect = ({ options, settings, onSubmit }: PropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const finalSettings = getFinalSettings(settings);

  useEffect(() => {
    const selected = getSelectedOption(options);
    setSelectedOption(selected);
  }, [options]);

  const onSubmitValue = (val: Pick<OptionType, "value">) => {
    setEditMode(false);
    onSubmit(val);
  };

  return editMode ? (
    <SwipeToSelect
      options={options}
      settings={finalSettings}
      onSubmit={onSubmitValue}
    />
  ) : (
    <SelectedState settings={finalSettings}>
      <SelectedValue settings={finalSettings}>
        {selectedOption && selectedOption.text}
        <ValueUnits settings={finalSettings}>{finalSettings.units}</ValueUnits>
      </SelectedValue>

      <EnableEdit onClick={() => setEditMode(true)} settings={finalSettings}>
        Edit
      </EnableEdit>
    </SelectedState>
  );
};

export default SwiperSelect;
