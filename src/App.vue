<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  mounted() {
    this.$http
      .post("http://mm.diandianboke.com:8000/wechat/share/signature", {
        app_id: "wxba7f7c2f25ed9cc8",
        url: encodeURIComponent(window.location.href.split("#")[0])
      })
      .then(res => {
        let msg = res.data;

        this.$wx.config({
          debug: false, //生产环境需要关闭debug模式

          appId: msg.appId, //appId通过微信服务号后台查看

          timestamp: msg.timestamp, //生成签名的时间戳

          nonceStr: msg.nonceStr, //生成签名的随机字符串

          signature: msg.signature, //签名

          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
        });

        this.$wx.ready(() => {
          this.$wx.updateAppMessageShareData({
            title: "Vicky你有一封来自Mike的神秘函", // 分享标题
            desc: "", // 分享描述
            link: window.location.href,
            imgUrl: "http://mm.diandianboke.com:8000/logo.jpg", // 分享图标
            success: function() {
              // 设置成功
              console.log("分享成功");
            },
            error: function(err) {
              console.log(err);
            }
          });

          this.$wx.updateTimelineShareData({
            title: "Vicky你有一封来自Mike的神秘函", // 分享标题
            desc: "", // 分享描述
            link: window.location.href,
            imgUrl: "http://mm.diandianboke.com:8000/logo.jpg", // 分享图标
            success: function() {
              // 设置成功
              console.log("分享成功");
            },
            error: function(err) {
              console.log(err);
            }
          });
        });
      });
  }
};
</script>

<style>
#app {
  font-size: initial;
  font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue",
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei",
    Arial, sans-serif;
}
</style>
