const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

const videoElement = document.getElementById("webcam");
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480,
});

camera.start();

// Gesture Control
hands.onResults((results) => {
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0];

    const wrist = landmarks[0];
    const middleFingerTip = landmarks[12];
    const indexTip = landmarks[8];

    if (Math.abs(indexTip.x - wrist.x) > Math.abs(indexTip.y - wrist.y)) {
      if (indexTip.x > wrist.x) {
        console.log("Hand is pointing right.");
        triggerKeyPress("ArrowRight");
      } else {
        console.log("Hand is pointing left.");
        // triggerKeyPress("ArrowLeft");
      }
    } else {
      if (indexTip.y > wrist.y) {
        console.log("Hand is pointing down.");
        // triggerKeyPress("ArrowDown");
      } else {
        console.log("Hand is pointing up.");
        // triggerKeyPress("ArrowUp");
      }
    }

    const cursorX = window.innerWidth - indexTip.x * window.innerWidth;
    const cursorY = indexTip.y * window.innerHeight;

    const customCursor = document.getElementById("customCursor");
    customCursor.style.left = `${cursorX - customCursor.offsetWidth / 2}px`;
    customCursor.style.top = `${cursorY - customCursor.offsetHeight / 2}px`;

    const thumbTip = landmarks[4];
    const distance = Math.sqrt(
      Math.pow(indexTip.x - thumbTip.x, 2) +
        Math.pow(indexTip.y - thumbTip.y, 2)
    );

    if (distance < 0.09) {
      console.log("Pinch detected (click).");
      const mouseEvent = new MouseEvent("click", {
        clientX: cursorX,
        clientY: cursorY,
      });
    }
  }
});

function triggerKeyPress(key) {
  const event = new KeyboardEvent("keydown", { key });
  document.dispatchEvent(event);
}

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  console.log(`Mouse Position: (${mouseX}, ${mouseY})`);
});
