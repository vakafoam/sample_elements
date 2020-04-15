// TODO: use breakpoints for more precise UI tune on different devices
export const screenSize = {
  phone: 480,
  phoneWide: 600,
  tablet: 768,
  laptop: 992,
  desktop: 1200,
  contentMaxWidth: 1440,
};

export const device = {
  phone: `(max-width: ${screenSize.phone}px)`,
  phoneWide: `(max-width: ${screenSize.phoneWide}px)`,
  tablet: `(max-width: ${screenSize.tablet}px)`,
  laptop: `(max-width: ${screenSize.laptop}px)`,
  desktop: `(max-width: ${screenSize.desktop}px)`,
  desktopWide: `(max-width: ${screenSize.contentMaxWidth}px)`,
};
