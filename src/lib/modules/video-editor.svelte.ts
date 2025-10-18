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
			return () => {
				console.log("destroyed");
			}
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
		const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm';

		const ffmpeg = new FFmpeg()

		ffmpeg.on('log', ({ message }) => {
			console.log(message);
		});

		await ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
			wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm')
		});
		this.ffmpeg = ffmpeg
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
		if (this.videos.some((video) => video.currState === 'exporting')) {
			toast.error('An export is already in progress.');
			return;
		}

		for (const video of this.videos) {
			if (!this.ffmpeg) return;
			video.currProgress.set(0);

			this.ffmpeg.on('progress', ({ progress }) => {
				const currentProgress = Math.max(0, Math.min(1, progress));
				video.currProgress.target = Math.round(currentProgress * 100);
			});

			const outputFilename = `output.${this.settings.exportFileFormat}`;

			try {
				video.currState = 'exporting';
				await this.ffmpeg.writeFile(video.filename, await fetchFile(video.file));

				await this.ffmpeg.exec([
					'-i',
					video.filename,
					'-y',
					outputFilename
				]);

				const data = await this.ffmpeg.readFile(`output.${this.settings.exportFileFormat}`);

				if (typeof data === 'string') {
					console.error("FFmpeg returned a string instead of file data:", data);
					video.currState = 'none';
					continue;
				}

				console.log("Export finished, creating download link.");
				const blob = new Blob([data.buffer as any], { type: 'video/mp4' });
				const a = document.createElement('a');
				a.href = URL.createObjectURL(blob);
				a.download = `output.${this.settings.exportFileFormat}`;
				a.click();
				URL.revokeObjectURL(a.href);

				video.currState = 'done';

			} catch (error) {
				console.error("An error occurred during ffmpeg export:", error);
				toast.error(`Failed to export ${video.filename}.`);
				video.currState = 'none';
			} finally {
				// CRITICAL: Clean up the virtual filesystem to prevent memory leaks
				if (this.ffmpeg) {
					try {
						await this.ffmpeg.deleteFile(video.filename);
						await this.ffmpeg.deleteFile(outputFilename);
					} catch (e) {
						console.error("Could not delete files from virtual FS", e);
					}
				}
			}
		}
	}
}
