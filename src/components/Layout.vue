<template>
	<div>
		<div class="layout-header">
			<div>
				<img :src="require('@img/logo.png')" alt="">
			</div>
			<div class="layout-header-title">
				<span>可口可乐在上海 新品英雄会礼品兑换</span>
			</div>
		</div>

		<div class="table">
			<div class="table-row">
				<div class="table-cell nav">
					<nav-menu></nav-menu>
				</div>
				<div class="table-cell">
					<order></order>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import navMenu from '@/components/navigation/NavMenu'
	import order from '@/components/order-management/Order'

	export default {
		name: 'Layout',
		components: {
			navMenu,
			order,
		},
		data() {
			return {
			}
		},
		methods: {}
	}
</script>

<style scoped>
	.layout-header {
		background-color: rgb(221, 37, 37);
		display: flex;
	}

	.layout-header-title {
		color: #fff;
		line-height: 5rem;
		font-size: 1.67rem;
		font-weight: bold;
	}

	.table {
		display: table;
		width: 100%;
	}
	.nav {
		width: 200px;
		min-width: 200px;
	}
	.table-row {
		display: table-row;
	}
	.table-cell {
		display: table-cell;
	}
</style>
