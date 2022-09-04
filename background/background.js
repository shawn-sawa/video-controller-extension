"use strict";
console.log("background script");
browser.tabs
    .query({})
    .then((tabs) => {
})
    .catch((error) => {
    console.log(`Error: ${error}`);
});
