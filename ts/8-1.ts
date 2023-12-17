import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

const log = createLog(true);
const lines = await readlines("./inputs/8.txt");

const directions = lines[0].split("");

const map: Map<string, { L: string; R: string }> = new Map();
lines.slice(2).forEach((line) => {
  const match = line.match(/(\w+) = \((\w+), (\w+)\)/);
  if (!match) return;
  const [_, key, L, R] = match;

  map.set(key, { L, R });
});

let cur = "AAA" as string;
let dirIndex = 0;
let steps = 0;
log({ cur, steps, dirIndex });

while (cur !== "ZZZ") {
  steps++;
  const dir = directions[dirIndex] as "L" | "R";
  dirIndex = (dirIndex + 1) % directions.length;

  cur = map.get(cur)![dir];
  log({ cur, steps, dirIndex });
}

console.log("Part 1:", steps);
