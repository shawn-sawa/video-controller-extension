interface PopupPageElements {
  videoLength: HTMLSpanElement;
  currentSpeed: HTMLSpanElement;
  speedUpBtn: HTMLButtonElement;
  speedDownBtn: HTMLButtonElement;
  skipToEndBtn: HTMLButtonElement;
  pages: HTMLDivElement;
  controler: HTMLDivElement;
}

type ContentScript_Commands = "hasVideo" | "speedUp" | "speedDown" | "skipToEnd";
