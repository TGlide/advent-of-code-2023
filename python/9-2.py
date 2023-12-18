file = open("./inputs/9.txt", "r")
lines = file.readlines()
file.close()

histories = [[int(x) for x in line.split(' ')] for line in lines]
# print(histories)

def extrapolate_first(history):
  dif = []
  for i in range (1, len(history)):
    prev, cur = history[i-1], history[i]
    dif.append(cur - prev)
  
  print(dif)
  if not (len(set(dif)) == 1 and dif[0] == 0):
    return dif[0] - extrapolate_first(dif)
  
  return 0


differences = [h[0] - extrapolate_first(h)  for h in histories]
for i in range (len(histories)):
  print('H:', histories[i])
  print("NH:", [differences[i]] + histories[i])
  print()

print(sum(differences))
    