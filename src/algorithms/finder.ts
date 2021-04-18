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
export const find_pixel_distances = (
  bitmap: number[][],
  rows: number,
  columns: number
):number[][] => {
  //Let's create dynamic programming storages to store subproblem results
  const left_top_distance: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    left_top_distance[i] = new Array(columns);
  }
  const right_below_distance: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    right_below_distance[i] = new Array(columns);
  }

  // The (i,j)th position in left_top_distance array stores the distance to the nearest white pixel
  // in bitmap from the (i,j) position in bitmap calculated from the left and the top directions.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      left_top_distance[row][col] = solve_subproblem_left_top(
        bitmap,
        row,
        col,
        left_top_distance,
        rows,
        columns
      );
    }
  }
  // The (i,j)th position in right_left_distance array stores the distance to the nearest white pixel
  // in bitmap from the (i,j) position in bitmap calculated from the right and the below directions.
  for (let row = rows - 1; row >= 0; row--) {
    for (let j = columns - 1; j >= 0; j--) {
      right_below_distance[row][j] = solve_subproblem_right_below(
        bitmap,
        row,
        j,
        rows,
        columns,
        right_below_distance
      );
    }
  }

  // The nearest white pixel to a pixel at (i,j) is the minimum of the calculated distances
  // from left, right, top and below directions.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      left_top_distance[i][j] = Math.min(
        right_below_distance[i][j],
        left_top_distance[i][j]
      );
    }
  }
  return left_top_distance;
}
/**
 * This solves the subproblem for i,j from right and below directions
 * @param bitmap the pixel bitmap. 1 represents a white pixel
 * @param row
 * @param j
 * @param rows
 * @param columns
 * @param right_below_distance
 * @returns
 */
const solve_subproblem_right_below = (
  bitmap: number[][],
  row: number,
  j: number,
  rows: number,
  columns: number,
  right_below_distance: number[][]
): number => {
  if (bitmap[row][j] === 1) {
    return 0;
  }

  if (row === rows - 1 && j === columns - 1) {
    // More than the longest distance possible. This marks this node unreachable from
    // a white pixel from right/below directions
    return rows + columns + 1;
  } else if (row === rows - 1) {
    return right_below_distance[row][j + 1] + 1;
  } else if (j === columns - 1) {
    return right_below_distance[row + 1][j] + 1;
  }
  return (
    Math.min(right_below_distance[row + 1][j], right_below_distance[row][j + 1]) + 1
  );
}
/**
 * This solves the subproblem for i,j from top and left directions
 * @param bitmap
 * @param row
 * @param col
 * @param left_top_distance
 * @param rows
 * @param columns
 * @returns
 */
const solve_subproblem_left_top = (
  bitmap: number[][],
  row: number,
  col: number,
  left_top_distance: number[][],
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
    return left_top_distance[row][col - 1] + 1;
  } else if (col === 0) {
    return left_top_distance[row - 1][col] + 1;
  }

  return (
    Math.min(left_top_distance[row - 1][col], left_top_distance[row][col - 1]) + 1
  );
}