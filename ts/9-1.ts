import { readlines } from "./helpers/readlines";

const lines = await readlines("./inputs/9.txt");
const histories = lines.map((line) => line.split(" ").map((x) => Number(x)));

function extrapolate_last(history: number[]): number {
  const dif: number[] = [];
  for (let i = 1; i < history.length; i++) {
    const [prev, cur] = [history[i - 1], history[i]];
    dif.push(cur - prev);
  }

  console.log(dif);
  if (!(new Set(dif).size === 1 && dif[0] === 0)) {
    return dif[dif.length - 1] + extrapolate_last(dif);
  }

  return 0;
}

const differences = histories.map((h) => h[h.length - 1] + extrapolate_last(h));
histories.forEach((h, i) => {
  console.log("H:", h, differences[i]);
});

console.log(differences.reduce((a, b) => a + b, 0));
