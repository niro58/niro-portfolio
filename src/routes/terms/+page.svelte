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
			seoTitle: 'Terms of Service | Niro',
			seoDescription:
				'The terms for using nichita-r.com and its free browser-based tools: what you may do with them, and what is not promised.'
		},
		page.url
	)}
/>

<CircleDesignElement variation="1" />
<CircleDesignElement variation="3" />

<LegalPage
	title="Terms of Service"
	standfirst="This is a personal site with a blog and a handful of free tools. These are the terms for using them."
	updated="2 September 2026"
>
	<section>
		<h2>What this site is</h2>
		<p>
			nichita-r.com is the personal website of Nichita Roilean: a portfolio, a blog, and a set of
			free tools that run in your browser. It is offered as-is, for anyone to use, with no account
			and no charge.
		</p>
	</section>

	<section>
		<h2>Using the tools</h2>
		<p>
			The tools are free to use for anything, including commercial work. There is no usage limit and
			nothing to attribute. Since they run entirely in your browser, whatever you produce with them
			is yours and never reaches me.
		</p>
		<p>Please do not:</p>
		<ul>
			<li>use the site to break the law, or to help anyone else do so</li>
			<li>
				attempt to disrupt or overload it, or to access parts of it that are not publicly offered
			</li>
			<li>republish the site's content as your own</li>
		</ul>
	</section>

	<section>
		<h2>No warranty</h2>
		<p>
			Everything here is provided <strong>as-is and without warranty</strong>. The tools may have
			bugs, may produce wrong output, and may stop working or disappear without notice. Do not rely
			on any of them for anything where an incorrect result would matter — check the output before
			you use it.
		</p>
		<p>
			To the extent the law allows, I accept no liability for loss or damage arising from use of
			this site, including lost data or lost work. Because the tools run locally and keep nothing,
			anything you have not saved yourself is not recoverable.
		</p>
	</section>

	<section>
		<h2>Content and ownership</h2>
		<p>
			The writing, design and code of this site are mine unless stated otherwise. You are welcome to
			quote from the blog with a link back. Wholesale copying of articles is not.
		</p>
		<p>
			Third-party names, logos and trademarks mentioned in posts or portfolio entries belong to
			their owners and are referred to descriptively.
		</p>
	</section>

	<section>
		<h2>External links</h2>
		<p>
			This site links to other sites. I do not control them and am not responsible for their content
			or their privacy practices.
		</p>
	</section>

	<section>
		<h2>Privacy</h2>
		<p>
			What is and is not collected is set out in the <a href="/privacy/">Privacy Policy</a>. The
			short version: almost nothing.
		</p>
	</section>

	<section>
		<h2>Changes</h2>
		<p>
			These terms may change; the date at the top changes with them. Continuing to use the site
			after a change means the new terms apply.
		</p>
	</section>

	<section>
		<h2>Governing law and contact</h2>
		<p>
			These terms are governed by the law of the Czech Republic. Questions to Nichita Roilean —
			<a href={`mailto:${AppConfig.contact.email}`}>{AppConfig.contact.email}</a>
		</p>
	</section>
</LegalPage>
