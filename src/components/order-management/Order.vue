<template>
	<div>
		<div class="breadcrumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>首页</el-breadcrumb-item>
				<el-breadcrumb-item>兑换订单管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<box>
			<div>
				{{ cookie }}
			</div>
			<el-table
					:data="tableData"
					stripe
					style="width: 100%">
				<el-table-column
						prop="trade_id"
						label="订单编号">
				</el-table-column>
				<el-table-column
						prop="name"
						label="礼品分类">
				</el-table-column>
				<el-table-column
						prop="date"
						label="收件人姓名">
				</el-table-column>
				<el-table-column
						prop="date"
						label="收件人手机号">
				</el-table-column>
				<el-table-column
						prop="date"
						label="订单时间">
				</el-table-column>
				<el-table-column
						prop="date"
						label="订单英雄币">
				</el-table-column>
				<el-table-column
						prop="date"
						label="订单件数">
				</el-table-column>
				<el-table-column
						prop="date"
						label="订单状态">
				</el-table-column>
			</el-table>

			<div class="button-box">
				<download-excel
						:data="tableData"
						class="export-button"
				>
					<el-button type="primary" plain>导出Excel</el-button>
				</download-excel>
			</div>
		</box>
	</div>
</template>

<script>
	export default {
		name: 'Order',
		data() {
			return {
				cookie: this.$cookies.get('JSESSIONID'),
				tableData: []
			}
		},
		methods: {
			getList() {
				this.$axios({
					method: 'POST',
					url: "http://47.100.236.162/ajax.php" + "?JSESSIONID=" + this.cookie,
				}).then((res) => {
					if (res) {
						this.tableData = res.data.Records;
					}
				}).catch(function (error) {
					if (error.response) {
						// 发送请求后，服务端返回的响应码不是 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						// 发送请求但是没有响应返回
						console.log(error.request);
					} else {
						// 其他错误
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
			}
		},
		mounted() {
			this.getList();
		}
	}
</script>

<style scoped>
	* {
		/*font-size: 1rem !important;*/
	}

	.breadcrumb {
		font-weight: bold;
		margin-top: 20px;
		margin-left: 20px;
	}

	.button-box {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.export-button {
		margin-top: 10px;
	}

	.export-button button {
		width: 300px;
	}
</style>