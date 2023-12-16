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


    update(ctx: CanvasRenderingContext2D) {
        const newY = this.y + this.velocityY;
        if (newY + this.radius >= this.groundLevel) {
            this.y = this.groundLevel - this.radius + 5;
            this.velocityY = -this.velocityY * this.friction;
            this.opacity = 0;
            this.radius *= 0.95;

            if (Math.abs(this.velocityY) < 1 && this.y - this.groundLevel >= 0) {
                this.velocityY = 0;
                this.y = newY
                this.opacity = 0;
                this.radius *= 0.99;
            }
        } else {
            this.groundLevel -= 0.01;
            this.velocityY += this.gravity;
            this.opacity = 0;
            this.y = newY;
            this.radius = this.radius > 5 ? this.radius - 0.1 : 0;
        }

        if (this.y >= this.groundLevel - this.radius) {
            this.opacity = 0;
        }


        if (this.z > 0)
            this.z -= 0.01;

        if (this.id % 2 == 0)
            this.x += this.z;
        else
            this.x -= this.z;
        this.draw(ctx);
    }
}


