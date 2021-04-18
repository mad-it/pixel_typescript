/**
 * The program uses dynamic programming to store subproblem results for the distance to
 * a white pixel from a certain pixel.
 * let d(i,j) = distance to nearest white pixel from pixel at i,j, where 0<=i<rows and 0<=j<columns
 * d(i,j) = min(d(i-1,j), d(i,j-1), d(i+1,j), d(i,j+1))
 *
 * TIME COMPLEXITY: O(MN) [or just O(N^2)]
 * SPACE COMPLEXITY: O(MN) [or just O(N^2)]
 *
 * @param bitmap the pixel bitmap. 1 represents a white pixel
 * @param rows
 * @param columns
 * @returns returns a 2D map indicating the mininmum distance to the closest white pixel from every position in
 * the input bitmap
 */
export const findPixelDistances = (
  bitmap: number[][],
  rows: number,
  columns: number
):number[][] => {
  //Let's create dynamic programming storages to store subproblem results
  const leftTopDistance: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    leftTopDistance[i] = new Array(columns);
  }
  const rightBelowDistance: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    rightBelowDistance[i] = new Array(columns);
  }

  // The (i,j)th position in left_top_distance array stores the distance to the nearest white pixel
  // in bitmap from the (i,j) position in bitmap calculated from the left and the top directions.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      leftTopDistance[row][col] = solveSubproblemLeftTop(
        bitmap,
        row,
        col,
        leftTopDistance,
        rows,
        columns
      );
    }
  }
  // The (i,j)th position in right_left_distance array stores the distance to the nearest white pixel
  // in bitmap from the (i,j) position in bitmap calculated from the right and the below directions.
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = columns - 1; col >= 0; col--) {
      rightBelowDistance[row][col] = solveSubProblemRightBelow(
        bitmap,
        row,
        col,
        rows,
        columns,
        rightBelowDistance
      );
    }
  }

  // The nearest white pixel to a pixel at (i,j) is the minimum of the calculated distances
  // from left, right, top and below directions.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      leftTopDistance[i][j] = Math.min(
        rightBelowDistance[i][j],
        leftTopDistance[i][j]
      );
    }
  }
  return leftTopDistance;
}
/**
 * This solves the subproblem for i,j from right and below directions
 * @param bitmap the pixel bitmap. 1 represents a white pixel
 * @param row
 * @param col
 * @param rows
 * @param columns
 * @param rightBelowDistance
 * @returns
 */
const solveSubProblemRightBelow = (
  bitmap: number[][],
  row: number,
  col: number,
  rows: number,
  columns: number,
  rightBelowDistance: number[][]
): number => {
  if (bitmap[row][col] === 1) {
    return 0;
  }

  if (row === rows - 1 && col === columns - 1) {
    // More than the longest distance possible. This marks this node unreachable from
    // a white pixel from right/below directions
    return rows + columns + 1;
  } else if (row === rows - 1) {
    return rightBelowDistance[row][col + 1] + 1;
  } else if (col === columns - 1) {
    return rightBelowDistance[row + 1][col] + 1;
  }
  return (
    Math.min(rightBelowDistance[row + 1][col], rightBelowDistance[row][col + 1]) + 1
  );
}
/**
 * This solves the subproblem for i,j from top and left directions
 * @param bitmap
 * @param row
 * @param col
 * @param leftTopDistance
 * @param rows
 * @param columns
 * @returns
 */
const solveSubproblemLeftTop = (
  bitmap: number[][],
  row: number,
  col: number,
  leftTopDistance: number[][],
  rows: number,
  columns: number
): number => {
  if (bitmap[row][col] === 1) {
    return 0;
  }

  if (row === 0 && col === 0) {
    // More than the longest distance possible. This marks this node unreachable from
    // a white pixel from left/top directions
    return rows + columns + 1;
  } else if (row === 0) {
    return leftTopDistance[row][col - 1] + 1;
  } else if (col === 0) {
    return leftTopDistance[row - 1][col] + 1;
  }

  return (
    Math.min(leftTopDistance[row - 1][col], leftTopDistance[row][col - 1]) + 1
  );
}