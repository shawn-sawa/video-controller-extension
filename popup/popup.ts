// ! this doesn't work because this file is loaded after the browser action is clicked
// browser.browserAction.onClicked.addListener(loadContentScript);

const videoLength = document.getElementById("videoLength") as HTMLSpanElement;
const currentSpeed = document.getElementById("currentSpeed") as HTMLSpanElement;
const speedUpBtn = document.getElementById("speedUpBtn") as HTMLButtonElement;
const speedDownBtn = document.getElementById("speedDownBtn") as HTMLButtonElement;
const skipToEndBtn = document.getElementById("skipToEndBtn") as HTMLButtonElement;
const pages = document.getElementById("pages") as HTMLDivElement;
const controler = document.getElementById("controler") as HTMLDivElement;
let currentTabId: number;

(() => {
  // get a list of all tabs
  browser.tabs
    .query({})
    .then((tabs) => {
      // tabs.forEach(showPage);
      tabs.forEach((tab) => injectContentScript(tab.id!));
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });

  //   loadContentScript();
  controler.style.display = "none";
})();

function pageSelected(id: number) {
  injectContentScript(id);
  currentTabId = id;
  pages.style.display = "none";
  controler.style.display = "";
}
function showPage(tab: browser.tabs.Tab) {
  if (!tab.id) return;
  const pageInfo = document.createElement("div");
  pageInfo.className = "page";
  pageInfo.innerText = `${tab.id} - ${tab.title}`;
  pageInfo.id = tab.id ? tab.id.toString() : "";
  pageInfo.addEventListener("click", () => pageSelected(tab.id!));
  pages.append(pageInfo);
}
function removePages() {
  // ? can't get pages delcared in global?
  // pages = "List of pages:";
  const pages = document.querySelectorAll(".page") as NodeListOf<HTMLDivElement>;
  pages.forEach((page) => page.remove());
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
function sendMessageToTabs(id: number, msg: string) {
  browser.tabs
    .sendMessage(id, { msg })
    .then((response) => {
      console.log("Message from the content script:");
      console.log(response.response);
    })
    .catch(console.error);
}

// browser.tabs.query({
//     currentWindow: true,
//     active: true,
//   })
//   .then(sendMessageToTabs)
//   .catch(console.error);

class VideoController_UI {
  videoLength = document.getElementById("videoLength") as HTMLSpanElement;
  currentSpeed = document.getElementById("currentSpeed") as HTMLSpanElement;
  speedUpBtn = document.getElementById("speedUpBtn") as HTMLButtonElement;
  speedDownBtn = document.getElementById("speedDownBtn") as HTMLButtonElement;
  skipToEndBtn = document.getElementById("skipToEndBtn") as HTMLButtonElement;
  pages = document.getElementById("pages") as HTMLDivElement;
  controler = document.getElementById("controler") as HTMLDivElement;
  currentTabId: number | null = null;
  constructor() {}
  init() {}

  sendMessage(id: number, msg: string) {
    browser.tabs
      .sendMessage(id, { msg })
      .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
      })
      .catch(console.error);
  }
}
