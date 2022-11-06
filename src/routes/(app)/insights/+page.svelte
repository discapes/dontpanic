<script>
	const insights = [
		[
			`All of your thoughts about the past and the future are just thoughts. They may not necessarily
			reflect anything in the real world that will show up in your life. All you have, is this
			moment.`,
			'/conclusion-icon.svg'
		],
		[
			`Your mind is responsible for every action you take
			in life. The quality of every relationship is determined by the health of the minds involved.
			So, why not train your mind?`,
			'/psychological-icon.svg'
		][
			(`Notice your propensity to
			compare yourself to other people. This is actually a reliable way to make yourself unhappy.
			Even when you feel superior, that can't be the foundation of any healthy relationship.`,
			'/comparison-icon.svg')
		][
			(`No pain, is in fact, unbearable. Thinking "this pain is
			unbearable" at some moment, means you've already endured the pain at that moment. We're only
			thinking about the pain continuing to the next moments and what it could mean for us.`,
			'/symptoms-body-pain-icon.svg')
		]
	];

	let i = 0;
	let insight = insights[i];
</script>

<svelte:head>
	<title>Insights</title>
	<meta name="description" content="Insights" />
</svelte:head>

<div class="flex flex-col w-full justify-center items-center">
	<div class="flex justify-center p-10 m-5 text-sm max-w-sm">
		<i>
			{insight}
		</i>
		<button />
	</div>
</div>
