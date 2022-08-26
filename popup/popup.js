"use strict";
const popupPageElements = {
    videoLength: document.getElementById("videoLength"),
    currentSpeed: document.getElementById("currentSpeed"),
    speedUpBtn: document.getElementById("speedUpBtn"),
    speedDownBtn: document.getElementById("speedDownBtn"),
    skipToEndBtn: document.getElementById("skipToEndBtn"),
    pages: document.getElementById("pages"),
    controler: document.getElementById("controler"),
};
let currentTabId;
const allTabs = [];
(() => {
    browser.tabs
        .query({})
        .then((tabs) => {
        tabs.forEach((tab) => injectContentScript(tab.id));
        console.log('injected content script');
    })
        .catch((error) => {
        console.log(`Error: ${error}`);
    });
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
function pageSelected(id) {
    injectContentScript(id);
    currentTabId = id;
    popupPageElements.pages.style.display = "none";
    popupPageElements.controler.style.display = "";
}
function showPage(tab) {
    if (!tab.id)
        return;
    const pageInfo = document.createElement("div");
    pageInfo.className = "page";
    pageInfo.innerText = `${tab.id} - ${tab.title}`;
    pageInfo.id = tab.id ? tab.id.toString() : "";
    pageInfo.addEventListener("click", () => pageSelected(tab.id));
    popupPageElements.pages.append(pageInfo);
}
function removePages() {
    const pages = document.querySelectorAll(".page");
    pages.forEach((page) => page.remove());
}
function injectContentScript(id) {
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
function sendMessageToTabs(id, msg) {
    browser.tabs
        .sendMessage(id, { msg })
        .then((response) => {
        console.log("Message from the content script:");
        console.log(response.response);
    })
        .catch(console.error);
}
class VideoController_UI {
    constructor() {
        this.videoLength = document.getElementById("videoLength");
        this.currentSpeed = document.getElementById("currentSpeed");
        this.speedUpBtn = document.getElementById("speedUpBtn");
        this.speedDownBtn = document.getElementById("speedDownBtn");
        this.skipToEndBtn = document.getElementById("skipToEndBtn");
        this.pages = document.getElementById("pages");
        this.controler = document.getElementById("controler");
        this.currentTabId = null;
    }
    init() { }
    sendMessage(id, msg) {
        browser.tabs
            .sendMessage(id, { msg })
            .then((response) => {
            console.log("Message from the content script:");
            console.log(response.response);
        })
            .catch(console.error);
    }
}
