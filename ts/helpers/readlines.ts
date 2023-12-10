export async function readlines(filepath: string) {
  const inputFile = Bun.file(filepath);
  const input = await inputFile.text();
  return input.split("\n");
}
