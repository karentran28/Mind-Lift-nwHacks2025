const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let userPath = [];
let score = 0;
let currentShape = 'triangle';
const shapes = ['triangle', 'rectangle', 'circle', 'star'];

// Draw pre-defined shapes
function drawOutline() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#aaa';
  ctx.lineWidth = 2;

  if (currentShape === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.lineTo(200, 300);
    ctx.closePath();
    ctx.stroke();
  } else if (currentShape === 'rectangle') {
    ctx.beginPath();
    ctx.rect(100, 100, 200, 150);
    ctx.stroke();
  } else if (currentShape === 'circle') {
    ctx.beginPath();
    ctx.arc(200, 200, 100, 0, 2 * Math.PI);
    ctx.stroke();
  } else if (currentShape === 'star') {
    ctx.beginPath();
    const cx = 200, cy = 200, spikes = 5, outerRadius = 100, innerRadius = 50;
    let rot = Math.PI / 2 * 3;
    let x = cx, y = cy;
    const step = Math.PI / spikes;

    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.stroke();
  }
}

// Start tracing
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  userPath = [];
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.beginPath();
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.moveTo(x, y);
  userPath.push({ x, y });
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    userPath.push({ x, y });
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.closePath();
});

// Reset canvas
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
  currentShape = shapes[Math.floor(Math.random() * shapes.length)];
  drawOutline();
  score = 0;
  document.getElementById('score').textContent = `Score: ${score}`;
});

// Submit tracing
const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
  const accuracy = Math.round(calculateAccuracy(userPath) * 100);
  // score = Math.round(accuracy * 100);
  document.getElementById('score').textContent = `Accuracy: ${accuracy}%`;
});

// Calculate accuracy
function calculateAccuracy(path) {
  const idealPathLength = {
    triangle: 565,
    rectangle: 700,
    circle: 628,
    star: 700
  }[currentShape];

  let userPathLength = 0;
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i - 1].x;
    const dy = path[i].y - path[i - 1].y;
    userPathLength += Math.sqrt(dx * dx + dy * dy);
  }
  return Math.min(userPathLength / idealPathLength, 1); // Limit accuracy to 1 (100%)
}

// Initialize
window.onload = () => {
  currentShape = shapes[Math.floor(Math.random() * shapes.length)];
  drawOutline();
};

module.exports = { html, js };