import * as Finder from "./algorithms/finder";
/**
 * This is the entry point function for the command line startup
 * Accepts input from STDIN and executes out findPxelDistances for every test case
 *
 * Assumption: Minimalistic validations are done for stdin.
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
  try {
  let lines: string[] = input.split("\n");
  lines = lines.map((line) => line.trim());
  //Read number of test cases
  const testCases = parseInt(lines[0]);
  let t = 0;
  let currentIndex = 1;
 
    while (t < testCases) {
      try {
        // Read the dimensions of the 2d array input
        let dimnesions = lines[currentIndex].split(" ");
        currentIndex++;
        const rows: number = parseInt(dimnesions[0]);
        const cols: number = parseInt(dimnesions[1]);
        const input: number[][] = new Array(rows);
        let row = 0;
        while (row < rows) {
          // Read a line for the row
          input[row] = lines[currentIndex].split("").map((s) => parseInt(s));
          if(input[row].length < cols){
            console.error(`Test case ${t} is invalid. Number of elements in row ${row} should be minimum ${cols}`)
            return;
          }
          currentIndex++;
          row++;
        }
        // Call the Finder function to display the results
        console.log(
          `Test case ${t} result:`,
          Finder.findPixelDistances(input, rows, cols)
        );
      } catch (e) {
        console.error(`Test case ${t} is not in an expected format`, e);
      }

      t++;
    }
  } catch (e) {
    console.log("Invalid input. Check the example input for reference");
  }
}
main();
