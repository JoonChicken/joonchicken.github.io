"""
Linear Algebra & Multivariable Calculus H (Period 2)
Project: Darcy Solver

Joon Heo
2/6/24
"""
import matplotlib.pyplot as plt
import numpy as np

##### inputs #####

area = 2  #cross-sectional area

segmentLengths = np.array([2, 1, 5, 2, 3])
k = np.array([1, 2, 5, 0.5, 3])
mu = np.array([0.5, 3, 2, 7, 2])
p_0 = 3
p_n = 5

###################

subdivs = segmentLengths.size

##### matrix stuff #####
M = np.zeros((subdivs - 1, subdivs - 1))
for i in range(subdivs - 1):       # Pattern of similar entries in main diagonal of matrix
    M[i][i] = -1 * area * (k[i] / (segmentLengths[i] * mu[i]) + k[i + 1] / (segmentLengths[i + 1] * mu[i + 1]))
for i in range (subdivs - 2):      # Another pattern in entries adjacent to main diagonal
    M[i][i + 1] = M[i + 1][i] = area * k[i + 1] / (segmentLengths[i + 1] * mu[i + 1])

b = np.zeros(subdivs - 1)
b[0] = -1 * k[0] * p_0 * area / (segmentLengths[0] * mu[0])
b[-1] = -1 * k[-1] * p_n * area / (segmentLengths[-1] * mu[-1])

p = np.linalg.solve(M, b)


##### Graphing #####
totLength = np.sum(segmentLengths)

p = np.insert(p, 0, p_0)
p = np.append(p, p_n)

x = np.array([0])
for i in range(subdivs):
    x = np.append(x, x[i] + segmentLengths[i])

print(x)
print(p)

fig, ax = plt.subplots()
ax.plot(x, p)
plt.show()
