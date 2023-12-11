import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

const log = createLog(false);
const lines = await readlines("./inputs/4.txt");

let points = 0;
lines.forEach((line, i) => {
  const [, numbers] = line.split(":");
  const [winning, owned] = numbers.split("|");

  const [winNums, ownNums] = [winning, owned].map((arr) =>
    arr.split(/\s+/g).filter((s) => s.length)
  );

  const gamePoints = winNums.reduce((acc, cur) => {
    if (!ownNums.includes(cur)) return acc;
    const num = Number(cur);
    return acc === 0 ? 1 : acc * 2;
  }, 0);
  points += gamePoints;
  log(`Game ${i + 1}:`, gamePoints, `points`);
});

log();
console.log("Part one:", points);
log();

let totalScratchboards = lines.length;
const scratchboards: number[] = lines.map((_, i) => i);

const cachedToCopy: {
  [scratch_index: number]: number[];
} = {};

while (scratchboards.length) {
  const i = scratchboards.shift() as number;
  if (cachedToCopy[i]) {
    scratchboards.push(...cachedToCopy[i]);
    totalScratchboards += cachedToCopy[i].length;
    // log(`Game ${i + 1}:`, cachedToCopy[i], "scratchcards to copy (cached)");
    continue;
  }

  const line = lines[i];

  const [, numbers] = line.split(":");
  const [winning, owned] = numbers.split("|");

  const [winNums, ownNums] = [winning, owned].map((arr) =>
    arr.split(/\s+/g).filter((s) => s.length)
  );

  const toCopy = winNums.reduce((acc, curr) => {
    if (!ownNums.includes(curr)) return acc;
    const prev = acc.at(-1) ?? i;
    return [...acc, prev + 1];
  }, [] as number[]);
  log(`Game ${i + 1}:`, toCopy, "scratchcards to copy");
  scratchboards.push(...toCopy);
  totalScratchboards += toCopy.length;

  cachedToCopy[i] = toCopy;
}

log("Skipping logs of cached games...\n");
console.log("Part two:", totalScratchboards);
