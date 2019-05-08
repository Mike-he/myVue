<template>
  <el-card shadow="hover" class="login-box">
    <div class="logo">
      <div class="logo-img">
        <img src="~img/cup.png" alt="">
      </div>
      <div class="logo-title">Your Latte</div>
    </div>
    <div class="login-content">
      <div class="box">
        <div class="box-row">
          <div class="box-cell">
            <el-input
                class="j-input"
                placeholder="用户名"
                autofocus=true
                spellcheck=false
                size="medium"
                @keyup.enter.native="submit"
                v-model="username"
            >
            </el-input>
          </div>
        </div>
        <div class="box-row">
          <div class="box-cell">
            <el-input
                class="j-input"
                placeholder="密码"
                spellcheck=false
                size="medium"
                type="password"
                @keyup.enter.native="submit"
                v-model="password"
            >
            </el-input>
          </div>
        </div>
        <div class="box-row">
          <div class="box-cell">
            <el-button
                type="primary"
                @click="submit"
            >
              登&nbsp;&nbsp;&nbsp;&nbsp; 录
            </el-button>
          </div>
        </div>
        <div class="box-row">
          <div class="box-cell">
            <a href="http://m.coke-food.com/cola-gift-exchange-manager/login" target="_blank">
							<span>
								or前往新品英雄会后台
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
  .login-box {
    width: 46rem;
    height: 35rem;
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
    color: #67C23A;
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
    padding-top: 1rem;
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
</style>
