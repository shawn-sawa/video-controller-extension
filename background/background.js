"use strict";
console.log("background script");
browser.tabs
    .query({})
    .then((tabs) => {
    console.log("tabs :>> ", tabs);
})
    .catch((error) => {
    console.log(`Error: ${error}`);
});
