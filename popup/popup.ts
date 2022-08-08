console.log("hello from popup.js");
const videoLength = document.getElementById("videoLength") as HTMLSpanElement;
const currentSpeed = document.getElementById("currentSpeed") as HTMLSpanElement;

function loadContentScript() {
  browser.tabs.executeScript({
    file: "/content_scripts/export.js",
  });
}

browser.browserAction.onClicked.addListener(loadContentScript);

class VideoController_UI {
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

  sendMessage(message: string) {
    chrome.runtime.sendMessage(message);
  }
}
