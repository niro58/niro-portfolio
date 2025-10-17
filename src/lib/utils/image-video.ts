import type { Vector2 } from "$lib/types/image-video";

export function aspectRatioToKey(aspectRatio: Vector2) {
    return `${aspectRatio.x}:${aspectRatio.y}`;
}
export function keyToAspectRatio(key: string): Vector2 {
    const [x, y] = key.split(':').map(Number);
    return { x, y };
}
export function numberToTime(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
export function randomString(length: number = 9) {
    let result = '';
    while (result.length < length) {
        result += Math.random().toString(36).substr(2, length);
    }
    return result.slice(0, length);
}
export function round(value: number, decimals: number = 0) {
    const factor = 10 ** decimals;
    return Math.round(value * factor) / factor;
}