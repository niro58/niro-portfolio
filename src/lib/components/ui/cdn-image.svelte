<script lang="ts">
	import { Image, type ImageProps } from '@unpic/svelte';
	import { env } from '$env/dynamic/public';
	type Props = ImageProps & {
		src: string;
	};

	const props: Props = $props();

	const { src, ...rest } = props;
</script>

<Image src={env.PUBLIC_IMAGE_CDN + src} {...rest} />
