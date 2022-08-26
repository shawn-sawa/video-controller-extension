console.log("content script loaded");
// (() => {
//   // const video = getVideo();
//   // return video;
//   return 'hello'
// })();
browser.runtime.onMessage.addListener(({ msg }) => {
  if (msg === "hasVideo") {
    console.log("Checking for video.");
    return !!getVideo();
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
    }
  }

  return Promise.resolve({ response: "Hi from content script" });
});

function getVideo() {
  return document.querySelector("video") as HTMLVideoElement;
}
