import { SETTINGS } from "./constants";
import { OptionType, SettingsType } from "./";

export const getFinalSettings = (settings?: SettingsType): SettingsType =>
  settings ? { ...SETTINGS, ...settings } : SETTINGS;

export const getSelectedOption = (options: OptionType[]): OptionType => {
  const found = options.find((o: OptionType) => o.selected);
  return found ? found : options[0];
};
