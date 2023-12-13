import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

// Initialize
const log = createLog(false);
const lines = await readlines("./inputs/6.txt");

type RaceRecord = {
  time: number;
  distance: number;
};

function getTotalWinWays(record: RaceRecord) {
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

  return waysToWin;
}

function partOne() {
  const times = lines[0].split(":")[1].trim().split(/\s+/g).map(Number);
  const distances = lines[1].split(":")[1].trim().split(/\s+/g).map(Number);
  const records: RaceRecord[] = times.map((t, i) => {
    return {
      time: t,
      distance: distances[i],
    };
  });

  let total = 1;
  records.forEach((record) => {
    total *= getTotalWinWays(record);
  });

  console.log("Part one:", total);
}

partOne();

function partTwo() {
  const record = {
    time: Number(lines[0].split(":")[1].trim().split(/\s+/g).join("")),
    distance: Number(lines[1].split(":")[1].trim().split(/\s+/g).join("")),
  };

  console.log("Part two:", getTotalWinWays(record));
}

partTwo();
