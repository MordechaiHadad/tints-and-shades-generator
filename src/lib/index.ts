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

export class ThemeHandler {
    private isDark: boolean;
    private darkThemeButton: HTMLButtonElement;

    constructor(isDark: boolean, button: HTMLButtonElement) {
        this.isDark = isDark;
        this.darkThemeButton = button;
        this.toggle = this.toggle.bind(this);

        this.darkThemeButton.classList.add(this.isDark ? "ti-sun" : "ti-moon");
    }

    toggle() {
        this.isDark = !this.isDark;
        document.documentElement.classList.toggle("dark", this.isDark);

        this.darkThemeButton.classList.remove(
            this.isDark ? "ti-moon" : "ti-sun"
        );
        this.darkThemeButton.classList.add(this.isDark ? "ti-sun" : "ti-moon");
    }

    getisDark(): boolean {
        return this.isDark;
    }
}