<template>
	<div>
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
						:data="tableData"
						class="export-button"
				>
					<el-button type="primary" plain>导出Excel</el-button>
				</download-excel>
			</div>
			<el-table
					:data="tableData"
					v-loading="loading"
					element-loading-text="拼命加载中"
					element-loading-background="rgba(236, 245, 255, 0.8)"
					stripe
					style="width: 99%; min-height: 100px; color: #000 !important;">
				<el-table-column
						prop="trade_id"
						label="订单编号">
				</el-table-column>
				<el-table-column
						prop="name"
						label="礼品分类">
				</el-table-column>
				<el-table-column
						prop="receiver_name"
						label="收件人姓名">
				</el-table-column>
				<el-table-column
						prop="receiver_name"
						label="收件人手机号">
				</el-table-column>
				<el-table-column
						prop="create_time"
						label="订单时间">
				</el-table-column>
				<el-table-column
						prop="trade_point"
						label="订单英雄币">
				</el-table-column>
				<el-table-column
						prop="trade_num"
						label="订单件数">
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
					date: '',
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
				tableData: [
					{
						'trade_id': ''
					},
				],
				loading: false,
				buttonLoading: false,
			}
		},
		watch: {
			'form.date'(val) {
				console.log(val[0]);
			}
		},
		methods: {
			getList() {
				this.loading = true;

				let start_time = this.form.date[0] !== undefined ? this.form.date[0] : '';
				let end_time = this.form.date[1] !== undefined ? this.form.date[1] : '';

				this.$axios
						.post(
								this.$store.state.API_URL + "/orders/" + "?JSESSIONID=" + this.JSESSIONID,
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
							if (res) {
								this.tableData = res.data.Records;
								this.loading = false;
							}
						})
						.catch((err) => {
							// this.$cookies.remove('username');
							// this.$cookies.remove('password');
							this.$message.warning('JSESSIONID已失效请重新输入哦！');
							setTimeout(() => {
								this.$router.push('/');
							}, 1000);
						});
			}
		},
		computed: {
			JSESSIONID() {
				return this.$store.getters.getJSESSIONID;
			}
		},
		mounted() {
			// this.getList();
		}
	}
</script>

<style scoped>
	* {
		/*font-size: 1rem !important;*/
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