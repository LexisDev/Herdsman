import { Container } from 'pixi.js';
import { FieldView } from '../ui/views/FieldView';
import { TitleView } from '../ui/views/TitleView';
import { LightningView } from '../ui/views/LightningView';
import { HeroView } from '../ui/views/HeroView';
import { AnimalView } from '../ui/views/AnimalView';
import { YardView } from '../ui/views/YardView';
import { ScoreView } from '../ui/hud/ScoreView';

import { GameConfig } from '../core/GameConfig';
import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';
import { Yard } from '../entities/Yard';
import { Score } from '../entities/Score';

export class MainScene {
  public readonly root = new Container();

  private readonly fieldView: FieldView;
  private readonly titleView: TitleView;
  private readonly lightningView: LightningView;
  private readonly heroView: HeroView;
  private readonly yardView: YardView;
  private readonly scoreView: ScoreView;
  private readonly animalViews: AnimalView[] = [];

  constructor(
    private readonly hero: Hero,
    private readonly animals: Animal[],
    private readonly yard: Yard,
    private readonly score: Score,
  ) {
    this.fieldView = new FieldView();
    this.titleView = new TitleView(
      GameConfig.title,
      GameConfig.titleStyle,
    );
    this.lightningView = new LightningView(3);
    this.heroView = new HeroView();
    this.yardView = new YardView();
    this.scoreView = new ScoreView(GameConfig.score.style);

    this.buildScene();
    this.createAnimalViews();
  }

  public resize(width: number, height: number): void {
    this.drawField(width, height);
    this.drawYard();
    this.layoutTitle(width);
    this.layoutScore();
    this.drawHero();
    this.drawAnimals();
    this.drawScore();
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
  }

  private createAnimalViews(): void {
    for (const _animal of this.animals) {
      const animalView = new AnimalView();
      this.animalViews.push(animalView);
      this.root.addChild(animalView);
    }
  }

  private drawField(width: number, height: number): void {
    this.fieldView.draw(width, height, GameConfig.fieldColor);
  }

  private drawYard(): void {
    this.yardView.draw(
      this.yard.x,
      this.yard.y,
      this.yard.width,
      this.yard.height,
      GameConfig.yard.color,
    );
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

  private drawHero(): void {
    this.heroView.draw(
      this.hero.x,
      this.hero.y,
      this.hero.radius,
      GameConfig.hero.color,
    );
  }

  private drawAnimals(): void {
    for (let index = 0; index < this.animals.length; index += 1) {
      const animal = this.animals[index];
      const animalView = this.animalViews[index];

      animalView.visible = !animal.isDelivered;

      if (animal.isDelivered) {
        continue;
      }

      animalView.draw(
        animal.x,
        animal.y,
        animal.radius,
        GameConfig.animals.color,
      );
    }
  }

  private drawScore(): void {
    this.scoreView.setScore(this.score.value);
  }
}