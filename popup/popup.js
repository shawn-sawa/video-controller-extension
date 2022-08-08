"use strict";
console.log("hello from popup.js");
const videoLength = document.getElementById("videoLength");
const currentSpeed = document.getElementById("currentSpeed");
class VideoController {
    constructor(video) {
        this.duration = 0;
        this.currentTime = 0;
        this.speed = 1;
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
