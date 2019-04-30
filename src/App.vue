<template>
	<div>
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
			try{
				document.body.removeChild(document.getElementById('appLoading'));
			} catch (e) {}
		}
	};
</script>

<style>
	html {
		font-size: 12px;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
		background-color: rgb(247,247,247);
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
