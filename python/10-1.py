file = open("./inputs/10.txt", "r")
lines = file.readlines()
file.close()

matrix = [[c for c in line] for line in lines]
print(matrix)

sx, sy = 0, 0
for y in range(len(matrix)):
  line = matrix[y]
  for x in range(len(line)):
    if matrix[y][x] == 'S':
      sx = x
      sy = y

connectors = { 
  'top': ['|', 'F', '7', 'S'],
  'bottom': ['|', 'L', 'J', 'S'],
  'left': ['-', 'F', 'L', 'S'],
  'right': ['-', 'J', '7', 'S']
}

valid_dirs = {
  'S': ['top', 'bottom', 'left', 'right'],
  '-': ['left', 'right'],
  '|': ['top', 'bottom'],
  'F': ['bottom', 'right'],
  'L': ['right', 'top'],
  '7': ['left', 'bottom'],
  'J': ['left', 'top']
}

def get_at_dir(dir, x, y):
  try:
    if dir == 'top':
      return [matrix[y-1][x], x, y-1]
    elif dir == 'bottom':
      return [matrix[y+1][x], x, y+1]
    elif dir == 'left':
      return [matrix[y][x-1], x-1, y]
    else:
      return [matrix[y][x+1], x+1, y]
  except:
    return None

def get_connected(x, y):
  cur = matrix[y][x]
  cur_dirs = valid_dirs[cur]
  connected = []
  
  for d in cur_dirs:
    [pipe, px, py] = get_at_dir(d, x, y)
    if pipe in connectors[d]:
      connected.append((px, py))
  
  return connected

connected_s = get_connected(sx, sy)

steps = {}

for c in connected_s:
  px, py = sx, sy # Prev values
  cx, cy = c[0], c[1] # Curr values
  cur = matrix[cy][cx]
  cur_step = 1
  steps[f"{cx}-{cy}"] = cur_step
  
  print('starting with', c, cur)

  while cur != 'S':
    new_cur = [v for v in get_connected(cx, cy) if v[0] != px or v[1] != py][0]
    print(new_cur, matrix[new_cur[1]][new_cur[0]])
    px, py = cx, cy
    cx, cy = new_cur[0], new_cur[1]
    cur = matrix[cy][cx]
    cur_step += 1

    if cur == 'S': break
    
    key = f"{cx}-{cy}"
    if not key in steps:
      steps[key] = cur_step
    elif cur_step < steps[key]:
      steps[key] = cur_step
  
print(max(steps.values()))
    
    