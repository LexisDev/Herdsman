export const GameConfig = {
  backgroundColor: '#1a1a1a',
  fieldColor: 0x3f8f4f,

  title: 'Herdsman 2D',
  titleY: 20,
  titleStyle: {
    fill: 0xffffff,
    fontSize: 42,
    fontWeight: 'bold',
  },

  score: {
    x: 20,
    y: 20,
    style: {
      fill: 0xffffff,
      fontSize: 28,
      fontWeight: 'bold',
    },
  },

  hero: {
    x: 200,
    y: 180,
    radius: 18,
    color: 0xff3b30,
    speed: 280,
  },

  animals: {
    minCount: 5,
    maxCount: 12,
    radius: 10,
    color: 0xffffff,
    minX: 50,
    maxX: 800,
    minY: 100,
    maxY: 500,
  },

  yard: {
    x: 600,
    y: 350,
    width: 120,
    height: 80,
    color: 0xffd60a,
  },
} as const;