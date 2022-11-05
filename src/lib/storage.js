export let data = localStorage.getItem('log') ? JSON.parse(localStorage.getItem('log')) : [];
// 	{
// 		date: 'YYYY-MM-DD',
// 		sessions: [
// 			{
// 				type: 'assessment1',
// 				time: 'timestamp',
// 				qna: [
// 					{
// 						type: 'foo',
// 						q: 'abcsdaf',
// 						a: 'answer aoso dasf',
// 						flags: {}
// 					}
// 				],
// 				analysis: {}
// 			},
// 			{
// 				type: 'journal_morning',
// 				time: 'timestamp',
// 				qna: [
// 					{
// 						type: 'foo',
// 						q: 'afasdf',
// 						a: 'answer to asdsaf',
// 						flags: {}
// 					}
// 				],
// 				analysis: {}
// 			}
// 		]
// 	}
// ];

function ISODate() {
	const d = new Date();
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function storage_pushSession(timestamp, log, type) {
	const today =
		data.at(-1).date === ISODate()
			? data.at(-1)
			: (data.push({ date: ISODate(), sessions: [] }), data.at(-1));

	today.sessions.push({
		timestamp,
		type,
		log
	});
	localStorage.setItem('log', JSON.stringify(data));
}
