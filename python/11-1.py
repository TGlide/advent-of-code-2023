file = open("./inputs/11-ex.txt", "r")
lines = file.readlines()
file.close()

def print_matrix(m):
  print("\n".join([" ".join(l) for l in m]))

def transpose(m):
  inverted = []
  for x in range(len(m[0])):
    inverted.append([])
    for y in range(len(m)):
      char = m[y][x]
      inverted[x].append(char)
  
  return inverted
  
def is_empty_row(row):
  return len(list(filter(lambda x: x == '#', row))) == 0

def to_empty(row):
  return ['.'for _ in row]

def expand(matrix):
  transposed = transpose(matrix)

  empty_rows = [i for i in range(len(matrix)) if is_empty_row(matrix[i])]
  print(empty_rows)

  empty_cols  = [i for i in range(len(transposed)) if is_empty_row(transposed[i])]
  print(empty_cols)

  m = matrix[:]
  i = 0;
  offset = 0
  while i < len(m):
    oi = i - offset
    if oi in empty_rows:
      m = m[:i] + [to_empty(m[i])] + m[i:]
      i += 2
      offset += 1
    else:
      i += 1

  m = transpose(m)
  i = 0
  offset = 0
  while i < len(m):
    oi = i - offset
    if oi in empty_cols:
      m = m[:i] + [to_empty(m[i])] + m[i:]
      i += 2
      offset += 1
    else:
      i += 1

  m = transpose(m)

  return m

matrix = [[c for c in l.strip()] for l in lines]
print_matrix(matrix)

expanded = expand(matrix)
print_matrix(expanded)








