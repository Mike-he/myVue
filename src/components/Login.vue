<template>
	<div class="root">
		<div class="logo-container">
			<div class="logo-title">
				<img src="../../static/img/logo-new.png">&nbsp;
        Foodie's garden
			</div>
			<div class="logo-input">
				<input
          type="text"
          placeholder="Username"
          @keyup.enter.native="submit"
          v-model="username"
        >
				<input
          type="password"
          placeholder="Password"
          @keyup.enter.native="submit"
          v-model="password"
        >
				<button
          type="submit"
          class="input-submit"
          @click="submit"
        >Submit</button>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username: this.$cookies.get('username'),
        password: this.$cookies.get('password'),
        buttonLoading: false,
      }
    },
    methods: {
      storeJSESSIONID(val) {
        this.$cookies.set('JSESSIONID', val);
        this.$cookies.set('username', this.username);
        this.$cookies.set('password', this.password);

        setTimeout(() => {
          this.$router.push('/order');
        }, 500);
      },
      submit() {
        this.buttonLoading = true;

        this.$axios
          .post(
            this.$store.state.API_URL,
            {
              username: this.username,
              password: this.password
            }
          )
          .then((res) => {
            if (!res.data.code) {
              this.storeJSESSIONID(res.data.data.JSESSIONID);
              this.$message({
                type: 'success',
                message: '验证成功！',
                center: true
              });
            }
          })
      }
    },
    mounted() {
    }
  }
</script>

<style>
@import url('https://fonts.font.im/css?family=Rancho');
.root {
	display: grid;
	justify-items: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-image: url("../../static/img/bg.jpg");
}
.logo-container {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(2, 15vh);
	justify-items: center;
	width: 50vw;
	margin-top: -8vh;
}
.logo-title {
	font-family: 'Rancho', cursive;
	font-size: 7rem;
	color: rgb(133, 189, 3);
	align-self: center;
}
.logo-input input{
	display: block;
	height: 3rem;
	width: 18rem;
	margin-top: .5rem;
	box-sizing: border-box;
	border: 0;
	border-bottom: 2px solid rgb(133, 189, 3, .2);
	outline: none;
	text-align: center;
	background-color: transparent;
	color: rgb(133, 189, 3);
	font-size: 1.4rem;
	transition: all .4s;
}
.logo-input input:focus {
	border-bottom: 2px solid rgb(133, 189, 3);
}
.logo-input input::-webkit-input-placeholder {
	color: #e3e3e3;
}
.logo-input > .input-submit {
	display: block;
	height: 2.8rem;
	width: 18rem;
	border: none;
	color: #fff;
	text-align: center;
	margin-top: 1.5rem;
	font-size: 1.4rem;
	background-color: rgb(133, 189, 3, .2);
	transition: all .4s;
	border-radius: .4rem;
	outline: none;
}
.logo-input > .input-submit:hover {
	background-color: rgb(133, 189, 3, .7);
	cursor: pointer;
}
.logo-input > .input-submit:active {
	background-color: rgb(133, 189, 3);
}
</style>
