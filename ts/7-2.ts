import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

const log = createLog(false);
const lines = await readlines("./inputs/7.txt");

const handsAndBids = lines
  .map((line) => line.split(/\s+/g))
  .map((l) => ({
    hand: l[0],
    bid: BigInt(l[1]),
  }));

// prettier-ignore
const cardRanking = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", '2', 'J']

function qty<T>(item: T, arr: T[]) {
  return arr.filter((x) => x === item).length;
}

function getCardsRank(hand: string) {
  const cards = hand.split("");

  const cardsRank = cards.reduce((acc, card, i) => {
    const multiplier = BigInt(10 ** (10 - i * 2));
    const value = BigInt(cardRanking.toReversed().indexOf(card)) * multiplier;
    log("Card", card, "at position", i + 1, "has value", value);
    return acc + value;
  }, BigInt(0));

  return cardsRank;
}

function getHandRank(hand: string) {
  const cards = hand.split("");
  const uniqueCards = new Set(cards);

  if (uniqueCards.size === 1) {
    return BigInt(10 ** 18);
  } else if (uniqueCards.size === 2 && cards.some((c) => qty(c, cards) === 4)) {
    return BigInt(10 ** 17);
  } else if (uniqueCards.size === 2) {
    return BigInt(10 ** 16);
  } else if (uniqueCards.size === 3 && cards.some((c) => qty(c, cards) === 3)) {
    return BigInt(10 ** 15);
  } else if (uniqueCards.size === 3) {
    return BigInt(10 ** 14);
  } else if (uniqueCards.size === 4) {
    return BigInt(10 ** 13);
  } else {
    return BigInt(10 ** 12);
  }
}

function getBestRank(hand: string) {
  const cards = hand.split("");
  if (!cards.includes("J")) return getHandRank(hand) + getCardsRank(hand);

  const jIndexes = cards.reduce((acc, curr, i) => {
    if (curr === "J") return [...acc, i];
    return acc;
  }, [] as number[]);

  const substituted = substitutions(hand, jIndexes);
  let max = BigInt(0);
  substituted.forEach((sub) => {
    const rank = getHandRank(sub) + getCardsRank(hand);
    if (rank > max) max = rank;
  });
  return max;
}

function substitutions(hand: string, indexes: number[]) {
  const index = indexes[0];
  const results = [] as string[];
  for (const card of cardRanking.filter((c) => c !== "J")) {
    const replaced =
      hand.substring(0, index) + card + hand.substring(index + 1);
    if (indexes.length === 1) {
      results.push(replaced);
    } else {
      results.push(...substitutions(replaced, indexes.slice(1)));
    }
  }

  return results;
}

const withBest = handsAndBids.map((hb) => ({
  ...hb,
  rank: getBestRank(hb.hand),
}));

const sortedB = withBest.toSorted((a, b) => {
  return Number(a.rank - b.rank);
});
console.log(sortedB);

let totalB = BigInt(0);
sortedB.forEach((hb, i) => {
  const multiplier = BigInt(i + 1);
  totalB += hb.bid * multiplier;
});
console.log("Part two:", totalB); // should be I DONT KNOW
