const width: number = 2048;
const height: number = 2048;

const canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.width = width;
canvas.height = height;

const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

if (context) {
    console.log("hi");
  context.fillStyle = 'red';
  context.fillRect(0, 0, width, height);

  const appElement: HTMLElement | null = document.getElementById('app');
  if (appElement) {
    appElement.appendChild(canvas);
  } else {
    document.body.appendChild(canvas);
  }
} else {
  console.error('Canvas context is not supported');
}
