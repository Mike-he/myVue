<template>
	<el-card shadow="hover" class="login-box">
		<div class="logo">
			<div class="logo-img">
				<img :src="require('@img/cup.png')" alt="">
			</div>
			<div class="logo-title">你的可乐</div>
		</div>
		<div class="login-content">
			<div class="box">
				<div class="box-row">
					<div class="box-cell">
						<el-input
								class="j-input"
								placeholder="JSESSIONID"
								autofocus=true
								spellcheck=false
								@keyup.enter.native="submit"
								v-model="JSESSIONID"
						>
						</el-input>
					</div>
				</div>
				<div class="box-row">
					<div class="box-cell">
						<a href="http://m.coke-food.com/cola-gift-exchange-manager/login" target="_blank">
							<span>
								去登录新品英雄会后台
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</el-card>
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
				this.$cookies.set('JSESSIONID', val);

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
		width: 46rem;
		height: 26rem;
		border-radius: 1rem;
		position: absolute;
		text-align: center;
		left: 50%;
		top: 50%;
		margin-left: -24rem;
		margin-top: -18rem;
		background-color: #fff;
		transition: all .3s;
	}

	.login-box:hover {
		box-shadow: 2px 2px 6px #C0C4CC;
	}

	.logo {
		width: 100%;
		height: 50%;
		position: relative;
	}

	.logo-title {
		color: #409EFF;
		font-size: 2.5rem;
		line-height: 3rem;
	}

	@keyframes show {
		from {
			padding-top: 1rem;
			opacity: 0;
		}
		to {
			padding-top: 2.5rem;
			opacity: 1;
		}
	}

	.logo-img {
		width: 8rem;
		height: 8rem;
		margin: 0 auto;
		padding-top: 2.5rem;
		animation: show 1s ease;
	}

	.login-content {
		width: 100%;
		height: 50%;
	}

	.login-content .box {
		display: table;
		align-items: center;
		padding: .5rem;
		height: 100%;
		width: 30rem;
		margin: 0 auto;
	}

	.box-row {
		display: table-row;
	}

	.box-cell {
		display: table-cell;
		padding: .8rem;
	}

	.j-input {
		width: 28rem;
	}

	.login-button {
		width: 7rem;
	}
</style>