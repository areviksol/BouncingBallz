export default class Game {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private height: number = window.innerHeight;
	private width: number = window.innerWidth;
	private z:number = 0;
	
	constructor() {
		this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext("2d");
	}

	public render(): void {
		const x:number = 50 + this.z;
		const y:number = 50;
		const width:number = 100;
		const height:number = 50;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = '#3498db'
		this.ctx.fillRect(x, y, width, height);
		this.z+=1;
		console.log('rendering');
	}
}