// The mandelbrot set definition
const set = (c) =>
  (z) => z.multiply(z).add(c);


const BASE_COLOR = new Color(60, 60, 200, 255);

(function render() {
  requestAnimationFrame(() => {
    const image = ctx.createImageData(board.width, board.height);

    for (let i = 0; i < board.width; i++) {
      for (let j = 0; j < board.height; j++) {
        const scaledX = rangeTransform(i, 0, board.width, -2.5, 1);
        const scaledY = rangeTransform(j, 0, board.height, -1, 1);

        // constant: x_0 + iy_0
        const c = new Complex(scaledX, scaledY);

        // The mandelbrot set, with the constant value fixed
        const f = set(c);
        let value = new Complex(0, 0);

        let step = 0;
        while (value.squaredAbsolute() < 4 && step < maxIterations) {
          value = f(value);
          step++;
        }

        let color = BASE_COLOR.clone();
        color.hue((baseHue / 255) + step*step / maxIterations);

        paintPixel(image, i, j, color);
      }
    }

    ctx.putImageData(image, 0, 0);
    
    render();
  });
}());

maxIterations = 0;
const mxi = setInterval(() => {
  maxIterations = Math.min(maxIterations + 10, 300);
  document.getElementById('max-iterations').value = maxIterations;

  if (maxIterations === 300) {
    clearInterval(mxi);
  }
}, 200);
