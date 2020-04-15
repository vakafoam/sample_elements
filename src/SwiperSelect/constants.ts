// default item width in px
export const ITEM_WIDTH: number = 100;

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

export const SETTINGS: SettingsType = {
  width: "80%",
  height: "100px",
  backgroundColor: "#285194",
  fontColor: "white",
  activeFontColor: "white",
  fontFamily: "Montserrat,sans-serif",
  fontSize: "24px",
  units: "€/Month",
};
