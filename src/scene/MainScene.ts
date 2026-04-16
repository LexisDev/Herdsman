import { Container } from 'pixi.js';
import type { IScene } from './IScene';
import { FieldView } from '../ui/views/FieldView';
import { TitleView } from '../ui/views/TitleView';
import { LightningView } from '../ui/views/LightningView';
import { HeroView } from '../ui/views/HeroView';
import { AnimalView } from '../ui/views/AnimalView';
import { YardView } from '../ui/views/YardView';
import { ScoreView } from '../ui/hud/ScoreView';
import { FpsView } from '../ui/hud/FpsView';
import { GameConfig } from '../core/GameConfig';
import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';
import { Score } from '../entities/Score';
import { Fps } from '../entities/Fps';

export class MainScene implements IScene {
  public readonly root = new Container();
  private readonly fieldView: FieldView;
  private readonly titleView: TitleView;
  private readonly lightningView: LightningView;
  private readonly heroView: HeroView;
  private readonly yardView: YardView;
  private readonly scoreView: ScoreView;
  private readonly fpsView: FpsView;
  private readonly animalViews: AnimalView[] = [];

  constructor(
    private readonly hero: Hero,
    private readonly animals: Animal[],
    private readonly yard: Yard,
    private readonly score: Score,
    private readonly fps: Fps,
  ) {
    this.fieldView = new FieldView();
    this.titleView = new TitleView(
      GameConfig.title,
      GameConfig.titleStyle,
    );
    this.lightningView = new LightningView(3);
    this.heroView = new HeroView(
      GameConfig.hero.radius,
      GameConfig.hero.color,
    );
    this.yardView = new YardView();
    this.scoreView = new ScoreView(GameConfig.score.style);
    this.fpsView = new FpsView(GameConfig.fps.style);

    this.buildScene();
    this.createMissingAnimalViews();
    this.initializeStaticViews();
  }

  public resize(width: number, height: number): void {
    this.resizeField(width, height);
    this.layoutTitle(width);
    this.layoutScore();
    this.layoutFps(width);
  }

  public render(): void {
    this.createMissingAnimalViews();
    this.syncHero();
    this.syncAnimals();
    this.syncScore();
    this.syncFps();
  }

  public update(deltaTime: number): void {
    this.lightningView.update(deltaTime);
  }

  private buildScene(): void {
    this.root.addChild(this.fieldView);
    this.root.addChild(this.yardView);
    this.root.addChild(this.lightningView);
    this.root.addChild(this.heroView);
    this.root.addChild(this.titleView);
    this.root.addChild(this.scoreView);
    this.root.addChild(this.fpsView);
  }

  private createMissingAnimalViews(): void {
    while (this.animalViews.length < this.animals.length) {
      const animalView = new AnimalView(
        GameConfig.animals.radius,
        GameConfig.animals.color,
      );

      this.animalViews.push(animalView);
      this.root.addChild(animalView);
    }
  }

  private initializeStaticViews(): void {
    this.yardView.drawOnce(
      this.yard.x,
      this.yard.y,
      this.yard.width,
      this.yard.height,
      GameConfig.yard.color,
    );
  }

  private resizeField(width: number, height: number): void {
    this.fieldView.resize(width, height, GameConfig.fieldColor);
  }

  private layoutTitle(width: number): void {
    this.titleView.centerHorizontally(width, GameConfig.titleY);
    this.lightningView.setLayout(width / 2, GameConfig.titleY + 8);
  }

  private layoutScore(): void {
    this.scoreView.setPosition(
      GameConfig.score.x,
      GameConfig.score.y,
    );
  }

  private layoutFps(width: number): void {
    this.fpsView.setPosition(
      width - GameConfig.fps.xOffset,
      GameConfig.fps.y,
    );
  }

  private syncHero(): void {
    const position = this.hero.getPosition();
    this.heroView.syncPosition(position.x, position.y);
  }

  private syncAnimals(): void {
    for (let index = 0; index < this.animals.length; index++) {
      const animal = this.animals[index];
      const animalView = this.animalViews[index];

      animalView.visible = !animal.isDeliveredState();

      if (animal.isDeliveredState()) {
        continue;
      }

      const position = animal.getPosition();
      animalView.syncPosition(position.x, position.y);
    }
  }

  private syncScore(): void {
    this.scoreView.syncScore(this.score.value);
  }

  private syncFps(): void {
    this.fpsView.syncValue(this.fps.value);
  }
}