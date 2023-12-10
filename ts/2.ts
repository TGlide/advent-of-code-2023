import { isNumber } from "./helpers/isNumber";
import { readlines } from "./helpers/readlines";

type Game = {
  id: number;
  cubes: {
    [color: string]: number;
  };
};

function parseGame(game: string): Game {
  const match = game.match(/Game (\d+):/);
  const id = match?.[1];

  if (!isNumber(id)) throw Error("Unexpected game input");

  const pickings = game.substring(match?.[0].length ?? 0).split(";");
  const cubes = {} as Game["cubes"];
  pickings.forEach((picking) => {
    const matches = picking.matchAll(/(\d+)\s(\w+)/g);

    for (const [_, n, color] of matches) {
      const num = Number(n);
      if (!cubes[color] || num > cubes[color]) {
        cubes[color] = num;
      }
    }
  });

  return {
    id: Number(id),
    cubes,
  };
}

const lines = await readlines("./inputs/2.txt");
const games = lines.map(parseGame);

console.log(
  "Part one:",
  games
    .filter(({ cubes }) => {
      return cubes.red <= 12 && cubes.green <= 13 && cubes.blue <= 14;
    })
    .reduce((acc, curr) => acc + curr.id, 0)
);

console.log(
  "Part two:",
  games
    .map(({ cubes }) => {
      return cubes.red * cubes.green * cubes.blue;
    })
    .reduce((acc, curr) => acc + curr, 0)
);
