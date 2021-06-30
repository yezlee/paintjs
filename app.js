const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

// Gotta define a pixel modifier!!!
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWith = 2.5;
// ctx.fillRect(50, 20, 100, 49);

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// Dont need this anymore
// function onMouseDown(event) {
//   painting = true;
// }

// 매번 이렇게 painting을 false로 만들기 귀찮아서 함수로 만들어서 실행시킴
// 그래서 이렇게 작성할 필요도 없이 아래 mouseleave할때 stopPainting이라는 함수를 실행시킴 된다.
// function onMouseLeave(event) {
//   painting = false;
// }

function handleColorClick(event) {
  // console.log(event.target.style);
  // console.log(event);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // overiding strokeStyle
  ctx.fillStyle = color;
  // console.log(color);
}

function handleRangeChange(event) {
  // console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// console.log(colors); //const colors = document.getElementsByClassName("jsColor");
// console.log(Array.from(colors));

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
// forEach로 color를 돌려서 addEventListener("click", handleColorClick)를 호출함
// color는 매개변수. 그냥 이 array안에 있는 각각의 아이템(여기서는 each div)들을 대표하는 것 뿐임. - color대신에 아무이름 써도 상관없음

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
