# Find nearest White
The program uses dynamic programming to store subproblem results for the distance to a white pixel from a certain pixel.
Read comments for detailed understanding.
Basic algorithm:
- let d(i,j) = distance to nearest white pixel from pixel at i,j, where 0<=i<rows and 0<=j<columns
- d(i,j) = min(d(i-1,j), d(i,j-1), d(i+1,j), d(i,j+1))
- TIME COMPLEXITY: O(MN) [or just O(N^2)]
- SPACE COMPLEXITY: O(MN) [or just O(N^2)]

## Structure

The project uses a minimalistic setup that is sufficient for running an in-memory small application. 
Jest is used for unit testing.
# Assumptions
The project setup or input/output is not considered to be the most important part of this evaluation.

This excercise is more algorithmic and focus on the time and space complexity is given.

For the command-line application, minimalistic validations are done.

In the improvements we can add validations for commandline app and simulate stdin for testing. But this is out of the scope of the project.
## Setup

``yarn install``
## Running tests
``yarn test``
## Running the command-line
``yarn start``

The project runs a stdin program and executes when the input is terminated. The instructions are displayed when you run it.

## Task
There is given a rectangular bitmap of size n*m. Each pixel of the bitmap is either white or
black, but at least one is white. The pixel in i-th line and j-th column is called the pixel (i,j). The
distance between two pixels p1=(i1,j1) and p2=(i2,j2) is defined as d(p1,p2)=|i1-i2|+|j1-j2|.
Write a program which:
- reads the description of the bitmap from the standard input;
- for each pixel, computes the distance to the nearest white;
- writes the results to the standard output.
## Input
  The number of test cases t (1≤t≤1000) is in the first line of input, then t test cases follow
  separated by an empty line. In the first line of each test case there is a pair of integer numbers
  n, m separated by a single space, 1<=n <=182, 1<=m<=182. In each of the following n lines of
  the test case exactly one zero-one word of length m, the description of one line of the bitmap, is
  written. On the j-th position in the line (i+1), 1 <= i <= n, 1 <= j <= m, is '1' if, and only if the pixel
  (i,j) is white.
## Output
  In the i-th line for each test case, 1<=i<=n, there should be written m integers f(i,1),...,f(i,m)
  separated by single spaces, where f(i,j) is the distance from the pixel (i,j) to the nearest white
  pixel. Example:
  
 Input:
 
  ```
  1

  3 4

  0001

  0011

  0110
  ```

Output:
```
  3 2 1 0
  2 1 0 0
  1 0 0 1
  ```
