import { getContext, setContext } from 'svelte';
import { toast } from 'svelte-sonner';
import type { EditableImage } from './editable-image.svelte';
import { ExportFileFormat, ImageExportFormats, type ImageSettings } from '$lib/types/image-video';
import { appPages } from '$config/pages';
import { AppConfig } from '$config/app';
import JSZip from 'jszip';

const IMAGE_SELECTOR_KEY = Symbol('image-selector');

class ImageEditor {
	public images: EditableImage[] = $state([]);
	public settings: ImageSettings = $state({
		aspectRatio: { x: 0, y: 0 },
		fixedSize: { x: 0, y: 0 },
		backgroundColor: '#000000',
		opacity: 0,
		format: ImageExportFormats.PNG,
		cropType: 'outside',
		exportFileFormat: ExportFileFormat.ZIP
	});

	constructor() {
		$effect(() => {
			if (this.images.length > AppConfig.maxImageEditAmount) {
				this.images = this.images.slice(0, AppConfig.maxImageEditAmount);
				toast.error(`You can only have ${AppConfig.maxImageEditAmount} images at a time.`);
			}
		});
	}
	public async export() {
		const dataUrls: {
			name: string;
			dataUrl: string;
		}[] = [];

		for (let i = 0; i < this.images.length; i++) {
			const image = this.images[i];
			const dataUrl = await image.export(this.settings);
			if (dataUrl) {
				dataUrls.push(dataUrl);
			}
		}

		if (this.settings.exportFileFormat === ExportFileFormat.ZIP) {
			const zip = new JSZip();
			for (let i = 0; i < dataUrls.length; i++) {
				zip.file(dataUrls[i].name, dataUrls[i].dataUrl.split('base64,')[1], { base64: true });
			}
			const blob = await zip.generateAsync({ type: 'blob' });
			const a = document.createElement('a');
			a.href = URL.createObjectURL(blob);
			a.download = 'images.zip';
			a.click();
		} else if (this.settings.exportFileFormat === ExportFileFormat.SINGLE) {
			for (let i = 0; i < dataUrls.length; i++) {
				const a = document.createElement('a');
				a.href = dataUrls[i].dataUrl;
				a.download = dataUrls[i].name;
				a.click();
			}
		}

		if (dataUrls.length !== this.images.length) {
			toast.error(
				`Some images could not be exported. Exported ${dataUrls.length} out of ${this.images.length}.`
			);
		} else {
			toast.success(`All images exported successfully.`);
		}
	}
}

export function setImageEditor() {
	return setContext(IMAGE_SELECTOR_KEY, new ImageEditor());
}
export function getImageEditor() {
	return getContext<ReturnType<typeof setImageEditor>>(IMAGE_SELECTOR_KEY);
}
