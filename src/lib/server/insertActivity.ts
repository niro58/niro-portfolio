import { MONGO_API_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';

export async function processEvent(form: any, key: string) {
	const entry = {
		web: 'niro-portfolio-web',
		data: {
			...form.data,
			key: key
		},
		created: new Date().toISOString()
	};
	try {
		await insertContactEntry(entry);
	} catch (e) {
		return fail(500, {
			form,
			error: e
		});
	}
}

export async function insertContactEntry(entry: any) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Request-Headers', '*');
	headers.append('Access-Control-Request-Method', 'POST');
	headers.append('api-key', MONGO_API_KEY);

	const raw = {
		collection: 'entries',
		database: 'entries',
		dataSource: 'ContactEntries',
		document: entry
	};
	const requestOptions = {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(raw)
	};

	const res = await fetch(
		'https://eu-central-1.aws.data.mongodb-api.com/app/data-qtcvz/endpoint/data/v1/action/insertOne',
		requestOptions
	);

	if (!res.ok) {
		throw new Error('Failed to insert contact entry');
	}

	return res.json();
}
export async function insertEmail(senderKey: string, subject: string, body: string, to: string) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('Access-Control-Request-Headers', '*');
	headers.append('Access-Control-Request-Method', 'POST');
	headers.append('api-key', MONGO_API_KEY);

	const raw = {
		collection: 'emails',
		database: 'entries',
		dataSource: 'ContactEntries',
		document: {
			senderKey: senderKey,
			to: to,
			subject: subject,
			body: body,
			created_at: new Date().toISOString()
		}
	};
	const requestOptions = {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(raw)
	};

	const res = await fetch(
		'https://eu-central-1.aws.data.mongodb-api.com/app/data-qtcvz/endpoint/data/v1/action/insertOne',
		requestOptions
	);

	if (!res.ok) {
		throw new Error('Failed to insert contact entry');
	}

	return res.json();
}
