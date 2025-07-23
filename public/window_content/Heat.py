"""
Linear Algebra & Multivariable Calculus H (Period 2)
A Heat Equation Solver Utilizing the Forward Finite Difference Method

Most of the code is shamelessly stolen from somebody on Medium
https://medium.com/@matiasortizdiez/beginners-introduction-to-natural-simulation-in-python-i-solving-the-heat-equation-bf0ae5d4c37f
Modified by Joon Heo
3/31/24
"""
import numpy
from matplotlib import pyplot


##### Manual inputs of initial values #####

length = 9
k = 1/25
temp_left = -200
temp_right = 1000

total_time = 150

dx = 0.9
dt = 0.19

###########################################


x_vec = numpy.linspace(0, length, int(length/dx))
t_vec = numpy.linspace(0, total_time, int(total_time/dt))

u = numpy.zeros([len(t_vec), len(x_vec)])


##### Initial temps #####

index = 0
for x in x_vec:
    u[:, index] = 0
    index += 1

u[:, 0] = temp_left
u[:, -1] = temp_right


##### Calculate #####

for t in range(1, len(t_vec)-1):
    for x in range(1, len(x_vec)-1):
        u[t+1, x] = k * (dt / dx**2) * (u[t, x+1] - 2*u[t, x] +
                                        u[t, x-1]) + u[t, x]

    pyplot.plot(x_vec, u[t], 'black')
    pyplot.pause(.0001)
    pyplot.cla()


print(x_vec)
print(u)

pyplot.plot(x_vec, u[0])
pyplot.ylabel("Temperature (C˚)")
pyplot.xlabel("Distance Along Rod (m)")
pyplot.show()