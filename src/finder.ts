export function find_pixel_distances(bitmap: number[][], rows: number, columns: number) {
  const left_right_distance: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    left_right_distance[i] = new Array(columns);
  }
  const right_left_distance: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    right_left_distance[i] = new Array(columns);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (bitmap[row][col] != 1) {
        if (row == 0 && col == 0) {
          left_right_distance[row][col] = rows + columns + 1; // 1 more than the longest distance possible
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

  for (let row = rows - 1; row >= 0; row--) {
    for (let j = columns - 1; j >= 0; j--) {
      if (bitmap[row][j] != 1) {
        if (row == rows - 1 && j == columns - 1) {
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
