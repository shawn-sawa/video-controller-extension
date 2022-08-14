"use strict";
const videoLength = document.getElementById("videoLength");
const currentSpeed = document.getElementById("currentSpeed");
const speedUpBtn = document.getElementById("speedUpBtn");
const speedDownBtn = document.getElementById("speedDownBtn");
const skipToEndBtn = document.getElementById("skipToEndBtn");
const pages = document.getElementById("pages");
const controler = document.getElementById("controler");
let currentTabId;
(() => {
    browser.tabs
        .query({})
        .then((tabs) => {
        tabs.forEach((tab) => injectContentScript(tab.id));
    })
        .catch((error) => {
        console.log(`Error: ${error}`);
    });
    controler.style.display = "none";
})();
function pageSelected(id) {
    injectContentScript(id);
    currentTabId = id;
    pages.style.display = "none";
    controler.style.display = "";
}
function showPage(tab) {
    if (!tab.id)
        return;
    const pageInfo = document.createElement("div");
    pageInfo.className = "page";
    pageInfo.innerText = `${tab.id} - ${tab.title}`;
    pageInfo.id = tab.id ? tab.id.toString() : "";
    pageInfo.addEventListener("click", () => pageSelected(tab.id));
    pages.append(pageInfo);
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
