import nodePath from 'node:path';
export async function GET() {
	const slugs: string[] = [];
	const data = import.meta.glob('./../../../posts/*.md');
	for (const [path] of Object.entries(data)) {
		const slug = nodePath.parse(path).name;
		slugs.push(slug);
	}
	return new Response(JSON.stringify(slugs));
}
