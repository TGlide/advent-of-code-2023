import { createLog } from "./helpers/createLog";
import { readlines } from "./helpers/readlines";

const log = createLog(true);
const lines = await readlines("./inputs/7-ex.txt");

const handsAndBids = lines
  .map((line) => line.split(/\s+/g))
  .map((l) => ({
    hand: l[0],
    bid: Number(l[1]),
  }));

// prettier-ignore
const cardRank = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", '2']

function qty<T>(item: T, arr: T[]) {
  return arr.filter((x) => x === item).length;
}

function getHandRank(hand: string) {
  const cards = hand.split("");
  const uniqueCards = new Set(cards);

  if (uniqueCards.size === 1) {
    return "Five of a kind";
  } else if (uniqueCards.size === 2 && cards.some((c) => qty(c, cards) === 4)) {
    return "Four of a kind";
  } else if (uniqueCards.size === 2) {
    return "Full house";
  } else if (uniqueCards.size === 3 && cards.some((c) => qty(c, cards) === 3)) {
    return "Three of a kind";
  } else if (uniqueCards.size === 3) {
    return "Two pair";
  } else if (uniqueCards.size === 4) {
    return "One pair";
  } else {
    return "High card";
  }
}

handsAndBids.forEach((hb) => {
  log(hb, getHandRank(hb.hand));
});
