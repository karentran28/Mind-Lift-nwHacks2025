const videoElement = document.getElementById("webcam");
if (!videoElement) {
  console.error("Video element not found");
}

const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    videoElement.srcObject = stream;

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        try {
          await hands.send({ image: videoElement });
        } catch (error) {
          console.error("Error in MediaPipe Hands processing: ", error);
        }
      },
      width: 640,
      height: 480,
    });

    camera.start();
  })
  .catch((error) => {
    console.error("Error accessing the camera: ", error);
  });

  hands.onResults((results) => {
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    const landmarks = results.multiHandLandmarks[0];
    const wrist = landmarks[0];
    const indexTip = landmarks[8];

    const deltaX = indexTip.x - wrist.x;
    const deltaY = indexTip.y - wrist.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        triggerKeyPress("ArrowLeft");
        console.log("Left");
      } else {
        triggerKeyPress("ArrowRight");
        console.log("Right");
      }
    } else {
      if (deltaY > 0) {
        triggerKeyPress("ArrowDown");
        console.log("Down");
      } else {
        triggerKeyPress("ArrowUp");
        console.log("Up");
      }
    }
  }
});

function triggerKeyPress(key) {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
  });
  document.dispatchEvent(event);
}
