---
title: 'BlockAid : Web Blocker Chrome Extension'
date: '2025-01-08'
updated: '2025-01-08'
category: 'Portfolio'
readingTime: '8'
excerpt: "A little project I made to help me focus on my work. It's a Chrome extension that blocks websites when you are working or just forever."
coverImage: '/posts/blockaid.webp'
coverWidth: 16
coverHeight: 9
metaKeywords: 'chrome extension, web blocker, productivity, svelte'
metaDescription: "A little project I made to help me focus on my work. It's a Chrome extension that blocks websites when you are working or just forever."

tags: ['Extension', 'Svelte']

githubLink: 'https://github.com/niro58/blockaid-extension-svelte'
appLink: 'https://chromewebstore.google.com/detail/blockaid-website-blocker/cginnmmbhcfboaliincmendnddelbdbf'
---

## Introduction

So, at work, I kept catching myself opening X.com, Reddit, or something similar. I’d close it after a few minutes, but those minutes added up—not just in time lost, but in the mental effort it took to refocus on my code. I thought, why not make a Chrome extension to block those sites? Just a small thing to help me stay focused.

I tried using one of the existing extensions, but it had this weird limitation on how many pages you could add. It’s surprising how companies, especially those in a good position in google chrome extension store, know they can get away with stuff like that and still sell their product. It’s such a simple extension to create, yet they add arbitrary limits. That was annoying, so I figured I’d just make my own.

Also, I’ve been tired of websites collecting my data and selling it. That’s why I started [Tivoku.com](https://tivoku.com), a toolkit where I don’t gather any user data or analytics. This extension is part of that.

The first version was plain JS, HTML, and CSS, but I rewrote it in Svelte because I’ve gotten too used to Tailwind and didn’t feel like dealing with raw CSS anymore. Plus, Svelte is just nicer to work with. It’s a small project, but it’s been helpful for me.

## Chrome Extension Anatomy

Chrome extensions consists of three main parts, each with its own purpose:

1. **The Background Script**

   - This runs in the background and manages events like network requests, tab changes, and browser actions.
   - It’s responsible for handling things like URL blocking, storing data, and communicating with other parts of the extension.
   - It doesn’t directly interact with web pages but can receive and process messages from the content script.

2. **The Pop-up**

   - This is the small UI that appears when you click the extension’s icon in the toolbar.
   - It’s usually a simple HTML file with JavaScript that lets users interact with the extension (e.g., turning it on/off, changing settings).
   - It can also send messages to the background script using `chrome.runtime.sendMessage` to request or retrieve data.

3. **The Content Script**
   - This runs inside web pages and allows the extension to modify or interact with the page’s content.
   - It can change text, hide elements, or inject scripts, but it doesn’t have direct access to browser features like the background script does.
   - If it needs to perform tasks that require background permissions, it sends a message to the background script, like in this example which I have used in a different extension of mine which was scrapping data out of a website:

```ts twoslash
chrome.runtime.sendMessage(extensionId, {
	key: 'main',
	data: res
});
```

- The background script listens for this message and handles it accordingly:

```ts twoslash
chrome.runtime.onMessageExternal.addListener(async (request, sender) => {
	const data = request.data;
	console.log('Received data', data);
	const deviceId = await chrome.storage.local.get('deviceId');
	const log = {
		deviceId: deviceId.deviceId,
		errors: getErrors(data, request, sender),
		request: request,
		sender: sender
	};

	if (log.errors.length > 0) {
		await apiConnector.saveLog(log);
	} else {
		await apiConnector.saveItems(data);
	}

	isLoadingResponse = false;
});
```

- This allows the content script to request actions without interrupting its own execution.

## How my extension Works

The whole frontend is built in **Svelte**, with the UI styled using **Tailwind**. Most of the components come from **shadcn**, so it’s clean and easy to work with.

The core functionality of a background script is split into two parts:

1. **`chrome.webNavigation.onBeforeNavigate`**:  
   This checks before navigation if the user is trying to visit a blocked page. If they are, it redirects them instantly—so they don’t even see the page for a split second. Here’s how it works:

```js
chrome.webNavigation.onBeforeNavigate.addListener(async function (details) {
	const { url, tabId } = details;

	if (url === 'about:blank') return;

	const trimmedUrl = trimUrl(url, 'url');
	if (await toRedirect(trimmedUrl)) {
		chrome.tabs.update(tabId, {
			url: 'https://tivoku.com/website-blocker/blocked'
		});
	}
});
```

It’s great for blocking domains and specific subpages (e.g., `example.com/unproductive/*`).

2. **`chrome.tabs.onUpdated`**:  
   Originally, I thought `webNavigation` would handle everything, but I noticed it didn’t catch cases where the page itself redirected to a subdomain or another path. For example, if the page moved to a subdomain or did a client-side redirect, `webNavigation` wouldn’t catch it. That’s where `chrome.tabs.onUpdated` comes in:

```js
chrome.tabs.onUpdated.addListener(async (id, _, tab) => {
	const { url } = tab;

	if (url === 'about:blank' || !url) return;

	const trimmedUrl = trimUrl(url, 'url');

	if (await toRedirect(trimmedUrl)) {
		chrome.tabs.update(id, {
			url: 'https://tivoku.com/website-blocker/blocked'
		});
	}
});
```

This ensures that even if the page redirects internally, the user still gets blocked if they end up on a restricted URL.

The combination of `webNavigation` and `tabs.onUpdated` makes sure nothing slips through, whether it’s a domain, subdomain, or specific subpage. It’s a small project, but it’s been fun to build and actually useful for staying focused. Plus, it’s open source, so feel free to check out the code or tweak it for your own needs.
