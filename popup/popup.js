"use strict";
const ppe = {
    videoLength: document.getElementById("videoLength"),
    currentSpeed: document.getElementById("currentSpeed"),
    speedUpBtn: document.getElementById("speedUpBtn"),
    speedDownBtn: document.getElementById("speedDownBtn"),
    skipToEndBtn: document.getElementById("skipToEndBtn"),
    pages: document.getElementById("pages"),
    controler: document.getElementById("controler"),
};
function removePages() {
    const pages = document.querySelectorAll(".page");
    pages.forEach((page) => page.remove());
}
class VideoController_UI {
    constructor(ppe) {
        this.currentTabId = null;
        this.tabs = [];
        this.videoTabs = [];
        this.ppe = ppe;
        this.init();
    }
    async init() {
        this.ppe.controler.style.display = "none";
        await this.updateTabsList();
        const injections = this.tabs.map(async (tab) => await this.injectContentScript(tab.id));
        await Promise.all(injections);
        await this.getVideoTabs();
        console.log("this.videoTabs :>> ", this.videoTabs);
        this.createList();
    }
    showPageController(tab) {
        this.currentTabId = tab.id;
        this.ppe.pages.style.display = "none";
        this.ppe.controler.style.display = "";
    }
    createList() {
        this.videoTabs.forEach((tab) => {
            const pageInfo = document.createElement("div");
            pageInfo.className = "page";
            pageInfo.innerText = `${tab.id} - ${tab.title}`;
            pageInfo.id = tab.id.toString();
            pageInfo.addEventListener("click", () => this.showPageController(tab));
            this.ppe.pages.append(pageInfo);
        });
    }
    async getVideoTabs() {
        for (const tab of this.tabs) {
            const res = await this.sendMessage(tab.id, "hasVideo");
            if (res.response) {
                this.videoTabs.push(tab);
            }
        }
    }
    async sendMessage(id, msg) {
        const response = await browser.tabs
            .sendMessage(id, { msg })
            .catch((err) => console.error(`Got an Error:\nTab ID:${id}\n${err}`));
        return { id, response };
    }
    async injectContentScript(id) {
        return new Promise((resolve, reject) => {
            browser.tabs
                .executeScript(id, { file: "/content_script/content_script.js" })
                .then((response) => {
                resolve(response);
            })
                .catch((err) => reject(err));
        });
    }
    async updateTabsList() {
        const openTabs = await browser.tabs.query({});
        this.tabs = openTabs.filter((tab) => !tab.url?.startsWith("about:"));
    }
}
new VideoController_UI(ppe);
{
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
    {
    }
}
