"""
Linear Algebra & Multivariable Calculus H (Period 2)
Project: Runge-Kutta Solver + EC

Joon Heo
12/7/23
"""
import matplotlib.pyplot as plt
from numpy import *


#####################################
#    Tableaus (Tableaux???)         #
#####################################
def pickTab(tabName):
    tabList = dict(
        RK4 = dict(A = [[0],
                        [0.5],
                        [0.0, 0.5],
                        [0.0, 0.0, 1.0]],
                    C = [0.0, 0.5, 0.5, 1.0],
                    B = [1 / 6, 1 / 3, 1 / 3, 1 / 6])
        ,

        RK3 = dict(A = [0,
                        [1 / 2],
                        [-1.0, 2.0]],
                   B = [0.0, 1 / 2, 1.0],
                   C = [1 / 6, 2 / 3, 1 / 6])
        ,

        RK38 = dict(A = [[0],
                         [1 / 3],
                         [-1 / 3, 1],
                         [1.0, -1.0, 1.0]],
                    C = [0.0, 1 / 3, 2 / 3, 1.0],
                    B = [1 / 8, 3 / 8, 3 / 8, 1 / 8])
        ,

        Euler = dict(A = [0.0],
                     C = [0.0],
                     B = [1.0])
        ,

        ImplicitEuler = dict(A = [1],
                             C = [1],
                             B = [1])
    )
    return tabList[tabName]



#####  Inputs  ######################################
xi = -1.0                                           #
xf = 6.0                                            #
yi = 3.0                                            #
dx = 0.5                                            #
                                                    #
# Today's choice cuts from the Butcher:             #
#   - RK4                                           #
#   - RK3                                           #
#   - RK38                                          #
#   - Euler                                         #
#   - ImplicitEuler                                 #
                                                    #
Tab = pickTab("RK4")                                #
                                                    #
# Also choose a Dx (dy/dx) and optionally F(x)      #
# below in the Setup section                        #
                                                    #
#####################################################



#####################################
#    Setup                          #
#####################################
x = arange(xi, xf + dx, dx)     # set up increments of x
y = [yi]                        # first y-value is given

def Dx(x, y):               # define dy/dx
    #return cos(x)
    return 2 * cos(x) - x * sin(x)

def Fx(x, xi, yi):          # define original function for graphing later
    #return yi - sin(xi) + sin(x)
    return (yi - sin(xi) - xi * cos(xi)) + sin(x) + x * cos(x)

def Dot(A, B):              # function for dot product
    output = 0.0
    for i in range(len(A)):
        output += A[i] * B[i]
    return output



#####################################
#    RK                             #
#####################################
def RK(Tab, xi, xf, y, dx):
    A = Tab["A"]                    # get and initialize tableau lists
    C = Tab["C"]
    B = Tab["B"]

    currentX = xi                   # initialize x-value of current step (incremented per step)

    while xf - currentX > 0.0000001:
        k = [Dx(currentX, y[-1])]   # initialize slope list

        for i in range(1, len(C)):
            k.append(Dx(currentX + C[i] * dx, Dot(A[i], k) * dx))   # append slopes with general k formula

        y.append(y[-1] + Dot(B, k) * dx)    # append to y-value list according to formula

        currentX += dx              # increment current x-value (go to x-val of next step)



RK(Tab, xi, xf, y, dx)          # call main RK function



#####################################
#    Graphing                       #
#####################################
xOrig = arange(xi, xf, 0.02)
yOrig = Fx(xOrig, xi, yi)       # set up given function Fx

fig, ax = plt.subplots()
ax.plot(xOrig, yOrig)           # plot Fx
ax.plot(x, y)                   # plot estimation from lists x and y
plt.show()