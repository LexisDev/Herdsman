import { Container } from 'pixi.js';
import { FieldView } from '../ui/views/FieldView';
import { TitleView } from '../ui/views/TitleView';
import { GameConfig } from '../core/GameConfig';

export class MainScene {
  public readonly root = new Container();

  private readonly fieldView: FieldView;
  private readonly titleView: TitleView;

  constructor() {
    this.fieldView = new FieldView();
    this.titleView = new TitleView(
      GameConfig.title,
      GameConfig.titleStyle,
    );

    this.root.addChild(this.fieldView);
    this.root.addChild(this.titleView);
  }

  public resize(width: number, height: number): void {
    this.fieldView.draw(width, height, GameConfig.fieldColor);
    this.titleView.centerHorizontally(width, GameConfig.titleY);
  }
}