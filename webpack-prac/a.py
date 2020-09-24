a = [1,2,3,4,5]

print(a)
def f(*args):
    for s in [*args]:
        print(s)


f(a, a, a)