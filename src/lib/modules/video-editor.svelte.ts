import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { onMount } from 'svelte';
import { EditableVideo } from './editable-video.svelte';
import { toast } from 'svelte-sonner';
import { ResultVideoFormat, type BasicVideoSettings } from '$lib/types/image-video';

export class VideoEditor {
	ffmpeg: FFmpeg | undefined = $state();
	currState: 'none' | 'loaded' = $state('none');
	videoEl: HTMLVideoElement | undefined = $state();
	videos: EditableVideo[] = $state([]);

	settings: BasicVideoSettings = $state({
		exportFileFormat: ResultVideoFormat.MP4
	});

	constructor() {
		onMount(() => {
			this.loadFfmpeg();
		});

		$effect(() => {
			this.videos.map((video) => {
				if (video.currState === 'done') {
					setTimeout(() => {
						if (video.currState === 'done') {
							video.currState = 'none';
						}
					}, 3000);
				}
			});
		});
	}
	private async loadFfmpeg() {
		const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

		this.ffmpeg = new FFmpeg();

		await this.ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
		});

		this.currState = 'loaded';
	}
	stringToSeconds(duration: string) {
		const [hours, minutes, seconds] = duration.split(':').map((x) => parseFloat(x));
		const milliseconds = duration.split('.')[1] ? parseFloat(duration.split('.')[1]) : 0;
		return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
	}

	public async load(file: File | FileList) {
		if (file instanceof FileList) {
			for (const f of file) {
				await this.load(f);
			}
			return;
		}
		this.videos.push(new EditableVideo(file));
	}
	async export() {
		if (!this.ffmpeg) {
			toast.error('FFmpeg not loaded. Try in a few seconds.');
			return;
		}
		if (this.videos.length === 0) {
			toast.error('No videos to export.');
			return;
		}
		if (this.videos.some((video) => video.currState !== 'none')) {
			toast.error('Already exporting a video.');
			return;
		}
		this.videos.map(async (video) => {
			if (!this.ffmpeg) return;
			this.ffmpeg.on('progress', ({ progress }) => {
				video.currProgress.target = Math.round(progress * 100);
			});

			video.currState = 'exporting';
			await this.ffmpeg.writeFile(video.filename, await fetchFile(video.file));

			await this.ffmpeg.exec(['-i', video.filename, `output.${this.settings.exportFileFormat}`]);
			const data = await this.ffmpeg.readFile(`output.${this.settings.exportFileFormat}`);

			const a = document.createElement('a');
			if (typeof (data) === "string") {
				console.error("wrong type of data" + data)
				return;
			}
			const blob = new Blob([data.buffer as any], { type: 'video/mp4' });
			a.href = URL.createObjectURL(blob);
			a.download = `output.${this.settings.exportFileFormat}`;
			a.click();
			video.currState = 'done';
		});
	}
}
