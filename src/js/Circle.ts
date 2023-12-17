import { randomIntFromInterval } from "./utils"

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
    groundLevel: number;
    randomHeight: number
    id: number;
    z: number;

    constructor(x: number, y: number, radius: number, color: string, velocityY: number, groundLevel: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocityY = velocityY;
        this.gravity = 0.81;
        this.friction = 0.9;
        this.opacity = 1;
        this.shadowBlur = 15;
        this.shadowColor = 'rgba(0, 0, 0, 0.1)';
        this.groundLevel = groundLevel;
        this.id = randomIntFromInterval(1, 5);
        this.z = 1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
            this.x - this.radius * 0.2,
            this.y - this.radius * 0.2,
            0,
            this.x,
            this.y,
            this.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.8, this.color);
        gradient.addColorStop(1, 'black');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = this.shadowColor;
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();
    }

    update(ctx: CanvasRenderingContext2D, balls: Circle[]) {
        const newY = this.y + this.velocityY;

        this.velocityY += this.gravity;
        if (newY + this.radius >= this.groundLevel) {
            this.y = this.groundLevel - this.radius;
            this.velocityY *= -this.friction;
            if (Math.abs(this.velocityY) < 1) {
                this.velocityY = 0;
                this.friction = 0;
            }
        } else {
            this.y = newY;
        }

        if (Math.abs(this.velocityY) < 0.1) {
            this.velocityY = 0;
        }

        balls.forEach(ball => {
            if (ball !== this) {
                const dx = ball.x - this.x;
                const dy = ball.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = this.radius + ball.radius;

                if (distance <= minDistance) {
                    const angle = Math.atan2(dy, dx);
                    const sin = Math.sin(angle);
                    const cos = Math.cos(angle);

                    const velX1 = this.velocityY * cos + this.velocityY * sin;
                    const velY1 = this.velocityY * sin - this.velocityY * cos;

                    const velX2 = ball.velocityY * cos + ball.velocityY * sin;
                    const velY2 = ball.velocityY * sin - ball.velocityY * cos;

                    const finalVelX1 = ((this.radius - ball.radius) * velX1 + (ball.radius * 2) * velX2) / (this.radius + ball.radius);
                    const finalVelX2 = ((ball.radius - this.radius) * velX2 + (this.radius * 2) * velX1) / (this.radius + ball.radius);

                    this.velocityY = finalVelX1 * cos - velY1 * sin;
                    ball.velocityY = finalVelX2 * cos - velY2 * sin;
                    
                    const move = minDistance - distance + 1;
                    this.x -= move * cos;
                    this.y -= move * sin;
                    ball.x += move * cos;
                    ball.y += move * sin;
                }
            }
        });


        this.draw(ctx);
    }
}