let maxIterations = parseInt(document.getElementById('max-iterations').value, 10);
let baseHue = parseInt(document.getElementById('base-hue').value, 10);

document.getElementById('max-iterations').addEventListener('input', (e) => {
  maxIterations = parseInt(e.target.value, 10);
})
document.getElementById('base-hue').addEventListener('input', (e) => {
  baseHue = parseInt(e.target.value, 10);
})
