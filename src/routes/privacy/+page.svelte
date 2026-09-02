<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/components/ui/seo/seo.svelte';
	import { generateSeoProps } from '$lib/modules/seo';
	import CircleDesignElement from '$lib/components/circle-design-element.svelte';
	import LegalPage from '$lib/components/legal-page.svelte';
	import { AppConfig } from '$config/app';
</script>

<Seo
	{...generateSeoProps(
		{
			type: 'WebPage',
			seoTitle: 'Privacy Policy | Niro',
			seoDescription:
				'What nichita-r.com collects: cookieless analytics, a contact form used only to reply to you, no accounts, and tools that never send your files anywhere.'
		},
		page.url
	)}
/>

<CircleDesignElement variation="1" />
<CircleDesignElement variation="2" />

<LegalPage
	title="Privacy Policy"
	standfirst="This site collects almost nothing. Here is the specific list, and how to check it yourself."
	updated="2 September 2026"
>
	<section>
		<h2>The short version</h2>
		<p>
			There are no accounts and no sign-ups. Nothing you put into any tool on this site is sent
			anywhere, because the tools have no server to send it to. The one place you can deliberately
			give me personal data is the contact form, and the only third party that sees anything else
			is a cookieless analytics script.
		</p>
	</section>

	<section>
		<h2>Analytics</h2>
		<p>
			This site uses <a href="https://plausible.io/privacy" rel="noopener noreferrer" target="_blank"
				>Plausible Analytics</a
			>, loaded from <strong>plausible.io</strong>. Plausible is cookieless: it sets no cookies,
			stores nothing on your device, and does not build a profile of you or follow you across other
			websites.
		</p>
		<p>What it records for each page view:</p>
		<ul>
			<li>the page you viewed and the site that referred you</li>
			<li>rough device type, browser and operating system</li>
			<li>country, derived from your IP address</li>
		</ul>
		<p>
			Your IP address is used only to work out the country and is <strong>not stored</strong>. None
			of this identifies you, and there is no way for me to connect a visit to a person.
		</p>
		<p>
			Because nothing is stored on your device, this does not require a cookie banner under the
			ePrivacy Directive — which is the reason this analytics provider was chosen over one that
			does.
		</p>
	</section>

	<section>
		<h2>The tools</h2>
		<p>
			The image resizer, video converter, QR code generator and the other tools on this site run
			<strong>entirely in your browser</strong>. Your images, videos and text are never uploaded.
			There is no upload endpoint to receive them: those pages ship no server code at all.
		</p>
		<p>
			You can verify this yourself. Open your browser's developer tools, switch to the Network tab,
			and use any tool — you will see no request carrying your file.
		</p>
	</section>

	<section>
		<h2>The contact form</h2>
		<p>
			This is the only part of the site that collects personal data. If you submit the form, it
			sends three fields — <strong>your name, your email address and your message</strong> — to my
			own contact service at <strong>api.nichita-r.com</strong>, tagged so I know which of my sites
			it came from. Nothing else about you is attached to it.
		</p>
		<p>
			I use it for one purpose: to read your message and reply. It is not used for marketing, is not
			added to any mailing list, and is not shared with or sold to anyone. Entries are kept while
			the conversation is useful and deleted on request.
		</p>
		<p>
			There is also a plain <code>mailto:</code> link beside the form. That one opens your own email
			client and passes through nothing here — use it if you would rather not submit a form at all.
		</p>
	</section>

	<section>
		<h2>Cookies and local storage</h2>
		<p>
			This site sets <strong>no cookies</strong>. It does not write to local storage or session
			storage. There is no consent banner because there is nothing to consent to.
		</p>
	</section>

	<section>
		<h2>Hosting and where data goes</h2>
		<p>
			Pages are served from servers in the EU. Standard server logs may record IP addresses briefly
			as part of normal operation and abuse prevention; these are not used for analytics or
			combined with anything else.
		</p>
	</section>

	<section>
		<h2>Your rights</h2>
		<p>
			Under the GDPR you have the right to access, correct and erase personal data held about you,
			and to object to its processing. Here that applies to one thing: a contact form submission, or
			an email you have sent me. Ask and I will tell you what I hold or delete it. There is no
			account, profile or tracking identifier to exercise those rights against, because none is
			created.
		</p>
	</section>

	<section>
		<h2>Changes</h2>
		<p>
			If this policy changes, the date at the top changes with it. It is not updated automatically
			on deploys, so that date means something.
		</p>
	</section>

	<section>
		<h2>Who to contact</h2>
		<p>
			Nichita Roilean — <a href={`mailto:${AppConfig.contact.email}`}>{AppConfig.contact.email}</a>
		</p>
	</section>
</LegalPage>
