import * as Finder from "./algorithms/finder";
/**
 * This is the entry point function for the command line startup 
 * Accepts input from STDIN and executes out find_pixel_distances for every test case 
 */

export function main() {
  var fs = require("fs");
  console.log("Example input:");
  console.log(`
  2 
  3 4
  0001 
  0011 
  0110
  3 4
  1001
  1011
  1110
`);
  console.log("Enter your input:");
  console.log("Please press CMD+D (CTRL+D for windows) after input ");
  const input: string = fs.readFileSync("/dev/stdin").toString();
  
  let lines: string[] = input.split("\n");
  lines = lines.map((line)=>line.trim())
  //Read number of test cases
  let test_cases = parseInt(lines[0]);
  let t = 0;
  let current_line_number = 1;
  while (t < test_cases) {
    // Read the dimensions of the 2d array input
    let dimnesions = lines[current_line_number].split(" ");
    current_line_number++;
    let rows: number = parseInt(dimnesions[0]);
    let cols: number = parseInt(dimnesions[1]);
    let input: number[][] = new Array(rows);
    let row = 0;
    while (row < rows) {
      // Read a line for the row
      input[row] = lines[current_line_number].split("").map((s) => parseInt(s));
      current_line_number++;
      row++;
    }
    // Call the Finder function to display the results
    console.log(`Test case ${t} result:`, Finder.find_pixel_distances(input, rows, cols));
    t++;
  }
}
main();
