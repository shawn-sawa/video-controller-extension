### Removed

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
