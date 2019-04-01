<template>
	<div class="box">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: 'Box'
	}
</script>

<style scoped>
	.box {
		margin: 2rem;
		padding: 1.5rem;
		width: auto;
		background-color: #fff;
		border-radius: .2rem;
	}
</style>