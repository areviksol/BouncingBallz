import Circle from "./Circle";
// import field from "../images/field.jpeg"

export default class Game {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private height: number = window.innerHeight;
	private width: number = window.innerWidth;
	private z:number = 0;
	private circles:Circle[] = []; 
	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");
		this.canvas.addEventListener("click", (event) => {
			var thumbImg = document.createElement('img');
			const radius = 30;
			const color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
			const velocityY = 0;
			const circle = new Circle(event.clientX, event.clientY, radius, color, velocityY);
			this.circles.push(circle);
			this.loadImage(field);
		  })
	}
	private loadImage(src: string): void {
		const img = new Image();
		img.onload = () => {
		  this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
		};
		img.src = src;
	  }
	public render(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.circles.forEach(circle => {
		  circle.update(this.canvas, this.ctx);
		});
		console.log('rendering');
	}
}
