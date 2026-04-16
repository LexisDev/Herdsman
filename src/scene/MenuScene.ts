import { Container, Graphics, Sprite, Text, Texture } from 'pixi.js';
import type { IScene } from './IScene';

export class MenuScene implements IScene {
  public readonly root = new Container();
  private readonly background = new Graphics();
  private readonly button = new Graphics();
  private readonly buttonLabel = new Text({
    text: 'Start Game',
    style: {
      fill: 0xffffff,
      fontSize: 28,
      fontWeight: 'bold',
    },
  });
  private readonly logo: Sprite;
  private screenWidth = 0;
  private screenHeight = 0;

  constructor(
    logoTexture: Texture,
    private readonly onStart: () => void,
  ) {
    this.logo = new Sprite(logoTexture);
    this.logo.anchor.set(0.5);

    this.button.eventMode = 'static';
    this.button.cursor = 'pointer';
    this.button.on('pointertap', () => {
      this.onStart();
    });

    this.buttonLabel.anchor.set(0.5);

    this.root.addChild(this.background);
    this.root.addChild(this.logo);
    this.root.addChild(this.button);
    this.root.addChild(this.buttonLabel);
  }

  public resize(width: number, height: number): void {
    this.screenWidth = width;
    this.screenHeight = height;

    this.drawBackground();
    this.applyLogoSize();
    this.layoutLogo();
    this.drawButton();
    this.layoutButtonLabel();
  }

  public update(_deltaTime: number): void {}

  private drawBackground(): void {
    this.background.clear();
    this.background.rect(0, 0, this.screenWidth, this.screenHeight);
    this.background.fill(0x1c2a1c);
  }

  private applyLogoSize(): void {
    const textureWidth = this.logo.texture.width;
    const textureHeight = this.logo.texture.height;

    if (textureWidth <= 0 || textureHeight <= 0) {
      return;
    }

    const maxWidth = Math.min(this.screenWidth * 0.45, 500);
    const aspectRatio = textureWidth / textureHeight;

    this.logo.width = maxWidth;
    this.logo.height = maxWidth / aspectRatio;
  }

  private layoutLogo(): void {
    this.logo.x = this.screenWidth / 2;
    this.logo.y = this.screenHeight / 2 - 140;
  }

  private drawButton(): void {
    const buttonWidth = 240;
    const buttonHeight = 72;
    const x = this.screenWidth / 2 - buttonWidth / 2;
    const y = this.screenHeight / 2 + 40;

    this.button.clear();
    this.button.roundRect(0, 0, buttonWidth, buttonHeight, 18);
    this.button.fill(0x2d6a4f);

    this.button.x = x;
    this.button.y = y;
  }

  private layoutButtonLabel(): void {
    this.buttonLabel.x = this.screenWidth / 2;
    this.buttonLabel.y = this.screenHeight / 2 + 76;
  }
}