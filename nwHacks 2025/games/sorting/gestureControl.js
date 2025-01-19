// Initialize MediaPipe Hands
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
  maxNumHands: 2, 
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

let leftHandRaised = false;
let rightHandRaised = false;

hands.onResults((results) => {
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    let isLeftHandRaised = false;
    let isRightHandRaised = false;

    results.multiHandLandmarks.forEach((landmarks, index) => {
      const wrist = landmarks[0];
      const middleFingerTip = landmarks[12]; 
      const handedness = results.multiHandedness[index].label; 

      if (handedness === "Left") {
        if (middleFingerTip.y < wrist.y && !leftHandRaised) {
          console.log("Left hand raised -> Trigger left action");
          triggerKeyPress("ArrowLeft");
          leftHandRaised = true;
        } else if (middleFingerTip.y >= wrist.y) {
          leftHandRaised = false; 
        }
        isLeftHandRaised = true; 
      }

      if (handedness === "Right") {
        if (middleFingerTip.y < wrist.y && !rightHandRaised) {
          console.log("Right hand raised -> Trigger right action");
          triggerKeyPress("ArrowRight");
          rightHandRaised = true;
        } else if (middleFingerTip.y >= wrist.y) {
          rightHandRaised = false; 
        }
        isRightHandRaised = true; 
      }
    });

    if (!isLeftHandRaised) {
      leftHandRaised = false;
    }
    if (!isRightHandRaised) {
      rightHandRaised = false;
    }
  } else {
    leftHandRaised = false;
    rightHandRaised = false;
  }
});

function triggerKeyPress(key) {
  const event = new KeyboardEvent("keydown", { key });
  document.dispatchEvent(event);
}
