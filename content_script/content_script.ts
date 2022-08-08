// get video element
const video = document.getElementById("video") as HTMLVideoElement;

// create video controller if video is found
if (video) {
  const videoController = new VideoController_UI(video);
  videoController.init();
}

class VideoController {
  video: HTMLVideoElement;
  duration: number = 0;
  currentTime: number = 0;
  speed: number = 1;
  constructor(video: HTMLVideoElement) {
    this.video = video;
  }
  init() {
    this.speed = this.video.playbackRate;
    this.duration = this.video.duration;
    this.currentTime = this.video.currentTime;
    // a.currentTime
    // a.fastSeek
  }
  speedUp() {
    // TODO: send acks to popup.js

    this.speed += 0.1;
    this.video.playbackRate = this.speed;
  }
  speedDown() {
    // TODO: send acks to popup.js
    this.speed -= 0.1;
    this.video.playbackRate = this.speed;
  }
  skipToEnd() {
    // TODO: send acks to popup.js
    this.video.currentTime = this.duration;
  }
}
