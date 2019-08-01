<template>
  <div class="root">
    <div class="logo-container">
      <div class="logo-title" id="logoTitle">
        <div><img src="~img/logo-new.png"></div>
        <div class="logo-text"><img src="~img/title.svg"></div>
      </div>
      <div class="logo-input" id="input">
        <input type="text" placeholder="Username" @keyup.enter.native="submit" v-model="username">
        <input
          type="password"
          placeholder="Password"
          @keyup.enter.native="submit"
          v-model="password"
        >
        <button type="submit" class="input-submit" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: this.$cookies.get("username"),
      password: this.$cookies.get("password"),
      buttonLoading: false
    };
  },
  methods: {
    storeJSESSIONID(val) {
      this.$cookies.set("JSESSIONID", val);
      this.$cookies.set("username", this.username);
      this.$cookies.set("password", this.password);

      this.$anime({
        targets: "#logoTitle",
        easing: "easeInOutElastic",
        translateY: -500
      });
      
      this.$anime({
        targets: "#input",
        easing: "easeInOutElastic",
        translateY: -680,
        delay: 100
      });

      setTimeout(() => {
        this.$router.push("/order");
      }, 1000);
    },
    submit() {
      this.buttonLoading = true;

      this.$axios
        .post(this.$store.state.API_URL, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (!res.data.code) {
            this.storeJSESSIONID(res.data.data.JSESSIONID);
            // this.$message({
            //   type: "success",
            //   message: "验证成功！",
            //   center: true
            // });
          }
        });
    }
  },
  mounted() {
    this.$anime({
      targets: "#logoTitle",
      translateY: -200
    });
    this.$anime({
      targets: "#input",
      translateY: -100,
      delay: 100
    });
  }
};
</script>

<style>
.root {
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(~img/bg.jpg);
}
.logo-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 15vh);
  justify-items: center;
  width: 50vw;
  margin-top: 0vh;
}
.logo-title {
  display: flex;
  font-family: "Rancho", cursive;
  font-size: 7rem;
  color: rgb(133, 189, 3);
  align-self: center;
}
.logo-text {
  margin-left: 2rem;
}
.logo-input input {
  display: block;
  height: 3rem;
  width: 18rem;
  margin-top: 0.5rem;
  box-sizing: border-box;
  border: 0;
  border-bottom: 2px solid rgb(133, 189, 3, 0.2);
  outline: none;
  text-align: center;
  background-color: transparent;
  color: rgb(133, 189, 3);
  font-size: 1.4rem;
  transition: all 0.4s;
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
  background-color: rgb(133, 189, 3, 0.2);
  transition: all 0.4s;
  border-radius: 0.4rem;
  outline: none;
}
.logo-input > .input-submit:hover {
  background-color: rgb(133, 189, 3, 0.7);
  cursor: pointer;
}
.logo-input > .input-submit:active {
  background-color: rgb(133, 189, 3);
}
</style>
