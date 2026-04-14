import { Container } from 'pixi.js';
import { FieldView } from '../ui/views/FieldView';
import { TitleView } from '../ui/views/TitleView';
import { LightningView } from '../ui/views/LightningView';
import { HeroView } from '../ui/views/HeroView';
import { GameConfig } from '../core/GameConfig';
import { Hero } from '../entities/Hero';

export class MainScene {
  public readonly root = new Container();

  private readonly fieldView: FieldView;
  private readonly titleView: TitleView;
  private readonly lightningView: LightningView;
  private readonly heroView: HeroView;

  constructor(private readonly hero: Hero) {
    this.fieldView = new FieldView();
    this.titleView = new TitleView(
      GameConfig.title,
      GameConfig.titleStyle,
    );
    this.lightningView = new LightningView(3);
    this.heroView = new HeroView();

    this.root.addChild(this.fieldView);
    this.root.addChild(this.lightningView);
    this.root.addChild(this.heroView);
    this.root.addChild(this.titleView);
  }

  public resize(width: number, height: number): void {
    this.fieldView.draw(width, height, GameConfig.fieldColor);
    this.titleView.centerHorizontally(width, GameConfig.titleY);
    this.lightningView.setLayout(width / 2, GameConfig.titleY + 8);

    this.heroView.draw(
      this.hero.x,
      this.hero.y,
      this.hero.radius,
      GameConfig.hero.color,
    );
  }

  public update(deltaTime: number): void {
    this.lightningView.update(deltaTime);
  }
}