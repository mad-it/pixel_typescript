import * as Finder from "./finder";
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
  let test_cases = parseInt(lines[0]);
  let t = 0;
  let i = 1;
  while (t < test_cases) {
    let size = lines[i].split(" ");
    i++;
    let m: number = parseInt(size[0]);
    let n: number = parseInt(size[1]);
    let input: number[][] = new Array(m);
    let row = 0;
    while (row < m) {
      input[row] = lines[i].split("").map((s) => parseInt(s));
      i++;
      row++;
    }
    console.log(`Test case ${t}:`, Finder.find_pixel_distances(input, m, n));
    t++;
  }
}
main();
