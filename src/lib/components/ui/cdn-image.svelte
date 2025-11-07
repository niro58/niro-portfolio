<script lang="ts">
	import { AppConfig } from '$config/app';
	import { Image, type ImageProps } from '@unpic/svelte';
	type Props = ImageProps & {
		src: string;
	};

	const props: Props = $props();

	const { src, ...rest } = props;
</script>

<Image src={AppConfig.publicImageCdn + src} {...rest} />
