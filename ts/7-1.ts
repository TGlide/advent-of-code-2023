import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

const log = createLog(false);
const lines = await readlines("./inputs/7-ex2.txt");

const handsAndBids = lines
  .map((line) => line.split(/\s+/g))
  .map((l) => ({
    hand: l[0],
    bid: BigInt(l[1]),
  }));

// prettier-ignore
const cardRanking = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", '2']

function qty<T>(item: T, arr: T[]) {
  return arr.filter((x) => x === item).length;
}

function getHandRank(hand: string) {
  const cards = hand.split("");
  const uniqueCards = new Set(cards);

  const cardsRank = cards.reduce((acc, card, i) => {
    const multiplier = BigInt(10 ** (10 - i * 2));
    const value = BigInt(cardRanking.toReversed().indexOf(card)) * multiplier;
    log("Card", card, "at position", i + 1, "has value", value);
    return acc + value;
  }, BigInt(0));
  // log(cardsRank);

  if (uniqueCards.size === 1) {
    return BigInt(10 ** 18) + cardsRank;
  } else if (uniqueCards.size === 2 && cards.some((c) => qty(c, cards) === 4)) {
    return BigInt(10 ** 17) + cardsRank;
  } else if (uniqueCards.size === 2) {
    return BigInt(10 ** 16) + cardsRank;
  } else if (uniqueCards.size === 3 && cards.some((c) => qty(c, cards) === 3)) {
    return BigInt(10 ** 15) + cardsRank;
  } else if (uniqueCards.size === 3) {
    return BigInt(10 ** 14) + cardsRank;
  } else if (uniqueCards.size === 4) {
    return BigInt(10 ** 13) + cardsRank;
  } else {
    return BigInt(10 ** 12) + cardsRank;
  }
}

const withRank = handsAndBids.map((hb) => ({
  ...hb,
  rank: getHandRank(hb.hand),
}));

const sorted = withRank.toSorted((a, b) => {
  return Number(a.rank - b.rank);
});

let total = BigInt(0);
sorted.forEach((hb, i) => {
  const multiplier = BigInt(i + 1);
  total += hb.bid * multiplier;
});

console.log("Part one:", total); // should be 250232501
