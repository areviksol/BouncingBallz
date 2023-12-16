import Circle from "./Circle";

export default class Ground {
    groundLevel: number;
    hillHeight: number;
    shadowBlur: number;
    shadowColor: string;
    balls: Circle[];

    constructor( groundLevel: number, hillHeight: number = 50) {
        this.groundLevel = groundLevel;
        this.hillHeight = hillHeight;
        this.shadowBlur = 5;
        this.shadowColor = 'rgba(0, 0, 0, 0.3)';
    }

    groundHeight(x:number) {
        return Math.sin(x / 30) * this.hillHeight + this.groundLevel;
    }

    
    checkCollision(circle:Circle) {
        if (circle.y + circle.radius >= this.groundLevel) {
            circle.y = this.groundLevel - circle.radius;
            circle.velocityY = 0;
        }
    }

    drawShadow(circle: Circle, ctx: CanvasRenderingContext2D) {
        const shadowY = this.groundLevel - (this.groundLevel - circle.y + circle.radius);
        const shadowBlur = circle.shadowBlur;
        const shadowColor = circle.shadowColor;

        ctx.beginPath();
        ctx.arc(circle.x, shadowY, circle.radius, 0, Math.PI * 2);
        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = shadowColor;
        ctx.fillStyle = shadowColor;
        ctx.fill();
        ctx.closePath();
    }
    

    drawGround(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        const depth = 30;
        const groundWidth = canvas.width;
        const groundHeight = canvas.height - this.groundLevel;

        ctx.fillStyle = '#595a62';
        ctx.fillRect(0, this.groundLevel, groundWidth, groundHeight);

        for (let i = 0; i < depth; i++) {
            ctx.fillStyle = `rgba(198,183,170, 255)`;
            ctx.fillRect(0, this.groundLevel + i, groundWidth, groundHeight);
        }
    }
    
    update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.drawGround(canvas, ctx);
    }
}

