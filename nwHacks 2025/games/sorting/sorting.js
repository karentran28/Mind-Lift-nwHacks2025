const blockContainer = document.getElementById("block-container");
const leftBin = document.getElementById("left-bin");
const rightBin = document.getElementById("right-bin");
const scoreContainer = document.getElementById("score-container");

let score = 0;

const colors = ["red", "blue"];
const targetBins = {
  red: "left", // Red goes to the left bin
  blue: "right", // Blue goes to the right bin
};

function createBlock() {
  const block = document.createElement("div");
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  block.classList.add("block");
  block.style.backgroundColor = randomColor;
  block.setAttribute("data-color", randomColor);
  blockContainer.appendChild(block);
}

function handleSort(event) {
  if (event.repeat) return;

  const block = blockContainer.querySelector(".block");
  if (!block) return;

  const color = block.getAttribute("data-color");
  const target = targetBins[color];

  if (
    (event.key === "ArrowLeft" && target === "left") ||
    (event.key === "ArrowRight" && target === "right")
  ) {
    score++;
    block.remove();
    createBlock();
  } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    score--;
    block.remove();
    createBlock();
  }

  scoreContainer.textContent = `Score: ${score}`;
}
document.addEventListener("keydown", handleSort);

createBlock();
