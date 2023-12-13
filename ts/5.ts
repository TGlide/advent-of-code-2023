import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

// Initialize
const log = createLog(true);
const lines = await readlines("./inputs/5-ex.txt");

// Helpers
type TMap = {
  from: string;
  to: string;
  subMaps: Array<{
    destStart: number;
    sourceStart: number;
    range: number;
  }>;
};

function getMaps() {
  const maps: TMap[] = [];
  let currMap: TMap | null = null;
  const startPattern = /(\w+)-to-(\w+) map:/;

  [...lines.slice(2), ""].forEach((line, i) => {
    const startMatch = line.match(startPattern);

    // Map start
    if (startMatch) {
      currMap = {
        from: startMatch[1],
        to: startMatch[2],
        subMaps: [],
      };
    } else if (line.trim().length === 0) {
      if (currMap) maps.push(currMap);
    } else if (currMap) {
      currMap.subMaps.push({
        destStart: Number(line.split(/\s+/g)[0]),
        sourceStart: Number(line.split(/\s+/g)[1]),
        range: Number(line.split(/\s+/g)[2]),
      });
    }
  });

  return maps;
}

// Execute
function partOne() {
  const seeds = lines[0].split(":")[1].trim().split(/\s+/g).map(Number);
  log("Seeds:", seeds);

  const maps = getMaps();
  log("Maps", maps);

  let loc = -1;
  seeds.forEach((seed) => {
    let currLabel = "seed";
    let currValue = seed;

    while (currLabel !== "location") {
      const map = maps.find((map) => map.from === currLabel);
      if (!map) throw new Error("all is doomed");

      for (const sm of map.subMaps) {
        if (
          currValue >= sm.sourceStart &&
          currValue < sm.sourceStart + sm.range
        ) {
          currValue = sm.destStart + (currValue - sm.sourceStart);
          break;
        }
      }

      currLabel = map.to;
    }

    if (loc === -1 || currValue < loc) loc = currValue;
  });

  log();
  console.log("Part one:", loc);
  log();
}

type SeedRange = [number, number];

function partTwo() {
  const nums = lines[0].split(":")[1].trim().split(/\s+/g).map(Number);
  const seedRanges: SeedRange[] = [];
  for (let i = 0; i < nums.length; i += 2) {
    const [start, range] = nums.slice(i);
    seedRanges.push([start, start + range - 1]);
  }

  log("Seed ranges:", seedRanges);
  log(`${seedRanges.length} total ranges`);

  const maps = getMaps();
  // log("Maps", maps);

  let loc = -1;
  let t = performance.now();

  seedRanges.forEach((seedRange) => {
    t = performance.now();
    log("Analyzing range:", seedRange);

    let currLabel = "seed";
    let ranges: [number, number][] = [seedRange];

    while (currLabel !== "location") {
      const map = maps.find((map) => map.from === currLabel);
      if (!map) throw new Error("all is doomed");

      const newRanges: typeof ranges = [];
      for (const range of ranges) {
        const remaining: SeedRange = seedRange;
        for (const sm of map.subMaps) {
        }
        newRanges.push(remaining);
      }

      currLabel = map.to;
    }

    // if (loc === -1 || currValue < loc) loc = currValue;

    log("  Took", (performance.now() - t) / 1000, "seconds");
  });

  log();
  console.log("Part two:", loc);
}

partOne();
partTwo();
