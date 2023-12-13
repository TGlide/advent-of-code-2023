import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

const log = createLog(true);
const lines = await readlines("./inputs/7.txt");

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
    const multiplier = 10 ** (10 - i * 2);
    const value = cardRanking.toReversed().indexOf(card) * multiplier;
    log("Card", card, "at position", i + 1, "has value", value);
    return acc + value;
  }, 0);
  // log(cardsRank);

  if (uniqueCards.size === 1) {
    log(`Hand ${hand} is five of a kind`);
    return 10 ** 23 + cardsRank;
  } else if (uniqueCards.size === 2 && cards.some((c) => qty(c, cards) === 4)) {
    log(`Hand ${hand} is four of a kind`);
    return 10 ** 21 + cardsRank;
  } else if (uniqueCards.size === 2) {
    log(`Hand ${hand} is a full house`);
    return 10 ** 19 + cardsRank;
  } else if (uniqueCards.size === 3 && cards.some((c) => qty(c, cards) === 3)) {
    log(`Hand ${hand} is three of a kind`);
    return 10 ** 17 + cardsRank;
  } else if (uniqueCards.size === 3) {
    log(`Hand ${hand} is a two pair`);
    return 10 ** 15 + cardsRank;
  } else if (uniqueCards.size === 4) {
    log(`Hand ${hand} is a one pair`);
    return 10 ** 13 + cardsRank;
  } else {
    log(`Hand ${hand} is a high card`);
    return 10 ** 11 + cardsRank;
  }
}

const withRank = handsAndBids.map((hb) => ({
  ...hb,
  rank: getHandRank(hb.hand),
}));

const sorted = withRank.toSorted((a, b) => {
  return a.rank - b.rank;
});

let total = BigInt(0);
sorted.forEach((hb, i) => {
  const multiplier = BigInt(i + 1);
  total += hb.bid * multiplier;
  log(hb, hb.bid * multiplier, total);
});
// log(sorted);

console.log("Part one:", total); // should be 250232501
