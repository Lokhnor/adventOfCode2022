import fs from "fs";

function readInput(): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile("day1.txt", "utf-8", (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

async function totalCalories() {
  const data = await readInput();
  const array = data.split("\r\n"); // new line & whitespace

  // should return this from func, instead of declaring here
  let calPerElf: number[] = [0]; // initialised as a 0 so I can add to it
  let calPerElfIndex = 0;

  // should use map & reduce instead
  for (let i = 0; i < array.length; i++) {
    // i magic number(its the index, but still)
    if (i === 0) {
      calPerElf[calPerElfIndex] += parseInt(array[i], 10);
      i++;
    }

    if (array[i] === "") {
      calPerElfIndex++;
      calPerElf.push(0); // or the next one will be undefined
    } else {
      // should be a push instead, that way I wont have to worry about undefined
      calPerElf[calPerElfIndex] += parseInt(array[i], 10);
    }
  }

  return calPerElf;
}

async function elvesWithMostCalories() {
  const array = await totalCalories();

  let topElfIndex = 0;
  let topElfCalories = array.reduce((previous, current, position) => {
    if (current > previous) {
      topElfIndex = position;
      return current;
    }
    return previous;
  }, array[0]);

  console.log(
    `The elf with the most calories is in position: ${
      topElfIndex + 1
    }, with ${topElfCalories} calories`
  );

  const topThreeElves = array
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, num) => total + num);

  console.log(`The top three elves have: ${topThreeElves} calories`);
}
elvesWithMostCalories();
