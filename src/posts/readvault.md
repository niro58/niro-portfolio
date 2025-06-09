---
title: 'ReadVault : Chrome Extension'
createdAt: '2025-03-09'
updatedAt: '2025-03-09'
category: 'Portfolio'
readTime: '8'
excerpt: 'Chrome extension ReadVault is a project to save, organize, and prioritize web pages instantly. Client sided, secure and open source.'
coverImage: '/posts/readvault.webp'
coverWidth: 16
coverHeight: 9
metaKeywords: 'chrome extension, web blocker, productivity, svelte'
metaDescription: 'Chrome extension ReadVault is a project to save, organize, and prioritize web pages instantly. Client sided, secure and open source.'

tags: ['Extension', 'Svelte']

githubLink: 'https://github.com/niro58/readvault-svelte-extension'
appLink: 'https://chromewebstore.google.com/detail/readvault-bookmark-organi/pknjnapfdjdgaihmafnnpkpajefkodcn'
---

I had two main goals for this project. First, I need hot reloading. I’m so used to it from web dev that I can’t work without it. Second, I wanted to finally learn IndexedDB. I’d seen it in the browser inspector forever but never actually used it.

The tech stack was pretty simple: Svelte, Tailwind, and Shadcn components.

## Getting Hot Reloading to Work

Getting a modern setup for a Chrome extension can be a pain. I found a tool called `crxjs` that made it super easy.

It gives you hot reloading and even creates the `manifest.json` file automatically. You just define the manifest in a TypeScript file, and it grabs the version straight from your `package.json`.

Here's the config in my `vite.config.js`. I just added the `crx` plugin.

```javascript
// vite.config.js
...
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";

export default defineConfig({
  plugins: [crx({ manifest }), ...],
  ...
  server: {
    port: 5177,
    strictPort: true,
    hmr: {
      clientPort: 5177,
    },
  },
  legacy: { //Crx configuration
    skipWebSocketTokenCheck: true,
  },
});
```

And here’s the `manifest.config.ts` file. The script handles the version formatting for me.

```javascript
// manifest.config.ts
import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;
const [major, minor, patch] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async () => ({
  manifest_version: 3,
  name: "ReadVault - Bookmark. Organize. Thrive",
  description:
    "ReadVault is an extension that acts as your digital reading vault. Save and organize pages in one place for easy access anytime.",
  version: `${major}.${minor}.${patch}`,
  version_name: version,

  icons: {
    "48": "src/assets/icons/icon-48.png",
    "128": "src/assets/icons/icon-128.png",
  },

  background: {
    service_worker: "src/background/index.ts",
  },

  action: {
    default_popup: "index.html",
    default_icon: {
      "48": "src/assets/icons/icon-48.png",
      "128": "src/assets/icons/icon-128.png",
    },
  },

  permissions: ["tabs"] as chrome.runtime.ManifestPermissions[],

  // Very important part that basically allows hot reloading in chrome extension, that should be disabled in production
  host_permissions: ["<all_urls>"],

}));
```

With just these two files, I had hot reloading and didn't have to worry about the manifest anymore.

## A Look at the Features

The extension is pretty straightforward. It has three tabs:

- **All**: Every page you've saved.
- **Urgent**: Pages you marked as important.
- **Archive**: Stuff you're done with. You can always move it back.

You can also make folders to keep your saved pages organized.

<img src="/posts/readvault/main_page.webp" alt="Main page of the ReadVault extension, showing tabs for All, Urgent, and Archive, with folders for different topics."/>
<img src="/posts/readvault/main_page_expanded.webp" alt="Main page of the ReadVault extension, showing tabs for All, Urgent, and Archive, with folders for different topics."/>

Adding pages is simple.

1.  **Add Current Page**: If you're on a page you want to save, the extension fills in the title and icon for you.
2.  **Add Specific Page**: Or you can just paste a URL and add the details yourself.

<img src="/posts/readvault/add_page_current.webp" alt="The UI for adding the current page, with fields for title and folder pre-populated."/>

### The "Brains" Behind It

I put all the main logic in a file called `app_controller.svelte.ts`.

To make it available everywhere, I used Svelte's context API. This lets me share one controller instance with all the other components, which is a pattern I really like.

For the folders, I tried using a `SvelteMap`. I ran into some problems with it, so it might not be the best solution, but it was a fun experiment. Here's what the data looks like:

```typescript
export interface Website {
	id: number;
	folderName: string;
	title: string;
	url: string;
	favicon?: string;
	status: ReadingStatus;
	createdAt: number;
}

export interface ReadingFolder {
	websites: Website[];
	expanded: boolean;
	showAll: boolean;
}

class AppController {
	folders = new SvelteMap<string, ReadingFolder>();
	websiteRepository = getWebsiteRepository();
	// ...
}
```

The main problem I encountered was state management. Perhaps I'm not working with it correctly, but every time I update a folder, the reactivity needs to be re-triggered, which means rewriting the entire SvelteMap. Not many people use it or have posts about it publicly, so I haven't found much information about it. Also, it was a few months ago when I did it, so I'm not sure about the whole process of finding a better solution to this.

```typescript
this.folders.set(folderName, { ...folder }); // re-set to trigger reactivity
```

### IndexedDB

This was the part I was most excited about. I used Svelte contexts to share the database connection, which kept things clean.

It gets initialized in `app.svelte`:

```typescript
// app.svelte
const db = setDatabase();
const websiteRepository = setWebsiteRepository();
$effect(() => {
	if (db.db) {
		websiteRepository.db = db.db;
	}
});
```

First, a `Database` class in `database.svelte.ts` connects to IndexedDB. If the database is new or needs an update, it calls a migration function.

```typescript
// lib/database.svelte.ts
export class Database {
	db: IDBDatabase | undefined = $state();
	constructor() {
		const request = indexedDB.open('public', 1);
		request.onerror = (event) => {
			console.log('error: ', event);
			this.db = undefined;
		};

		request.onsuccess = (event) => {
			this.db = (event.target as IDBOpenDBRequest).result;
		};

		request.onupgradeneeded = () => {
			const db = request.result;
			WebsiteRepository.migrate(db);
		};
	}
}
```

Next, a `WebsiteRepository` class handles all the data stuff—adding, updating, deleting, and getting pages. This keeps all the IndexedDB code separate from the UI.

The `migrate` function inside this class sets up the database table and its indexes.

```typescript
// lib/website_repository.svelte.ts
export class WebsiteRepository {
  db: IDBDatabase | undefined = $state();

  static migrate(db: IDBDatabase) {
    if (!db.objectStoreNames.contains("websites")) {
      const store = db.createObjectStore("websites", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("folderName", "folderName", { unique: false });
      store.createIndex("title", "title", { unique: false });
      store.createIndex("url", "url", { unique: true });
      store.createIndex("favicon", "favicon", { unique: false });
      store.createIndex("createdAt", "createdAt", { unique: false });
      store.createIndex("status", "status", { unique: false });
    }
  }

  async update(website: Website): Promise<Result<boolean>> { ... }
  async delete(id: number): Promise<Result<boolean>> { ... }
  async add(model: Omit<Website, "id">): Promise<Result<Website>> { ... }
  async getAll(status?: ReadingStatus): Promise<Result<Website[]>> { ... }
  // ... and other methods
}
```

### Handling Errors

For showing errors and success messages, I kept it simple. There’s a `div` in my `app.svelte` file that holds the messages.

A helper function `addMessage` just creates a new message element and sticks it in there. To avoid clutter, it automatically removes the oldest message if there are more than three. They also fade in and out, which is a nice touch.

```typescript
export function addMessage(type: 'warning' | 'success', ...log: any[]) {
	const messages = document.getElementById('messages');
	if (!messages) return;

	// If there are already 3 messages, remove the oldest one immediately
	if (messages.children.length >= 3) {
		const oldestMessage = messages.firstElementChild;
		if (oldestMessage) {
			oldestMessage.remove();
		}
	}

	const randId = Math.random().toString(36).slice(-8);

	const divEl = document.createElement('div');
	divEl.id = randId;
	divEl.innerHTML = log.join(' ');
	divEl.className = `py-2 px-4 rounded mb-2 w-full ${
		type === 'success'
			? 'bg-green-500/50 text-green-100 border border-green-500'
			: 'bg-red-500/50 text-red-100 border border-red-500'
	} animate-fade-in`;

	messages.appendChild(divEl);

	setTimeout(() => {
		divEl.classList.add('animate-fade-out');
		divEl.addEventListener(
			'animationend',
			() => {
				divEl.remove();
			},
			{ once: true }
		);
	}, 2000);
}
```

So yeah, that's the project. It was a good way to build a tool I'd actually use, get hot reloading sorted out, and finally get my hands on IndexedDB.
