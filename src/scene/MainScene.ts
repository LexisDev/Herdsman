import { Container } from 'pixi.js';
import { FieldView } from '../ui/views/FieldView';
import { TitleView } from '../ui/views/TitleView';
import { LightningView } from '../ui/views/LightningView';
import { HeroView } from '../ui/views/HeroView';
import { AnimalView } from '../ui/views/AnimalView';
import { GameConfig } from '../core/GameConfig';
import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';

export class MainScene {
  public readonly root = new Container();

  private readonly fieldView: FieldView;
  private readonly titleView: TitleView;
  private readonly lightningView: LightningView;
  private readonly heroView: HeroView;
  private readonly animalViews: AnimalView[] = [];

  constructor(
    private readonly hero: Hero,
    private readonly animals: Animal[],
  ) {
    this.fieldView = new FieldView();
    this.titleView = new TitleView(
      GameConfig.title,
      GameConfig.titleStyle,
    );
    this.lightningView = new LightningView(3);
    this.heroView = new HeroView();

    this.root.addChild(this.fieldView);
    this.root.addChild(this.lightningView);

    for (const _animal of this.animals) {
      const animalView = new AnimalView();
      this.animalViews.push(animalView);
      this.root.addChild(animalView);
    }

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

    for (let index = 0; index < this.animals.length; index += 1) {
      const animal = this.animals[index];
      const animalView = this.animalViews[index];

      animalView.draw(
        animal.x,
        animal.y,
        animal.radius,
        GameConfig.animals.color,
      );
    }
  }

  public update(deltaTime: number): void {
    this.lightningView.update(deltaTime);
  }
}