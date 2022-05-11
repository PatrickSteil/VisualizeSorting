// original: https://editor.p5js.org/codingtrain/sketches/vic6Qzo-j
// changed from quicksort to icantbelieveitsorts
let values = [];
let w = 15;

let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  icantbelieveitcansort(values, 0, values.length-1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

async function insertion(arr) {
  let key = 0;
  for (let i = 1; i < arr.length; i++) {
    states[i] = 1;
    key = arr[i];
    let j = i - 1;
    while (j >= 0 && key < arr[j]) {
      states[j] = 0;
      arr[j + 1] = arr[j];
      await sleep(50);
      states[j] = -1;
      j -= 1;
    }
    arr[j + 1] = key;
    states[i] = -1;
  }
}

async function bubblesort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      states[j] = 0;
      states[j + 1] = 0;
      if (arr[j] > arr[j + 1]) {
        await swap(arr, j, j + 1);
      }
      states[j + 1] = -1;
      states[j] = -1;
    }
    states[arr.length - i - 1] = 1;
  }
}

async function icantbelieveitcansort(arr) {
  for (let i = 1; i < values.length; i++) {
    states[i] = 0;
    for (let j = 0; j < i; j++) {
      states[j] = 1;
      if (arr[i] < arr[j]) {
        await swap(arr, i, j);
      }
      states[j] = -1;
    }
    states[i] = -1;
  }
}
 

function draw() {
  background(0);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill("#E0777D");
    } else if (states[i] == 1) {
      fill("#D6FFB7");
    } else {
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

async function swap(arr, a, b) {
  await sleep(50);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
