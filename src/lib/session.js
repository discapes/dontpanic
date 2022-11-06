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
			q: s,
			timestamp: Date.now()
		});
	},
	async askYN(q) {
		await this.msgr.say(q);
		const timestamp = Date.now();
		const a = await this.msgr.askYN();
		this.log.push({
			type: 'YN',
			timestamp,
			q,
			a: a ? 'Yes' : 'No',
			flags: []
		});
		return a;
	},
	async askFrom(q, opts) {
		await this.msgr.say(q);
		const timestamp = Date.now();
		const a = await this.msgr.askFrom(opts);
		this.log.push({
			type: `<${opts}>`,
			timestamp,
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
		const timestamp = Date.now();
		const a = await this.msgr.askTT();
		this.log.push({
			type: 'TT',
			timestamp,
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

async function eveningSession() {}

export function getAssessmentSession() {
	return async function (msgr) {
		let doAgain;
		do {
			const timestamp = Date.now();
			const s = new Session(msgr);

			console.log('fetching...');
			const opts = await fetch('https://espsr360.vtt.fi/freshair/api/survey/full').then((res) =>
				res.json()
			);
			console.log(opts);
			const assmt = await s.askFrom(
				'Hi, which assessment would you like to do?',
				opts.map((f) => f.shortName)
			);

			const quiz = opts.find((f) => f.shortName == assmt);
			const answers = [];
			for (const q of quiz.questions) {
				if (q.type == 'integer') {
					const range = (min, max) => {
						let list = [];
						for (let i = min; i <= max; i++) {
							list.push(i);
						}
						return list;
					};
					const opts = range(q.min, q.max);
					const res = await s.askFrom(q.text, opts);
					answers.push({ questionUuid: q.uuid, value: res });
				}
			}
			const res = await fetch(`/bot?uuid=${quiz.uuid}`, {
				method: 'POST',
				body: JSON.stringify(answers)
			}).then((res) => res.json());
			s.say(`${res.percentagePoint.toFixed(0)}% - ${res.suggestion.text}`);
			doAgain = await s.askYN('Would you like to take another assessment?');
			console.log(doAgain);
			storage_pushSession(timestamp, s.log, 'assessmentSession');
		} while (doAgain);
	};
}

async function defaultSession(msgr) {
	return await morningSession(msgr);
}

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function getSession() {
	const SESSIONS = {
		'8-12': morningSession
	};
	const hour = new Date().getHours();
	let s =
		Object.entries(SESSIONS).find(([k, v]) => {
			const [b, e] = k.split('-');
			if (hour >= b && hour <= e) return true;
		}) ?? defaultSession;
	if (s.length) s = s[1];
	return s;
}
