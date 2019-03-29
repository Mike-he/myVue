<template>
	<div class="login-box">
		<div class="logo">
			<img :src="require('@img/cup.png')" alt="">
			<div class="logo-title">你的可乐</div>
		</div>
		<div class="login-content">
			<div class="box">
				<div class="box-row">
					<div class="box-cell box-cell-title">
						<span class="j-label">JsessionID</span>
					</div>
					<div class="box-cell">
						<el-input
								class="j-input"
								placeholder=""
								autofocus=true
								spellcheck=false
								@keyup.enter.native="submit"
								v-model="JSESSIONID"
						>
						</el-input>
						<el-button
								type="text"
								class="login-button"
								:loading="buttonLoading"
								v-show="buttonLoading"
						>
							验证中...
						</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				JSESSIONID: '',
				buttonLoading: false,
			}
		},
		watch: {
			JSESSIONID(val) {
				this.submit();
			},
		},
		methods: {
			storeJSESSIONID(val) {
				this.$store.dispatch('setJSESSIONID', val);

				setTimeout(() => {
					this.$router.push('/order');
				}, 1000);
			},
			submit() {
				this.buttonLoading = true;
				this.$axios
						.post(
								this.$store.state.API_URL + "/orders/" + "?JSESSIONID=" + this.JSESSIONID,
						)
						.then((res) => {
							if (!res.data.code) {
								this.storeJSESSIONID(this.JSESSIONID);
								this.$message.success('验证成功！');
							} else {
								this.$message.warning(res.data.msg);
							}
						})
						.catch((err) => {
							this.$message.warning('验证错误!');
						})
						.finally(() => {
							this.buttonLoading = false;
						})
			}
		},
	}
</script>

<style>
	.login-box {
		width: 100%;
		justify-content: center;
		margin-top: 18rem;
	}

	.logo {
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.logo-title {
		color: #409EFF;
		font-size: 2.5rem;
		line-height: 8.5rem;
		margin-left: 1rem;
	}

	@keyframes show {
		from {
			margin-right: 10rem;
			opacity: 0;
		}
		to {
			margin-right: 0;
			opacity: 1;
		}
	}

	.logo img {
		max-width: 100%;
		height: 100%;
		animation: show 1s ease;
	}

	.login-content {
		display: flex;
		margin-top: 7rem;
		width: 100%;
		height: 10rem;
		justify-content: center;
		align-items: center;
	}

	.login-content .box {
		display: table;
		align-items: center;
		padding: 2rem;
		background-color: #fff;
		height: 100%;
		width: 50rem;
		transition: all .3s;
	}

	.login-content .box:hover {
		box-shadow: 2px 2px 6px #C0C4CC;
	}

	.box-row {
		display: table-row;
	}

	.box-cell {
		display: table-cell;
		padding: .8rem;
	}

	.box-cell-title {
		width: 8rem;
	}

	.j-label {
		float: right;
		line-height: 1rem;
		color: #606266;
		font-size: 1.3rem;
	}

	.j-input {
		width: 28rem;
	}

	.login-button {
		width: 7rem;
	}
</style>