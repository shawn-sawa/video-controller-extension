"use strict";
console.log("content script loaded");
browser.runtime.onMessage.addListener(({ msg }) => {
    console.log("msg rx top :>> ", msg);
    if (msg === "hasVideo") {
        return Promise.resolve(!!getVideo());
    }
    console.log("msg: ", msg);
    const video = getVideo();
    if (video) {
        switch (msg) {
            case "speedUp":
                video.playbackRate += 0.1;
                break;
            case "speedDown":
                video.playbackRate -= 0.1;
                break;
            case "skipToEnd":
                video.currentTime = video.duration;
                break;
            default:
                console.log("Invalid request >>", msg);
        }
    }
    return Promise.resolve({ response: "Hi from content script" });
});
function getVideo() {
    const video = document.querySelector("video");
    return video;
}
