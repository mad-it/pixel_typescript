import * as Finder from "../../src/algorithms/finder";

test("Test happy cases", () => {
  
  const arr = [
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ];
  expect(Finder.findPixelDistances(arr, 3, 4)).toEqual([
    [3, 2, 1, 0],
    [2, 1, 0, 0],
    [1, 0, 0, 1],
  ]);
});

test("Test edge cases", () => {
  const horizontal = [[0, 0, 0, 1]];
  expect(Finder.findPixelDistances(horizontal, 1, 4)).toEqual([[3, 2, 1, 0]]);
  const vertical = [[0], [0], [0], [1]];
  expect(Finder.findPixelDistances(vertical, 4, 1)).toEqual([
    [3],
    [2],
    [1],
    [0],
  ]);
});

test("Test empty inputs", () => {
  expect(Finder.findPixelDistances([[]], 0, 0)).toEqual([]);
  expect(Finder.findPixelDistances([], 0, 0)).toEqual([]);
});

test("Test unexpected inputs", () => {
  const arr = [
    [0, 0],
    [0, 0],
  ];
  expect(Finder.findPixelDistances(arr, 2, 2)).toEqual([
    [5, 6],
    [6, 5],
  ]);
});
