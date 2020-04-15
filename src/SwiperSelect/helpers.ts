import { SETTINGS } from "SwiperSelect/constants";
import { OptionType, SettingsType } from "SwiperSelect";

export const getFinalSettings = (settings?: SettingsType): SettingsType =>
  settings ? { ...SETTINGS, ...settings } : SETTINGS;

export const getSelectedOption = (options: OptionType[]): OptionType => {
  const found = options.find((o: OptionType) => o.selected);
  return found ? found : options[0];
};

export const findSelectedItemIndex = (options: OptionType[]): number => {
  let selected = options.findIndex(el => {
    if (el.selected) return true;
    return false;
  });
  if (selected === -1) selected = 0;
  return selected;
};
