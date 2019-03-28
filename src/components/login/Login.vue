<template>
	<div class="login-box">
		<div class="logo">
			<img :src="require('@img/cup.png')" alt="">
			<!--<div class="logo-title">你的可乐</div>-->
		</div>
		<div class="login-content">
			<div class="box">
				<div class="box-row">
					<div class="box-cell box-cell-title">
						<span class="j-label">你的用户名</span>
					</div>
					<div class="box-cell">
						<el-input
								class="j-input"
								placeholder=""
								autofocus=true
								spellcheck=false
								:disabled="usernameDisabled"
								v-model="username"
						>
						</el-input>
					</div>
				</div>
				<div class="box-row">
					<div class="box-cell box-cell-title">
						<span class="j-label">你的密码</span>
					</div>
					<div class="box-cell">
						<el-input
								class="j-input"
								placeholder=""
								autofocus=true
								spellcheck=false
								show-password
								:disabled="passwordDisabled"
								v-model="password"
								@keyup.enter.native="submit"
						>
						</el-input>
					</div>
				</div>
				<div class="box-row">
					<div class="box-cell"></div>
					<div class="box-cell">
						<el-checkbox
								label="放心，会牢牢记着你"
								name="type"
								disabled
								v-model="remember"
						></el-checkbox>
					</div>
				</div>
				<div class="box-row">
					<div class="box-cell"></div>
					<div class="box-cell">
						<el-button
								type="primary"
								class="login-button"
								:loading="buttonLoading"
								@click="submit"
								:disabled="buttonDisabled"
						>
							登录
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
				username: this.$cookies.get('username') ? this.$cookies.get('username') : '',
				password: this.$cookies.get('password') ? this.$cookies.get('password') : '',
				usernameDisabled: false,
				passwordDisabled: false,
				remember: true,
				buttonDisabled: false,
				buttonLoading: false,
			}
		},
		watch: {
			username(val) {
				if (val !== '' && this.password !== '') {
					this.buttonDisabled = false;
				} else {
					this.buttonDisabled = true;
				}
			},
			password(val) {
				if (val !== '' && this.username !== '') {
					this.buttonDisabled = false;
				} else {
					this.buttonDisabled = true;
				}
			}
		},
		methods: {
			storeJSESSIONID(val) {
				this.$store.dispatch('setJSESSIONID', val);

				this.$cookies.set('username', this.username);
				this.$cookies.set('password', this.password);

				setTimeout(() => {
					this.$router.push('/order');
				}, 1000);
			},
			submit() {
				this.buttonLoading = true;
				this.$axios
						.post(
								this.$store.state.API_URL,
								{
									username: this.username,
									password: this.password,
								}
						)
						.then((res) => {
							if (!res.data.code) {
								this.storeJSESSIONID(res.data.data.JSESSIONID);
								this.$message.success('登录成功！');
							} else {
								this.$message.warning(res.data.msg);
							}
						})
						.catch((err) => {
							this.$message.warning('未知错误!');
						})
						.finally(() => {
							this.buttonLoading = false;
						})
			}
		},
		mounted() {
			if (this.$cookies.get('username') !== null) {
				this.usernameDisabled = true;
				this.passwordDisabled = true;
				this.$message.success('开启自动登录中...');
				setTimeout(() => {
					this.submit();
				}, 1000);
			}
		}
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
		width: 100%;
	}

	.login-button {
		width: 15rem;
	}
</style>