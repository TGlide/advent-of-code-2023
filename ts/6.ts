import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

// Initialize
const log = createLog(true);
const lines = await readlines("./inputs/6.txt");

const times = lines[0].split(":")[1].trim().split(/\s+/g).map(Number);
const distances = lines[1].split(":")[1].trim().split(/\s+/g).map(Number);
const records = times.map((t, i) => {
  return {
    time: t,
    distance: distances[i],
  };
});

let total = 1;
records.forEach((record) => {
  let waysToWin = 0;
  log(
    `Attempting to beat record of ${record.distance}mm in under ${record.time}ms...`
  );

  for (let speed = 1; speed <= record.time; speed++) {
    const distance = speed * (record.time - speed);
    log(
      "  Speed:",
      speed,
      "ms; Time running:",
      record.time - speed,
      "ms; Distance:",
      distance,
      "mm"
    );
    if (distance > record.distance) {
      waysToWin++;
    }
  }

  log(`  There are ${waysToWin} ways to beat the record.\n`);

  total *= waysToWin;
});

console.log("Part one:", total);
