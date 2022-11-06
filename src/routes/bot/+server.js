export async function POST({ url, request }) {
	return await fetch(
		`https://espsr360.vtt.fi/freshair/api/survey/${url.searchParams.get('uuid')}/answer`,
		{
			method: 'POST',
			body: await request.text(),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
}
