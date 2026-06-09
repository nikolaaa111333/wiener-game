import { Application, Graphics, TilingSprite, Texture } from 'pixi.js';

export class Background {
  private app: Application;
  private sky: Graphics;
  private ground: Graphics;
  private clouds: Graphics[] = [];
  private cloudTimer: number = 0;

  constructor(app: Application) {
    this.app = app;

    this.sky = new Graphics();
    this.sky
      .rect(0, 0, app.screen.width, app.screen.height - 60)
      .fill(0x87ceeb);
    app.stage.addChild(this.sky);

    this.ground = new Graphics();
    this.ground
      .rect(0, app.screen.height - 60, app.screen.width, 60)
      .fill(0x228b22);
    app.stage.addChild(this.ground);

    for (let i = 0; i < 4; i++) {
      this.spawnCloud(Math.random() * app.screen.width);
    }
  }

  private spawnCloud(x: number): void {
    const cloud = new Graphics();
    cloud.ellipse(0, 0, 60, 30).fill(0xffffff);
    cloud.x = x;
    cloud.y = Math.random() * (this.app.screen.height - 120) + 20;
    cloud.alpha = 0.8;
    this.app.stage.addChild(cloud);
    this.clouds.push(cloud);
  }

  update(delta: number): void {
    this.clouds.forEach((c) => {
      c.x -= 1.5 * delta;
    });
    this.clouds = this.clouds.filter((c) => {
      if (c.x < -80) {
        this.app.stage.removeChild(c);
        return false;
      }
      return true;
    });

    this.cloudTimer += delta;
    if (this.cloudTimer > 120) {
      this.cloudTimer = 0;
      this.spawnCloud(this.app.screen.width + 60);
    }
  }
}
