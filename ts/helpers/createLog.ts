export function createLog(enabled: boolean) {
  return (...args: Parameters<typeof console.log>) => {
    if (enabled) console.log(...args);
  };
}
