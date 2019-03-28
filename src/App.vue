<template>
	<div>
		<div class="layout-header">
			<div>
				<!--<img :src="require('@img/logo.png')" alt="">-->
			</div>
			<div class="layout-header-title">
				<!--<span>可口可乐在上海 新品英雄会礼品兑换</span>-->
			</div>
		</div>
		<div>
			<router-view/>
		</div>
	</div>
</template>

<script>
	import wxConfig from '@/assets/script/wxConfig';

	export default {
		name: "App",
		mounted() {
			// wxConfig();
		}
	};
</script>

<style>
	html {
		font-size: 12px;
		font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue",
		"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei",
		Arial, sans-serif;
		background-color: rgb(239,239,239);
	}
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
</style>
