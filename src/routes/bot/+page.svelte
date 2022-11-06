<script>
	import ChatMessage from './ChatMessage.svelte';
	import { page } from '$app/stores';
	import { getSession, getAssessmentSession, delay } from '$lib/session';
	import { onMount } from 'svelte';
	import { data } from '$lib/storage';
	import '../(app)/styles.css';

	let nameMe = 'Miika';
	let profilePicMe =
		// 'https://static.vecteezy.com/system/resources/previews/002/640/730/non_2x/default-avatar-placeholder-profile-icon-male-vector.jpg';
		'https://isaca-gwdc.org/wp-content/uploads/2016/12/male-profile-image-placeholder.png';

	let nameChatPartner = 'InMind AI';
	let profilePicChatPartner = '/inmind.png';

	let messages = [
		// {
		// 	messageId: 416,
		// 	message: 'abc',
		// 	timestamp: 1587139022488.826,
		// 	sentByMe: false,
		// 	timeRead: 1587139025367.015
		// },
		// {
		// 	messageId: 417,
		// 	message: 'test',
		// 	timestamp: 1587139034294.678,
		// 	sentByMe: true,
		// 	timeRead: 1587139048713.461
		// }
	];

	let todayMessages = [
		// {
		// 	messageId: 420,
		// 	message: 'teeeeest',
		// 	timestamp: 1587139349155.217,
		// 	sentByMe: false,
		// 	timeRead: 1587139359024.353
		// },
		// {
		// 	messageId: 426,
		// 	message: 'asdf',
		// 	timestamp: 1587577393781.811,
		// 	sentByMe: true,
		// 	timeRead: 1587686514958.049
		// }
	];
	let mid = 500;

	let resolveInput;
	let waitingForFreeText = false;
	async function getInput() {
		const inputPromise = new Promise((res) => (resolveInput = res));
		return await inputPromise;
	}

	function scrollBottom() {
		const dc = document.querySelector('.direct-chat-messages').parentElement;
		setTimeout(() => (dc.scrollTop = dc?.scrollHeight), 1);
	}
	onMount(async () => {
		if (window.location.search.includes('log')) {
			let _data;
			if (localStorage.getItem('log')) _data = JSON.parse(localStorage.getItem('log'));
			else _data = data;
			console.log(_data);
			todayMessages = _data
				.flatMap((day) => day.sessions)
				.flatMap((s) => s.log)
				.flatMap((qna) => {
					const arr = [
						{
							messageId: mid++,
							message: qna.q,
							timestamp: qna.timestamp,
							sentByMe: false,
							timeRead: 1587686514958.049
						}
					];
					if (qna.type != 'msg')
						arr.push({
							messageId: mid++,
							message: qna.a,
							timestamp: 0,
							sentByMe: true,
							timeRead: 1587686514958.049
						});
					return arr;
				});
			console.log(todayMessages);
			return;
		}

		const session = window.location.search.includes('assessment')
			? getAssessmentSession()
			: getSession();
		// console.log({ session });
		await session({
			async say(msg) {
				await delay(500);
				todayMessages = [
					...todayMessages,
					{
						messageId: mid++,
						message: msg,
						timestamp: Date.now(),
						sentByMe: false,
						timeRead: 1587686514958.049
					}
				];
				scrollBottom();
			},
			async askYN() {
				todayMessages.at(-1).extraButtons = ['Yes', 'No'];
				todayMessages = todayMessages;
				let res = null;
				do {
					res = await getInput();
				} while (!['Yes', 'No'].includes(res));

				return res === 'Yes';
			},
			async askFrom(opts) {
				todayMessages.at(-1).extraButtons = opts;
				todayMessages = todayMessages;
				let res = null;
				do {
					res = await getInput();
				} while (!opts.includes(res));

				return res;
			},
			async askTT() {
				todayMessages.at(-1).extraButtons = ['👍', '🤷', '👎'];
				todayMessages = todayMessages;
				let res = null;
				do {
					res = await getInput();
					console.log({ res });
				} while (!['👍', '🤷', '👎'].includes(res));

				return res;
			}
		});
	});

	function kd() {
		if (this.msg.value) {
			const msg = this.msg.value;
			todayMessages = [
				...todayMessages,
				{
					messageId: mid++,
					message: msg,
					timestamp: Date.now(),
					sentByMe: true,
					timeRead: 1587686514958.049
				}
			];
			this.reset();
			scrollBottom();
			if (resolveInput && waitingForFreeText) resolveInput(msg);
		}
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	/>
</svelte:head>
<div class="p-10 h-full">
	<div class="card card-danger direct-chat direct-chat-danger h-full w-full">
		<div class="card-header">
			<div class="card-tools d-flex">
				<img class="contacts-img" src={profilePicChatPartner} alt="profilePic" />
				<span class="contacts-name">{nameChatPartner}</span>
				<span class="mr-auto" />
				<a type="button" href="/" class="btn btn-tool" title="Exit"
					><img class="w-5 h-5" src="https://cdn-icons-png.flaticon.com/512/320/320140.png" /></a
				>
				{#if !$page.url.searchParams.toString().includes('log')}
					<a href="/bot?log" target="_blank" type="button" class="btn btn-tool">
						<img class="w-5 h-5" src="https://cdn-icons-png.flaticon.com/512/32/32223.png" />
					</a>
				{/if}
			</div>
		</div>
		<div class="card-body">
			<div class="direct-chat-messages">
				{#each messages as message}
					<ChatMessage
						{nameMe}
						{profilePicMe}
						{nameChatPartner}
						{profilePicChatPartner}
						message={message.message}
						timestamp={message.timestamp}
						sentByMe={message.sentByMe}
						timeRead={message.timeRead}
					/>
				{/each}

				<!-- <TodayDivider /> -->
				{#each todayMessages as todayMessage}
					<ChatMessage
						on:select={(e) => {
							todayMessage.selected = e.detail;
							resolveInput?.(e.detail);
						}}
						{nameMe}
						{profilePicMe}
						{nameChatPartner}
						{profilePicChatPartner}
						message={todayMessage.message}
						timestamp={todayMessage.timestamp}
						sentByMe={todayMessage.sentByMe}
						timeRead={todayMessage.timeRead}
						isToday={true}
						extraButtons={todayMessage.extraButtons}
						selected={todayMessage.selected}
					/>
				{/each}
			</div>
		</div>
		<div class="card-footer">
			<form class="input-group" on:submit|preventDefault={kd}>
				<input type="text" name="msg" placeholder="Type Message ..." class="form-control" />
				<span class="input-group-append">
					<input type="submit" class="btn btn-primary" value="Send" />
				</span>
			</form>
		</div>
	</div>
</div>

<style>
	.direct-chat .card-body {
		overflow-x: hidden;
		padding: 0;
		position: relative;
	}

	.direct-chat-messages {
		-webkit-transform: translate(0, 0);
		transform: translate(0, 0);
		/* height: 350px; */
		overflow: auto;
		padding: 10px;
		transition: -webkit-transform 0.5s ease-in-out;
		transition: transform 0.5s ease-in-out;
		transition: transform 0.5s ease-in-out, -webkit-transform 0.5s ease-in-out;
	}

	.contacts-img {
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
	.contacts-name {
		margin-left: 15px;
		font-weight: 600;
	}
</style>
