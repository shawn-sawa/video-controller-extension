# logic

- page loads
- user clicks on ext
- ext gets list of all tabs open
- ext inject content script into every page
- ext send msg to every page to see if video - if video => ext shows titles on page - if no video => skip over it
  user clicks on which tab title (page) that has the video
  ext displays controls
  user clicks on control
  ext sends msg to cts
  cts responds when complete and what current status is

ext injects content script into that page (tab id)
cts gets video and responds when complete
\*\* check to see if cts has already been injected

### old

page loads
user clicks on ext
ext gets list of all tabs open
ext list all tabs titles on page
user clicks on which tab title (page) that has the video
ext injects content script into that page (tab id)
cts gets video and responds when complete
\*\* check to see if cts has already been injected
ext displays controls
user clicks on control
ext sends msg to cts
cts responds when complete and what current status is

### Removed

```js

function sendMessageToTabs(id: number, msg: string) {
  browser.tabs
    .sendMessage(id, { msg })
    .then((response) => {
      console.log("Message from the content script:");
      console.log(response.response);
    })
    .catch(console.error);
}

function injectContentScript(id: number) {
  browser.tabs
    .executeScript(id, {
      file: "/content_script/content_script.js",
    })
    .then((result) => {
      console.log("result: ", result);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
function refreshTabs() {
  allTabs.forEach((tab, index) => {
    allTabs.pop();
  });
  browser.tabs
    .query({})
    .then((tabs) => {
      tabs.forEach((tab) => allTabs.push(tab));
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
}
```

- Removed from manifest because it automatically loaded the content script into every page reguardless if the extention icon was clicked or not.

```json
,
"content_scripts": [
{
"matches": ["<all_urls>"],
"js": ["./content_script/content_script.js"]
}
]
```

### asdf

```js
// ! this doesn't work because this file is loaded after the browser action is clicked

// browser.tabs.query({
//     currentWindow: true,
//     active: true,
//   })
//   .then(sendMessageToTabs)
//   .catch(console.error);
```

### List of elements on popup.html

```js
const videoLength = document.getElementById("videoLength") as HTMLSpanElement;
const currentSpeed = document.getElementById("currentSpeed") as HTMLSpanElement;
const speedUpBtn = document.getElementById("speedUpBtn") as HTMLButtonElement;
const speedDownBtn = document.getElementById("speedDownBtn") as HTMLButtonElement;
const skipToEndBtn = document.getElementById("skipToEndBtn") as HTMLButtonElement;
const pages = document.getElementById("pages") as HTMLDivElement;
const controler = document.getElementById("controler") as HTMLDivElement;

```

### first content script

```js
// (() => {
//   let controller;
//   //@ts-ignore
//   if (!window.VideoController) {
//     class VideoController {
//       video = document.querySelector("video") as HTMLVideoElement;
//       duration: number = 0;
//       currentTime: number = 0;
//       speed: number = 1;
//       constructor() {
//         console.log("video controller init");
//       }
//       init() {
//         this.speed = this.video.playbackRate;
//         this.duration = this.video.duration;
//         this.currentTime = this.video.currentTime;
//         // a.currentTime
//         // a.fastSeek
//       }
//       speedUp() {
//         // TODO: send acks to popup.js

//         this.speed += 0.1;
//         this.video.playbackRate = this.speed;
//       }
//       speedDown() {
//         // TODO: send acks to popup.js
//         this.speed -= 0.1;
//         this.video.playbackRate = this.speed;
//       }
//       skipToEnd() {
//         // TODO: send acks to popup.js
//         this.video.currentTime = this.duration;
//       }
//     }
//     controller = new VideoController();
//     Object.defineProperty(window, "VideoController", {
//       value: controller,
//       writable: true,
//       enumerable: true,
//       configurable: true,
//     });
//     return "new video controller";
//   } else {
//     return "video controller already exists";
//   }
// })();

browser.runtime.onMessage.addListener(({ msg }) => {
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


// * create video controller if video is found
// if (video) {
//   const videoController = new VideoController_UI(video);
//   videoController.init();
// }

function getVideo() {
  return document.querySelector("video") as HTMLVideoElement;
}
function speedUp() {
  // TODO: send acks to popup.js
  const video = getVideo();
  if (video) {
    video.playbackRate += 0.1;
  }
}
function speedDown() {}
function skipToEnd() {}

```
