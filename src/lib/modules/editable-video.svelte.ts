import { Tween } from 'svelte/motion';
export class EditableVideo {
	file: File | undefined = $state();
	filename: string = $state('');

	currState: 'none' | 'exporting' | 'error' | 'done' = $state('none');
	currProgress = new Tween(0);

	constructor(file: File) {
		this.file = file;
		this.filename = file.name.split('.').slice(0, -1).join('.');
	}
}
