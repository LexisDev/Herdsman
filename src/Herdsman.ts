import { Game } from './core/Game';

async function bootstrap(): Promise<void> {
  const rootElement = document.getElementById('app');

  if (!rootElement) {
    throw new Error('Element #app not found');
  }

  const game = new Game(rootElement);
  await game.init();
}

bootstrap().catch((error: unknown) => {
  console.error('Failed to bootstrap the game:', error);
});