export default class Planet {
    private x: number;
    private y: number;
    private radius: number;
    private texture: string;

    constructor(x: number, y: number, radius: number, texture: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.texture = texture;
    }

    getTexture(): string {
        return this.texture;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const planetImg = new Image();
        planetImg.src = this.texture;

        planetImg.onload = () => {
            ctx.drawImage(planetImg, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        };
    }
}
