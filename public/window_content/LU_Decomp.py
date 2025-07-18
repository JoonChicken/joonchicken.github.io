"""
Linear Algebra & Multivariable Calculus H (Period 2)
Extra Credit: Lower Upper Decomposition

Joon Heo
8/21/23
"""

def lud(A, ROWS, COLUMNS):
    if len(A) != len(A[0]):
        print("Error: Matrix not square.")
        return "Not Found"

    det = 1 # Initialize determinant

    for i in range(COLUMNS - 1):
        pivotValue = A[i][i] # New pivot
        if abs(pivotValue) < 0.000001: # If pivot is 0 (accounting for float precision errors), try to swap with another row
            newPivotFound = False
            for n in range(i+1, ROWS): # Iterate through rows until new nonzero pivot found (accounting for precision errors)
                if abs(A[n][i]) > 0.000001:
                    det *= -1 # Every swap, multiply det by -1
                    for x in range(COLUMNS): # Iterate through columns, swapping the cols of 2 rows
                        A[i][x], A[n][x] = A[n][x], A[i][x] # Swapping
                    pivotValue = A[i][i] # New pivot
                    newPivotFound = True
            if not newPivotFound: # If nonzero pivot not found then well rip
                print("Error: No valid pivot found in column: " + str(i+1))
                return "Not Found"

        for j in range(i+1, ROWS): # Row operations
            ratio = A[j][i] / pivotValue # Find ratio between two rows
            for k in range(COLUMNS):
                A[j][k] -= ratio * A[i][k] # Subtract ratio * pivot row from current row

    # Since this method produces a lower matrix with a main diagonal of all 1s,
    # I elected not to calculate it

    for i in range(COLUMNS): # Find det with main diagonal of upper matrix
        det *= A[i][i]

    return det

    

ROWS = int(input("Enter number of ROWS: "))
COLUMNS = int(input("Enter number of COLUMNS: "))

M = []
validMatrix = True

print("\nEnter entries in a single row of a matrix, separated by spaces:")
for n in range(ROWS):
    rowInput = list(input("Row " + str(n + 1) + ": ").split())
    newRowInput = []
    for element in rowInput:
        newRowInput.append(float(element))
    M.append(newRowInput)
    if len(rowInput) != COLUMNS:
        print("Error: number of entries does not match the number of COLUMNS")
        validMatrix = False
        break


if validMatrix:
    print("\ndet: " + str(lud(M, ROWS, COLUMNS))) # Prints determinant, if found, or "Not Found"