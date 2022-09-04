// browser.browserAction.onClicked.addListener(loadContentScript);

// Popup Page Elements
const ppe: PopupPageElements = {
  videoLength: document.getElementById("videoLength") as HTMLSpanElement,
  currentSpeed: document.getElementById("currentSpeed") as HTMLSpanElement,
  speedUpBtn: document.getElementById("speedUpBtn") as HTMLButtonElement,
  speedDownBtn: document.getElementById("speedDownBtn") as HTMLButtonElement,
  skipToEndBtn: document.getElementById("skipToEndBtn") as HTMLButtonElement,
  pages: document.getElementById("pages") as HTMLDivElement,
  controler: document.getElementById("controler") as HTMLDivElement,
};

function removePages() {
  // ? can't get pages delcared in global?
  // pages = "List of pages:";
  const pages = document.querySelectorAll(".page") as NodeListOf<HTMLDivElement>;
  pages.forEach((page) => page.remove());
}

class VideoController_UI {
  ppe: PopupPageElements;
  currentTabId: number | null = null;
  tabs: browser.tabs.Tab[] = [];
  videoTabs: browser.tabs.Tab[] = [];
  constructor(ppe: PopupPageElements) {
    this.ppe = ppe;
    this.init();
  }

  async init() {
    // Hide controler
    this.ppe.controler.style.display = "none";

    // Get list of tabs
    await this.updateTabsList();

    // inject content script into all tabs
    const injections = this.tabs.map(async (tab) => await this.injectContentScript(tab.id!));
    await Promise.all(injections);

    // Get tabs that have video
    await this.getVideoTabs();

    console.log("this.videoTabs :>> ", this.videoTabs);

    // Show list of tabs with video
    this.createList();
  }

  showPageController(tab: browser.tabs.Tab) {
    this.currentTabId = tab.id!;

    this.ppe.pages.style.display = "none";
    this.ppe.controler.style.display = "";
  }

  createList() {
    this.videoTabs.forEach((tab) => {
      const pageInfo = document.createElement("div");
      pageInfo.className = "page";
      pageInfo.innerText = `${tab.id} - ${tab.title}`;
      pageInfo.id = tab.id!.toString();
      pageInfo.addEventListener("click", () => this.showPageController(tab));
      this.ppe.pages.append(pageInfo);
    });
  }

  async getVideoTabs() {
    for (const tab of this.tabs) {
      const res = await this.sendMessage(tab.id!, "hasVideo");
      if (res.response) {
        this.videoTabs.push(tab);
      }
    }
  }

  /**
   * Sends a message to the content script
   * @param  id Number - ID of Tab to send to
   * @param  msg  String - Message to send
   * @returns Object {id: number, response: any}
   */
  async sendMessage(id: number, msg: ContentScript_Commands) {
    const response = await browser.tabs
      .sendMessage(id, { msg })
      .catch((err) => console.error(`Got an Error:\nTab ID:${id}\n${err}`));
    // console.log("sendMessage: response :>> ", response);
    return { id, response };
  }

  /**
   *
   * @param id The ID of the tab to inject the content script into
   * @returns Promise <any[]> - Array of results from the content script
   */
  async injectContentScript(id: number) {
    return new Promise((resolve, reject) => {
      browser.tabs
        .executeScript(id, { file: "/content_script/content_script.js" })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * Collects a list of all tabs, filters out browser tabs (about: etc) and stores the remaining in this.tabs
   */
  async updateTabsList() {
    const openTabs = await browser.tabs.query({});
    // Filter out browser tabs
    this.tabs = openTabs.filter((tab) => !tab.url?.startsWith("about:")); //|| !tab.url?.startsWith("chrome:");
    // this.tabs = await browser.tabs.query({});
  }
}
new VideoController_UI(ppe);

{
  {
    // function pageSelected(id: number) {
    //   injectContentScript(id);
    //   currentTabId = id;
    //   ppe.pages.style.display = "none";
    //   ppe.controler.style.display = "";
    // }
    // !!!!!!!!!!!!!!!!!!!
    // function showPage(tab: browser.tabs.Tab) {
    //   if (!tab.id) return;
    //   const pageInfo = document.createElement("div");
    //   pageInfo.className = "page";
    //   pageInfo.innerText = `${tab.id} - ${tab.title}`;
    //   pageInfo.id = tab.id ? tab.id.toString() : "";
    //   pageInfo.addEventListener("click", () => pageSelected(tab.id!));
    //   ppe.pages.append(pageInfo);
    // }
  }
  {
    // browser.tabs.executeScript(id, { file: "/content_script/content_script.js" }).then((response) => {
    //   return Promise.resolve(response);
    // });
    //!------------------------------
    //!------------------------------
    // console.log(`Injecting in tab id: ${id}`);
    // const res = await browser.tabs
    //   .executeScript(id, { file: "/content_script/content_script.js" })
    //   .catch(console.error);
    // if (typeof res !== "object") console.warn("Injection response isn't an object");
    // if (Array.isArray(res) && res[0] !== undefined) {
    //   console.log("res.length :>> ", res.length);
    //   console.log("res[0] :>> ", res[0]);
    // } else if (Array.isArray(res) && res[0] === undefined) {
    //   // console.log("No response from injection script");
    // } else {
    //   console.warn("This is weird...");
    // }
  }
  {
    // async checkForVideo(tab: browser.tabs.Tab) {
    //   const vidRes = await this.sendMessage(tab.id!, "hasVideo");
    //   if (vidRes.response) {
    //     console.log("vidRes :>> ", vidRes);
    //     this.videoTabs.push(tab);
    //   }
    // }
  }
  {
    // Check if any tabs have video
    //! this.tabs.forEach(async (tab) => {
    // this.videoTabs = this.tabs.filter(async (tab) => {
    //! const res = await this.checkForVideo(tab);
    // console.log("Check For Video - res :>> ", res);
    //! if (res) {
    //!  this.videoTabs.push(tab);
    //! }
    // return Promise.resolve(res);
    // console.log("res.response :>> ", res.response);
    // if (res.response) {
    //   return res;
    // }
    // console.log("res :>> ", res);
    // return res;
    //! });
  }
  {
    // sendMessagePromise(id: number, msg: string): Promise<{ id: number; response: any }> {
    //   return new Promise((resolve, reject) => {
    //     // const response = browser.tabs
    //     browser.tabs
    //       .sendMessage(id, { msg })
    //       .then(({ id, response }) => {
    //         resolve({ id, response });
    //       })
    //       .catch((err) => reject(err));
    //     // resolve({ id, response });
    //   });
    //   //   browser.tabs
    //   //     .sendMessage(id, { msg })
    //   //     .then((response) => {
    //   //       // return Promise.resolve({ id, response });
    //   //       return resolve({ id, response });
    //   //     })
    //   //     .catch((err) => reject(err));
    //   // });
    // }
  }
  {
    // await this.checkForVideo();
    // const hasVideo = this.tabs.map(async (tab) => this.checkForVideo(tab));
    // const hasVideo = this.tabs.map(async (tab) => await this.checkForVideo(tab));
    // const hasVideo = this.tabs.map(async (tab) => await this.sendMessage(tab.id!, "hasVideo"));
    //! const hasVideo = this.tabs.filter(async (tab) => {
    //!   const res = await this.checkForVideo(tab);
    //!   // console.log("res :>> ", res);
    //!   // console.log("res === false :>> ", res === false);
    //!   return res;
    //! });
    // await Promise.all(hasVideo);
    // await Promise.allSettled(hasVideo);
    // console.log("hasVideo :>> ", hasVideo);
    // const hasVideoPromise = this.tabs.map(async (tab) => await this.sendMessagePromise(tab.id!, "hasVideo"));
    // await Promise.all(hasVideoPromise);
    // console.log("hasVideoPromise :>> ", hasVideoPromise);
  }
}
