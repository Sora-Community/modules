# 📦 Sora Community Modules

Welcome to the **Sora Module Repository** — a place for the community to submit and share scraping modules for the [Sora/Sulfur](https://github.com/cranci1/Sora) app.

> 📌 **Note**: This is for **developers only**. If you're unfamiliar with JavaScript or web scraping, we recommend learning via YouTube or AI tools first.  
> We do **not** typically offer support for writing or debugging modules from scratch.




## 📖 About Sora Modules

Sora is a modular content streaming app for iOS/macOS. It supports custom content **modules** written in JavaScript that scrape streaming websites for content like anime, shows, and movies.

Each module is defined by:
- A `.json` metadata file describing the module.
- A matching `.js` file that implements scraping logic.


## 🧠 Prerequisites

- Basic to intermediate JavaScript skills
- Understanding of HTML structure & selectors
- Familiarity with tools like browser devtools, regex, and fetch()

📚 Full documentation:  
👉 [Sora Docs](https://soradocs.readthedocs.io/en/latest/)


## ⚙️ JSON Metadata Format

Each module's `.json` file should include:

```json
{
  "sourceName": "MySource",
  "iconUrl": "https://example.com/icon.png",
  "author": {
    "name": "YourName",
    "icon": "https://example.com/avatar.png"
  },
  "version": "1.0.0",
  "language": "English (SUB)",
  "streamType": "HLS",
  "quality": "720p",
  "baseUrl": "https://example.com/",
  "searchBaseUrl": "https://example.com/search?q=%s",
  "scriptUrl": "https://raw.githubusercontent.com/you/repo/main/mysource.js",
  "asyncJS": true,
  "streamAsyncJS": false,
  "softsub": false,
  "type": "anime"
}
```

> ✅ Required fields: `sourceName`, `iconUrl`, `author`, `version`, `baseUrl`, `scriptUrl`, `type`  
> ✅ Make sure `searchBaseUrl` includes `%s` for the query substitution


## 🛠️ JavaScript Structure

Your JavaScript file should define the following functions:

| Function            | Purpose                            | Expected Output                         |
|---------------------|------------------------------------|------------------------------------------|
| `searchResults()`   | Return array of search results     | `[{ title, image, href }]`              |
| `extractDetails()`  | Return metadata about a show/item  | `{ description, aliases, airdate, ... }`|
| `extractEpisodes()` | Return list of episodes            | `[{ number, href }]`                    |
| `extractStreamUrl()`| Return stream URL or object        | `"https://stream..."` or `{ stream, subtitles }` |


## 🔁 Async & Modes

| Flag            | Description |
|-----------------|-------------|
| `asyncJS`       | Enables use of `fetchv2()` in all functions (async scraping) |
| `streamAsyncJS` | Allows async stream resolution |
| `softsub`       | Allows returning subtitles with stream |

```js
// Example fetch in async mode
let res = await fetchv2("https://example.com/api", { "User-Agent": "Sora" });
let json = await res.json();
```




## 🧪 Testing Your Module

- ✅ Test on-device using public URLs (e.g., GitHub raw links)
- ✅ Check logs in Xcode or console for debugging




## 🤝 Contributing

1. **Fork this repo**
2. **Create a new folder** named after your source
3. Add:
   - `YourModule.json` (metadata)
   - `YourModule.js` (scraping logic)
4. Ensure `scriptUrl` points to the raw JS URL
5. **Test your module thoroughly**
6. Submit a Pull Request

> ❗ **Do not submit broken or incomplete modules.** Only submit working, tested modules that follow Sora’s structure.




## 📌 License & Legal

All modules must remain **free and open**.  
Any attempt to **sell** or **paywall** modules will result in removal and banning from the community.

> 🔒 These modules are licensed **exclusively for use** within the Sora/Sulfur app.




## 💬 Community

Need help? Want feedback?

Join us on Discord →  
👉 [https://discord.gg/XR3SrmUbpd](https://discord.gg/XR3SrmUbpd)

Or check the [Sora Docs](https://soradocs.readthedocs.io/en/latest/) for more in-depth technical info.




## 👏 Credits

This repo and documentation is maintained by the Sora community.  
Thanks to all contributors helping to expand the library of modules!
