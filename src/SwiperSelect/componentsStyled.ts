import styled from "style/styled-components";
import { SettingsType } from "SwiperSelect";
import { ITEM_WIDTH } from "SwiperSelect/constants";

export const SelectedState = styled.div<{ settings: SettingsType }>`
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

export const SelectedValue = styled.span<{ settings: SettingsType }>`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  margin-left: ${({ settings }) => settings.fontSize};
`;

export const ValueUnits = styled.span<{ settings: SettingsType }>`
  font-size: calc(${({ settings }) => settings.fontSize} - 8px);
  margin-top: 5px;
`;

export const EnableEdit = styled.button<{ settings: SettingsType }>`
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

export const SelectWrapper = styled.section<{ settings: SettingsType }>`
  position: relative;
  width: ${({ settings }) => settings.width};
  overflow: hidden;
  margin: auto;
  background: ${({ settings }) => settings.backgroundColor};
  border-radius: 5px;
`;

export const SelectContent = styled.div<{ settings: SettingsType }>`
  display: flex;
  position: relative;
  justify-content: flex-start;
  flex-flow: row nowrap;
  flex-shrink: 1;
  flex-grow: 0;
  background: ${({ settings }) => settings.backgroundColor};
  overflow: hidden;
  left: calc(50% - ${ITEM_WIDTH / 2}px); // active item in the middle
`;

export const SelectOptions = styled.div<{ settings: SettingsType }>`
  position: relative;
  background: ${({ settings }) => settings.backgroundColor};
  cursor: pointer;
  height: ${({ settings }) => settings.height};
  line-height: ${({ settings }) => settings.height};
  flex-shrink: 0;
  width: ${ITEM_WIDTH}px;
`;

export const SelectedTag = styled.span<{ settings: SettingsType }>`
  position: absolute;
  width: 100%;
  top: 15px;
  display: block;
  line-height: 1;
  color: ${({ settings }) => settings.activeFontColor};
  font-size: calc(${({ settings }) => settings.fontSize} - 12px);
`;

export const SelectOption = styled.span<{
  isActive: boolean;
  settings: SettingsType;
  opacity: number;
}>`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  height: 100%;
  width: ${ITEM_WIDTH}px;
  text-align: center;
  font-size: ${({ isActive, settings }) =>
    isActive ? `calc(${settings.fontSize} + 4px)` : settings.fontSize};
  font-weight: 400;
  margin: 0;
  color: ${({ isActive, settings }) =>
    isActive ? settings.activeFontColor : settings.fontColor};
  transition: font-size 0.3s ease-out;
  opacity: ${({ opacity }) => opacity};
`;

export const SubmitButton = styled.button<{ settings: SettingsType }>`
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  text-transform: uppercase;
  background: blue;
  color: white;
`;
