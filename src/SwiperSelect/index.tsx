import React, { useState, useEffect } from "react";
import styled from "../style/styled-components";
import SwipeToSelect from "./SwipeToSelect.jsx";

import { getFinalSettings, getSelectedOption } from "./helpers";

export interface SettingsType {
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontColor?: string;
  fontFamily?: string;
  fontSize?: string;
  units?: string;
}

interface SettingsPropsType {
  settings: SettingsType;
}

const SelectedState = styled.div<{ settings: SettingsType }>`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  width: ${({ settings }) => settings.width};
  height: ${({ settings }) => settings.height};
  background: ${({ settings }) => settings.backgroundColor};
  color: ${({ settings }) => settings.fontColor};
  font-size: ${({ settings }) => settings.fontSize};
  margin: auto;
  padding: 10px;
  border-radius: 5px;
`;

const SelectedValue = styled.span<{ settings: SettingsType }>`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  margin-left: ${({ settings }) => settings.fontSize};
`;
const ValueUnits = styled.span<{ settings: SettingsType }>`
  font-size: calc(${({ settings }) => settings.fontSize} - 8px);
`;
const EnableEdit = styled.button<{ settings: SettingsType }>`
  position: relative;
  display: block;
  justify-self: flex-end;
  align-self: center;
  border: none;
  padding: 20px;
  background-color: transparent;
  color: ${({ settings }) => settings.fontColor};
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: underline;
`;

export interface OptionType {
  value: string | number | boolean;
  text?: string | number | boolean;
  selected?: boolean;
}

export interface PropsType {
  options: OptionType[];
  settings?: SettingsType;
}

const SwiperSelect = ({ options, settings }: PropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const finalSettings = getFinalSettings(settings);

  useEffect(() => {
    const selected = getSelectedOption(options);
    setSelectedOption(selected);
  }, []);

  return editMode ? (
    <SwipeToSelect options={options} settings={finalSettings} />
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
