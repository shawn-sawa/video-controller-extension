console.log("hello from popup.js");
const videoLength = document.getElementById("videoLength") as HTMLSpanElement;
const currentSpeed = document.getElementById("currentSpeed") as HTMLSpanElement;

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
    this.speed += 0.1;
    this.video.playbackRate = this.speed;
    currentSpeed.innerText = this.speed.toString();
  }

  speedDown() {
    this.speed -= 0.1;
    this.video.playbackRate = this.speed;
    currentSpeed.innerText = this.speed.toString();
  }

  skipToEnd() {
    this.video.currentTime = this.duration;
  }
}