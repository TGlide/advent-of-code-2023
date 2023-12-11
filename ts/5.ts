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
  const seeds = lines[0].split(":")[1].trim().split(/\s+/g);
  log("Seeds:", seeds);

  const maps = getMaps();
  log("Maps", maps);
}

partOne();
