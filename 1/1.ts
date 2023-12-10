// Helpers
const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function extractNumFromText(text: string): number | null {
  for (const nw of numberWords) {
    if (text.includes(nw)) {
      return numberWords.indexOf(nw) + 1;
    }
  }

  return null;
}

function isNumber(s: string): boolean {
  return !Number.isNaN(Number(s));
}

function sum(arr: number[]): number {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

// Main
const inputFile = Bun.file("./1/input.txt");
const input = await inputFile.text();
const lines = input.split("\n");

function partOne() {
  const numbers = [] as number[];

  lines.forEach((line) => {
    let first: string | null = null;
    let last: string | null = null;

    line.split("").forEach((char) => {
      if (isNumber(char)) {
        if (first === null) {
          first = char;
        }
        last = char;
      }
    });

    const num = Number(`${first}${last}`);
    numbers.push(num);
  });

  return sum(numbers);
}

console.log("Part one:", partOne());

function partTwo() {
  const numbers = [] as number[];

  lines.forEach((line) => {
    let first: string | null = null;
    let last: string | null = null;
    let textSoFar = "";

    line.split("").forEach((char) => {
      textSoFar += char;

      if (extractNumFromText(textSoFar)) {
        const num = extractNumFromText(textSoFar);
        if (first === null) {
          first = `${num}`;
        }
        last = `${num}`;
        textSoFar = "";
      } else if (isNumber(char)) {
        if (first === null) {
          first = char;
        }
        last = char;
      }
    });

    const num = Number(`${first}${last}`);
    numbers.push(num);
  });

  return sum(numbers);
}

console.log("Part two:", partTwo());
