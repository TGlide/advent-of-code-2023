import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

// Initialize
const log = createLog(false);
const lines = await readlines("./inputs/5.txt");

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

  const locations: number[] = [];
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

    locations.push(currValue);
  });

  log("Locations", locations);
  log();
  console.log("Part one:", Math.min(...locations));
  log();
}

function partTwo() {
  const seedRanges = lines[0].split(":")[1].trim().split(/\s+/g).map(Number);
  log("Seed ranges:", seedRanges);

  const seeds = [] as number[];
  for (let i = 0; i < seedRanges.length; i += 2) {
    const [start, range] = seedRanges.slice(i);
    seeds.push(...[...Array(range)].map((_, i) => start + i));
  }

  log("Seeds:", seeds);

  const maps = getMaps();
  log("Maps", maps);

  const locations: number[] = [];
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

    locations.push(currValue);
  });

  log("Locations", locations);
  log();
  console.log("Part two:", Math.min(...locations));
}

partOne();
partTwo();
