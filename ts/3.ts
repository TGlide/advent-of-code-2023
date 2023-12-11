import { createLog } from "./helpers/createLog";
import { isNumeric } from "./helpers/isNumeric";
import { readlines } from "./helpers/readlines";

const log = createLog(true);
const lines = await readlines("./inputs/3.txt");
const matrix = lines.map((l) => l.split(""));

type TNumber = {
  x: number;
  y: number;
  value: string;
};

const numbers: TNumber[] = [];
lines.forEach((line, i) => {
  let n = "";

  const splitLine = line.split("");
  splitLine.forEach((char, j) => {
    const isLast = j === splitLine.length - 1;

    if (isNumeric(char)) {
      n += char;
    }

    if (n !== "" && (isLast || !isNumeric(char))) {
      numbers.push({
        value: n,
        y: i,
        x: isLast && isNumeric(char) ? j - n.length + 1 : j - n.length,
      });
      n = "";
    }
  });
});

function isSymbol(x: unknown): boolean {
  return !isNumeric(x) && x !== "." && x !== undefined;
}

function getAdjacent(x: number, y: number) {
  const obj = {
    top: { char: matrix[y - 1]?.[x], y: y - 1, x: x },
    "top-right": { char: matrix[y - 1]?.[x + 1], y: y - 1, x: x + 1 },
    right: { char: matrix[y]?.[x + 1], y: y, x: x + 1 },
    "bottom-right": { char: matrix[y + 1]?.[x + 1], y: y + 1, x: x + 1 },
    bottom: { char: matrix[y + 1]?.[x], y: y + 1, x: x },
    "bottom-left": { char: matrix[y + 1]?.[x - 1], y: y + 1, x: x - 1 },
    left: { char: matrix[y]?.[x - 1], y: y, x: x - 1 },
    "top-left": { char: matrix[y - 1]?.[x - 1], y: y - 1, x: x - 1 },
  };

  return {
    ...obj,
    chars: Object.values(obj).map(({ char }) => char),
    asArray: Object.values(obj),
  };
}

function logAdjacent(x: number, y: number) {
  const adjacent = getAdjacent(x, y);
  log(
    adjacent["top-left"].char ?? "-",
    adjacent.top.char ?? "-",
    adjacent["top-right"].char ?? "-"
  );
  log(adjacent.left.char ?? "-", matrix[y][x], adjacent.right.char ?? "-");
  log(
    adjacent["bottom-left"].char ?? "-",
    adjacent.bottom.char ?? "-",
    adjacent["bottom-right"].char ?? "-"
  );
}

function isPartNumber({ x, y, value }: TNumber): boolean {
  // log(`Analyzing ${value}...`);
  for (let i = x; i <= x + value.length - 1; i++) {
    const adjacent = getAdjacent(i, y);

    logAdjacent(i, y);
    log();

    if (adjacent.chars.some(isSymbol)) {
      // log(value, "is a part number!\n");
      return true;
    }
  }

  // log(value, "is not a part number.\n");
  return false;
}

console.log(
  "Part one:",
  numbers
    .filter((n) => {
      const res = isPartNumber(n);
      // prompt();
      return res;
    })
    .reduce((acc, curr) => acc + Number(curr.value), 0)
);

log();

type Gear = {
  numbers: TNumber[];
};

const gears: Gear[] = [];

lines.forEach((line, y) => {
  const splitLine = line.split("");
  splitLine.forEach((char, x) => {
    if (char !== "*") return;

    log(`Investigating possible gear at X${x}, Y${y}`);
    const adjacent = getAdjacent(x, y);
    logAdjacent(x, y);

    const adjNumbers: Set<TNumber> = new Set();

    adjacent.asArray.forEach(({ char, x, y }, i) => {
      if (!isNumeric(char)) return;

      let start = x;
      const line = matrix[y];

      for (let i = x; i >= 0; i--) {
        if (isNumeric(line[i])) start = i;
        else break;
      }

      const number = numbers.find((n) => {
        return n.x === start && n.y === y;
      });

      if (number) {
        adjNumbers.add(number);
      }
    });

    log(
      `Found the following adjacent numbers:`,
      Array(...adjNumbers)
        .map(({ value }) => value)
        .join(", ")
    );

    if (adjNumbers.size === 2) {
      log("It's a gear!");
      gears.push({
        numbers: [...adjNumbers],
      });
    }

    log();
    // prompt();
  });
});

console.log(
  "Part two:",
  gears
    .map(({ numbers }) => {
      return numbers.reduce((acc, curr) => acc * Number(curr.value), 1);
    })
    .reduce((acc, curr) => acc + curr, 0)
);
