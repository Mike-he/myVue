<template>
	<div>
		<div class="logo">
			<div class="animate">
				<img :src="require('@img/logo.png')" alt="">
				<span class="logo-title">可口可乐在上海 新品英雄会礼品兑换</span>
			</div>
		</div>

		<div class="breadcrumb">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>首页</el-breadcrumb-item>
				<el-breadcrumb-item>兑换订单管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<box>
			<div class="">
				<div class="box-row">
					<div class="box-cell">
						<div class="box-cell">
							订单号：
						</div>
						<div class="box-cell">
							<el-input v-model="form.trade_id" placeholder="请输入内容"></el-input>
						</div>
					</div>
					<div class="box-cell">
						<div class="box-cell">
							手机号：
						</div>
						<div class="box-cell">
							<el-input v-model="form.receiver_mobile" placeholder="请输入内容"></el-input>
						</div>
					</div>
					<div class="box-cell">
						<div class="box-cell">
							姓名：
						</div>
						<div class="box-cell">
							<el-input v-model="form.receiver_name" placeholder="请输入内容"></el-input>
						</div>
					</div>
				</div>
				<div class="box-row">
					<div class="box-cell">
						<div class="box-cell">
							订单时间：
						</div>
						<div class="box-cell">
							<el-date-picker
									v-model="form.date"
									type="daterange"
									format="yyyy-MM-dd"
									value-format="yyyy.MM.dd"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期">
							</el-date-picker>
						</div>
					</div>
					<div class="box-cell">
						<div class="box-cell">
							订单状态
						</div>
						<div class="box-cell">
							<el-select v-model="form.status" placeholder="请选择">
								<el-option
										v-for="item in statusList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="box-cell">
						<el-button
								type="primary"
								:loading="buttonLoading"
								@click="getList"
						>
							查询
						</el-button>
					</div>
				</div>
			</div>
		</box>

		<box>
			<div class="button-box">
				<download-excel
						:data="exportData"
						:fields="tableFields"
						name="YourCola.xls"
						class="export-button"
				>
					<el-button type="success">导出Excel</el-button>
				</download-excel>
			</div>
			<el-table
					:data="tableData"
					v-loading="loading"
					element-loading-text="拼命加载中"
					element-loading-background="rgba(236, 245, 255, 0.8)"
					stripe
					style="width: 100%; min-height: 100px; color: #000 !important;">
				<el-table-column
						prop="gift_name"
						label="礼品名称">
				</el-table-column>
				<el-table-column
						prop="receiver_name"
						label="收件人">
				</el-table-column>
				<el-table-column
						prop="receiver_mobile"
						label="手机号">
				</el-table-column>
				<el-table-column
						prop="create_time"
						label="订单时间">
				</el-table-column>
				<el-table-column
						prop="trade_num"
						label="订单件数">
				</el-table-column>
				<el-table-column
						prop="receiver_address"
						label="收货地址">
				</el-table-column>
				<el-table-column
						prop="status"
						label="订单状态">
				</el-table-column>
			</el-table>
		</box>
	</div>
</template>

<script>
	export default {
		name: 'Order',
		data() {
			return {
				form: {
					trade_id: '',
					receiver_mobile: '',
					receiver_name: '',
					date: [
						new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
						new Date(new Date().getTime() - 1 * 24 * 3600 * 1000)
					],
					status: ''
				},
				statusList: [
					{
						value: '',
						label: '全部'
					},
					{
						value: 1,
						label: '已发货'
					},
					{
						value: 0,
						label: '未发货'
					},
					{
						value: -1,
						label: '已取消'
					}
				],
				tableData: [],
				exportData: [],
				tableFields: {
					'礼品名称': 'gift_name',
					'收件人': 'receiver_name',
					'手机号': 'receiver_mobile',
					'订单时间': 'create_time',
					'礼品数量': 'trade_num',
					'收获地址': 'receiver_address',
					'订单状态': 'status',
				},
				loading: false,
				buttonLoading: false,
			}
		},
		filters: {
			statusFilter: (val) => {
				switch (val) {
					case 1:
						return '已发货';
					case 0:
						return '未发货';
					case -1:
						return '已取消';
				}
			}
		},
		methods: {
			getList() {
				this.loading = true;

				let start_time = this.form.date[0] !== undefined ? this.form.date[0] : '';
				let end_time = this.form.date[1] !== undefined ? this.form.date[1] : '';

				this.$axios
						.post(
								this.$store.state.API_URL + "/orders/"
								+ "?JSESSIONID=" + this.JSESSIONID
								+ "&pageLimit=10000"
								,
								{
									trade_id: this.form.trade_id,
									receiver_mobile: this.form.receiver_mobile,
									receiver_name: this.form.receiver_name,
									start_time: start_time,
									end_time: end_time,
									status: this.form.status
								}
						)
						.then((res) => {
							if (!res.data.code) {
								this.transferData(res.data.Records);
								// this.tableData = res.data.Records;
								this.loading = false;
							} else {
								this.$message.warning('JSESSIONID已失效请重新输入哦！');
								setTimeout(() => {
									this.$router.push('/');
								}, 1000);
							}
						})
						.catch((err) => {
							this.$message.warning('JSESSIONID已失效请重新输入哦！');
							setTimeout(() => {
								this.$router.push('/');
							}, 1000);
						});
			},
			transferData(inputData) {
				this.tableData = [];

				for (let row of inputData) {
					if (row.status !== -1) {
						this.exportData.push({
							gift_name: row.gift_name,
							receiver_name: row.receiver_name,
							receiver_mobile: row.receiver_mobile.replace(/<[^>]+>/g, ""),
							create_time: this.dataTransform(row.create_time),
							trade_num: row.trade_num,
							receiver_address: row.receiver_address,
							status: this.statusFilter(row.status),
						});
					}

					this.tableData.push({
						gift_name: row.gift_name,
						receiver_name: row.receiver_name,
						receiver_mobile: row.receiver_mobile.replace(/<[^>]+>/g, ""),
						create_time: this.dataTransform(row.create_time),
						trade_num: row.trade_num,
						receiver_address: row.receiver_address,
						status: this.statusFilter(row.status),
					});
				}
			},
			dataTransform(val) {
				val = val.replace(/-/g, "/");
				val = val.replace(/(\.\d+)?/g, "");
				return val.split(' ')[0];
			},
			statusFilter(val) {
				switch (val) {
					case 1:
						return '已发货';
					case 0:
						return '未发货';
					case -1:
						return '已取消';
				}
			}
		},
		computed: {
			JSESSIONID() {
				return this.$cookies.get('JSESSIONID');
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

	.logo {
		width: 100%;
		height: 5rem;
		background-color: rgb(221, 37, 37);
	}

	.animate {
		animation: showin 1s;
	}

	@keyframes showin {
		from {
			margin-left: 15rem;
			opacity: 0;
		}

		to {
			margin-left: 0;
			opacity: 1;
		}
	}

	.logo-title {
		position: absolute;
		color: #fff;
		font-size: 1.6rem;
		font-weight: bold;
		line-height: 5rem;
	}

	.breadcrumb {
		font-weight: bold;
		margin: 2rem;
	}

	.button-box {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.export-button {
		margin-bottom: 1rem;
	}

	.export-button button {
		width: 300px;
	}
</style>