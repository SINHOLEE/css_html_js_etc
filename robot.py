A, B = map(int, input().split())
N, M = map(int, input().split())

board = [[0] * A for _ in range(B)]

# print(directopn['E'],directopn['E']["dy"],directopn['E']["dx"])
      # s e,n,w
dy = [-1, 0, 1, 0]
dx = [0, 1, 0, -1]

robots = [[0,0,0] for _ in range(N+1)]
for i in range(N):
  x, y, d = map(str, input().split())
  if d == 'S':
    d = 0
  elif d == 'E':
    d = 1
  elif d == 'N':
    d = 2
  else:
    d = 3

  robots[i + 1] = [int(y) - 1, int(x) - 1, d]  # y, x , d
  board[int(y) - 1][int(x) - 1] = i + 1

for i in range(M):
  robot, command, rnd = map(str, input().split())
  robot = int(robot) - 1
  rnd = int(rnd)
  
  if (command == "F"):
    res = get_message_f(robot, rnd)
    if (not res){
      break
    }
  if (command == "L"):
    print('L')
  if (command == "R"):
    print('R')
print(robots)

def get_message_f(robot, rnd):
  y, x, d = robots[robot]

  for i in range(rnd):
    newY, newX = y + dy[d], x + dx[d]
    if not (0 <= newY < B and 0 <= newX < A):
      return 'Robot %d crashes into the wall' % robot
    if board[newY][newX]:
      return 'Robot %d crashes into robot %d' % (robot, board[newY][newX])
    y, x = newY, newX
  board[y][x] = robot
  return 0  