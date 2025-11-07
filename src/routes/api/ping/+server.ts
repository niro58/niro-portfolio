import { json } from '@sveltejs/kit';

export async function GET() {
    return json({ message: 'pong' });
}


export const prerender = true;