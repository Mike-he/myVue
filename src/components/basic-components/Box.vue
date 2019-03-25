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
		margin: 1rem;
		padding: 1rem;
		border: 1px solid #eee;
		border-radius: .2rem;
	}
	.el-table {
		border: 1px solid #eee;
	}
	.el-table tr, .el-table th{
		background-color: #eee !important;
	}
</style>