<template>
	<div>
		<div class="tac">
			<el-menu
					default-active="1">
				<el-menu-item index="1">
					<i class="el-icon-menu"></i>
					<span slot="title">兑换订单管理</span>
				</el-menu-item>
			</el-menu>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NavMenu'
	}
</script>

<style>
	.tac {
		height: inherit;
	}
</style>