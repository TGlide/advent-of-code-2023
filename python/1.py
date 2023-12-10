# Helpers
number_words = [
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

def extract_num_from_text(text: str) -> int | None:
  for nw in number_words:
    if nw in text:
      return number_words.indexOf(nw) + 1
    
  return None

# Main
file = open("./inputs/1.txt", "r")
lines = file.readlines()
file.close()

def part_one():
  numbers = []

  for line in lines:
    first = None;
    last = None;

    for char in list(line):
      if char.isnumeric():
        if first == None:
          first = char
        last = char;
      
    num = int(f"{first}{last}");
    numbers.append(num);

  return sum(numbers);

print("Part one:", part_one());

# def part_two() {
#   const numbers = [] as number[];

#   lines.forEach((line) => {
#     let first: string | null = null;
#     let last: string | null = null;
#     let textSoFar = "";

#     line.split("").forEach((char) => {
#       textSoFar += char;

#       if (extractNumFromText(textSoFar)) {
#         const num = extractNumFromText(textSoFar);
#         if (first === null) {
#           first = `${num}`;
#         }
#         last = `${num}`;
#         textSoFar = "";
#       } else if (isNumber(char)) {
#         if (first === null) {
#           first = char;
#         }
#         last = char;
#       }
#     });

#     const num = Number(`${first}${last}`);
#     numbers.push(num);
#   });

#   return sum(numbers);
# }

# console.log("Part two:", partTwo());
