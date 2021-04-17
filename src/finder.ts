/**
 * The program uses dynamic programming to store subproblem results for the distance to 
 * a white pixel from a certain pixel.
 * let d(i,j) = distance to nearest white pixel from pixel at i,j, where 0<=i<rows and 0<=j<columns
 * i,j = min(d(i-1,j), d(i,j-1), d(i+1,j), d(i,j+1))
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
export function find_pixel_distances(bitmap: number[][], rows: number, columns: number) {
    //Let's create dynamic programming storages to store subproblem results
  const left_right_distance: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    left_right_distance[i] = new Array(columns);
  }
  const right_left_distance: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    right_left_distance[i] = new Array(columns);
  }

  // The (i,j)th position in left_right_distance array stores the distance to the nearest white pixel
  // in bitmap from the (i,j) position in bitmap calculated from the left and the top directions.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (bitmap[row][col] != 1) {
        if (row == 0 && col == 0) {
            // More than the longest distance possible. This marks this node unreachable from 
            // a white pixel from left/top directions
          left_right_distance[row][col] = rows + columns + 1; 
        } else if (row == 0) {
          left_right_distance[row][col] = left_right_distance[row][col - 1] + 1;
        } else if (col == 0) {
          left_right_distance[row][col] = left_right_distance[row - 1][col] + 1;
        } else {
          left_right_distance[row][col] =
            Math.min(
              left_right_distance[row - 1][col],
              left_right_distance[row][col - 1]
            ) + 1;
        }
      } else {
        left_right_distance[row][col] = 0;
      }
    }
  }
  // The (i,j)th position in right_left_distance array stores the distance to the nearest white pixel
  // in bitmap from the (i,j) position in bitmap calculated from the right and the below directions.
  for (let row = rows - 1; row >= 0; row--) {
    for (let j = columns - 1; j >= 0; j--) {
      if (bitmap[row][j] != 1) {
        if (row == rows - 1 && j == columns - 1) {
             // More than the longest distance possible. This marks this node unreachable from 
            // a white pixel from right/below directions
          right_left_distance[row][j] = rows + columns + 1;
        } else if (row == rows - 1) {
          right_left_distance[row][j] = right_left_distance[row][j + 1] + 1;
        } else if (j == columns - 1) {
          right_left_distance[row][j] = right_left_distance[row + 1][j] + 1;
        } else {
          right_left_distance[row][j] =
            Math.min(
              right_left_distance[row + 1][j],
              right_left_distance[row][j + 1]
            ) + 1;
        }
      } else {
        right_left_distance[row][j] = 0;
      }
    }
  }

  // The nearest white pixel to a pixel at (i,j) is the minimum of the calculated distances
  // from left, right, top and below directions.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      left_right_distance[i][j] = Math.min(
        right_left_distance[i][j],
        left_right_distance[i][j]
      );
    }
  }
  return left_right_distance;
}
