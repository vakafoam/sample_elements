import React, { useState, useEffect } from "react";
import { SettingsType } from "SwiperSelect/constants";

import SwipeToSelect from "SwiperSelect/SwipeToSelect";
import {
  EnableEdit,
  SelectedState,
  SelectedValue,
  ValueUnits,
} from "SwiperSelect/componentsStyled";
import { getFinalSettings, getSelectedOption } from "SwiperSelect/helpers";

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
