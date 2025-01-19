export function setupGestureControl(player) {
  const videoElement = document.getElementById("webcam");
  if (!videoElement) {
    console.error("Video element not found");
    return;
  }

  const hands = new Hands({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
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
      const indexTip = landmarks[8];

      // Map the normalized hand position
      const canvasWidth = player.canvas.width;
      const canvasHeight = player.canvas.height;

      player.x = Math.min(
        Math.max((1 - indexTip.x) * canvasWidth - player.width / 2, 0),
        canvasWidth - player.width
      );

      // Shooting gesture: Detect pinch between index finger and thumb
      const thumbTip = landmarks[4];
      const distance = Math.sqrt(Math.pow(indexTip.x - thumbTip.x, 2));

      player.shootPressed = distance < 0.1;
    } else {
      player.shootPressed = false;
    }
  });
}
