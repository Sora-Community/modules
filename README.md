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
  "type": "movie"
}
```

> ✅ Required fields: `sourceName`, `iconUrl`, `author`, `version`, `baseUrl`, `scriptUrl`, `type`  
> ✅ Make sure `searchBaseUrl` includes `%s` for the query substitution

## 🛠️ JavaScript Structure

Your JavaScript file should define the following functions:

| Function             | Purpose                           | Expected Output                                  |
| -------------------- | --------------------------------- | ------------------------------------------------ |
| `searchResults()`    | Return array of search results    | `[{ title, image, href }]`                       |
| `extractDetails()`   | Return metadata about a show/item | `{ description, aliases, airdate, ... }`         |
| `extractEpisodes()`  | Return list of episodes           | `[{ number, href }]`                             |
| `extractStreamUrl()` | Return stream URL or object       | `"https://stream..."` or `{ stream, subtitles }` |

## 🔁 Async & Modes

| Flag            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `asyncJS`       | Enables use of `fetchv2()` in all functions (async scraping) |
| `streamAsyncJS` | Allows async stream resolution                               |
| `softsub`       | Allows returning subtitles with stream                       |

```js
// Example fetch in async mode using headers
let res = await fetchv2("https://example.com/api", { "User-Agent": "Sora" });
let json = await res.json();
```

## 🧪 Testing Your Module

- ✅ Test on-device using public URLs (e.g., GitHub raw links)
- ✅ Check logs in the Logger or Xcode console for debugging

## 🤝 Contributing

1. **Fork this repo**
2. **Create a new folder** named after your source
3. Add:
   - `YourModule.json` (metadata)
   - `YourModule.js` (scraping logic)
4. Ensure `scriptUrl` points to the raw JS URL
5. **Test your module thoroughly**
6. Submit a Pull Request
7. If approved, one of the repositories maintainers will request a change of your sources json to point to this repo, once you accept the change it will be merged into the repo.

> ❗ **Do not submit broken or incomplete modules.** Only submit working, tested modules that follow Sora’s structure. Every module is tested before merged, and the code is also reviewed.

## 📌 License & Legal

All modules must remain **free and open**.  
Any attempt to **sell** or **paywall** modules will result in removal and banning from the community.

> 🔒 These modules are licensed **exclusively for use** within the Sora/Sulfur app, check the [LICENSE](https://github.com/Sora-Community/modules/blob/main/LICENSE) for all the informations.

## 💬 Community

Need help? Want feedback?
Join the official app [Discord](https://discord.gg/XR3SrmUbpd)

Or check the [Sora Docs](https://soradocs.readthedocs.io/en/latest/) for more in-depth technical info.

## Disclaimer

**This project does not have any affiliation with the content providers nor the Sora application.**

If you own either a content provider or content that is hosted on one of the content providers that a source is offered for and wish not to have the source be made available on this repo, please contact us or create a new issue to let us know and we will remove it.

**The user [cranci1](https://github.com/cranci1), owner of the Sora iOS app repository is a contributor to let him add module protection, created by him, inside the [SoraCore](https://github.com/cranci1/SoraCore) repository, in order to not break the package license.**

## 👏 Credits

This repo and documentation is maintained by the Sora community.  
Thanks to all contributors helping to expand the library of modules!
