// The Canvas Board
const board = document.getElementById('board');
const ctx = board.getContext('2d');
board.width = 900;
board.height = 500;


// Complex number representation
class Complex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  multiply(other) {
    return new Complex(this.x * other.x - this.y * other.y,
                   this.x * other.y + this.y * other.x);
  }

  add(other) {
    return new Complex(this.x + other.x, this.y + other.y);
  }

  squaredAbsolute() {
    return this.x*this.x + this.y*this.y;
  }
}


// Take a number from one range to another
const rangeTransform = (v, oldMin, oldMax, newMin, newMax) =>
  (((v - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin

// Get index in ImageData from coordinates
const coordinatesToDataIndex = (x, y) => 4 * (y * board.width + x);

// Put color in ImageData
const paintPixel = (image, x, y, color) => {
  const i = coordinatesToDataIndex(x, y);

  image.data[i] = color.r;
  image.data[i + 1] = color.g;
  image.data[i + 2] = color.b;
  image.data[i + 3] = color.a;
}

class Color {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  static random() {
    return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 255);
  }

  hue(value) {
    const hsl = rgbToHsl(this.r, this.g, this.b);
    hsl[0] = value % 1;
    const rgb = hslToRgb.apply(null, hsl);

    this.r = rgb[0];
    this.g = rgb[1];
    this.b = rgb[2];
  }

  clone() {
    return new Color(this.r, this.g, this.b, this.a);
  }
}
