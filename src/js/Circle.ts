export default class Circle {
    x: number;
    y: number;
    radius: number;
    color: string;
    velocityY: number;
    gravity: number;
    friction: number;
    opacity: number;
    shadowBlur: number;
    shadowColor: string;

    constructor(x: number, y: number, radius: number, color: string, velocityY: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityY = velocityY;
        this.gravity = 0.6;
        this.friction = 0.9;
        this.opacity = 1;
        this.shadowBlur = 15;
        this.shadowColor = 'rgba(0, 0, 0, 0.1)';
    }

    draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius * 0.2,
            this.x,
            this.y,
            this.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, this.color);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = this.shadowColor;
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }
    update(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (this.y + this.radius + this.velocityY >= canvas.height) {
            this.velocityY = -this.velocityY * this.friction;
            this.opacity -= 0.005; 
            this.radius *= 0.95; 

            if (Math.abs(this.velocityY) < 1) {
                this.velocityY = 0;
                this.radius = 0;
                this.opacity = 0;
            }
        } else {
            this.velocityY += this.gravity;
            this.opacity = 1;
        }

        this.y += this.velocityY;

        if (this.radius > 5) {
            this.radius -= 0.1; 
        }

        if (this.radius <= 0) {
            this.radius = 0;
            this.opacity = 0;
        }

        this.draw(ctx);
    }
}
