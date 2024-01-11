export interface Color {
  name: string;
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
  };
  lab: {
    l: number;
    a: number;
    b: number;
  };
  luminance: number;
  luminanceWCAG: number;
  bestContrast: string;
  swatchImg: {
    svgNamed: string;
    svg: string;
  };
  requestedHex: string;
  distance: number;
}

export interface Palette {
  paletteTitle: string;
  colors: Color[];
}
