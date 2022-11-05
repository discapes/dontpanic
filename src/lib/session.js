/* eslint-disable @typescript-eslint/no-empty-function */

import { storage_pushSession } from './storage';

function Session(msgr) {
	this.msgr = msgr;
	this.log = [];
}

Session.prototype = {
	say(s) {
		this.msgr.say(s);
		this.log.push({
			type: 'msg',
			q: s
		});
	},
	async askYN(q) {
		await this.msgr.say(q);
		const a = await this.msgr.askYN();
		this.log.push({
			type: 'YN',
			q,
			a,
			flags: []
		});
		return a;
	},
	async askFrom(q, opts) {
		await this.msgr.say(q);
		const a = await this.msgr.askFrom(opts);
		this.log.push({
			type: `<${opts}>`,
			q,
			a,
			flags: []
		});
		return a;
	},
	flag(flag) {
		this.log.at(-1).flags.push(flag);
	},
	async askTT(q) {
		await this.msgr.say(q);
		const a = await this.msgr.askTT();
		this.log.push({
			type: 'TT',
			q,
			a,
			flags: []
		});
		return a;
	}
	// async askSmileys() {
	// 	await this.msgr.say(q);
	// 	const a = await this.msgr.askSmileys();
	// 	this.log.push({
	// 		type: 'SM',
	// 		q,
	// 		a,
	// 		flags: []
	// 	});
	// 	return a;
	// }
};

async function morningSession(msgr) {
	const timestamp = Date.now();
	const s = new Session(msgr);
	await s.askTT('Good morning, sunshine! Did you sleep well?');
	///blablabla
	const bf = await s.askYN('Did you have your breakfast already?');
	if (bf) {
		s.say('Great! Grab your water bottle and go conquer the world! Hear you later ;)');
	} else {
		await s.askYN(
			"Now it would be the best time to have one. You know it's important, don't you? ;)"
		);
		s.say("Alright! Don't forget your water bottle and go conquer the world! Hear you later ;)");
	}

	storage_pushSession(timestamp, s.log, 'morningSession');
}

export function getAssessmentSession() {
	return async function (msgr) {
		const timestamp = Date.now();
		const s = new Session(msgr);
		const opts = await fetch('https://espsr360.vtt.fi/freshair/api/category/full').then((res) =>
			res.json()
		);
		const assmt = await s.askFrom(
			'Which assessment would you like to do?',
			opts.map((f) => f.shortName)
		);

		for (const q of opts.find((f) => f.shortName == assmt).questions) {
			if (q.type == 'integer') {
				const range = (min, max) => {
					let list = [];
					for (let i = min; i <= max; i++) {
						list.push(i);
					}
					return list;
				};
				const opts = range(q.min, q.max);
				await s.askFrom(q.text, opts);
			}
		}

		storage_pushSession(timestamp, s.log, 'assessmentSession');
	};
}

async function eveningSession() {}

async function defaultSession(msgr) {
	return await morningSession(msgr);
}

export function getSession() {
	const SESSIONS = {
		'8-12': morningSession
	};
	const hour = new Date().getHours();
	return (
		Object.entries(SESSIONS).find(([k, v]) => {
			const [b, e] = k.split('-');
			if (hour >= b && hour <= e) return true;
		}) ?? defaultSession
	);
}
