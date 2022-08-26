// browser.browserAction.onClicked.addListener(loadContentScript);

const popupPageElements = {
  videoLength : document.getElementById("videoLength") as HTMLSpanElement,
  currentSpeed : document.getElementById("currentSpeed") as HTMLSpanElement,
  speedUpBtn : document.getElementById("speedUpBtn") as HTMLButtonElement,
  speedDownBtn : document.getElementById("speedDownBtn") as HTMLButtonElement,
  skipToEndBtn : document.getElementById("skipToEndBtn") as HTMLButtonElement,
  pages : document.getElementById("pages") as HTMLDivElement,
  controler : document.getElementById("controler") as HTMLDivElement,

}

let currentTabId: number;

const allTabs: browser.tabs.Tab[] = [];
(() => {
  // get a list of all tabs
  browser.tabs
    .query({})
    .then((tabs) => {
      // tabs.forEach(showPage);
      tabs.forEach((tab) => injectContentScript(tab.id!));
      console.log('injected content script');
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });

  //   loadContentScript();
  popupPageElements.controler.style.display = "none";
})();

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
function pageSelected(id: number) {
  injectContentScript(id);
  currentTabId = id;
  popupPageElements.pages.style.display = "none";
  popupPageElements.controler.style.display = "";
}
function showPage(tab: browser.tabs.Tab) {
  if (!tab.id) return;
  const pageInfo = document.createElement("div");
  pageInfo.className = "page";
  pageInfo.innerText = `${tab.id} - ${tab.title}`;
  pageInfo.id = tab.id ? tab.id.toString() : "";
  pageInfo.addEventListener("click", () => pageSelected(tab.id!));
  popupPageElements.pages.append(pageInfo);
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
