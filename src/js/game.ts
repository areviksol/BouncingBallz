import Circle from "./circle";
import Ground from "./ground";
import {randomIntFromInterval} from "./utils"

export default class Game {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private height: number = window.innerHeight;
	private width: number = window.innerWidth;
	private circles:Circle[] = []; 
	private ground:Ground = new Ground(this.height - 150)

	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");
		this.canvas.addEventListener("click", (event) => {
			const radius = randomIntFromInterval(50, 100) + 10;
			const color = "#ffffea"
			const velocityY = 0;
			const circle = new Circle(event.clientX, event.clientY, radius, color, velocityY, this.ground.groundLevel);
			this.circles.push(circle);
		  })
	}

	public render(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
		skyGradient.addColorStop(0, 'rgba(126,188,204,255)'); 
		skyGradient.addColorStop(1, 'rgba(160,211,225,255)'); 

		this.ctx.fillStyle = skyGradient;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.beginPath();
		const centerX = 100; 
		const centerY = 100; 
		const radius = 50; 
		this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

		this.ground.update(this.canvas, this.ctx);

		this.circles.forEach((circle) => {
		  circle.update(this.ctx);
		});
	}
}
