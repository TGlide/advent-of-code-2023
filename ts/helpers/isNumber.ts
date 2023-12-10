export function isNumber(x: unknown): boolean {
  if (typeof x === "number") return !Number.isNaN(x);
  return !Number.isNaN(Number(x));
}
