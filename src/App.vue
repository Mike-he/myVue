<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import wx from 'weixin-js-sdk';

export default {
  name: "App",
  mounted() {
    axios
      .post("http://mm.diandianboke.com:8000/wechat/share/signature", {
        app_id: "wxba7f7c2f25ed9cc8",
        url: encodeURIComponent(window.location.href.split("#")[0])
      })
      .then(res => {
        let msg = res.data.data;

        wx.config({
          debug: true, //生产环境需要关闭debug模式

          appId: msg.appId, //appId通过微信服务号后台查看

          timestamp: msg.timestamp, //生成签名的时间戳

          nonceStr: msg.nonceStr, //生成签名的随机字符串

          signature: msg.signature, //签名

          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"]
        });

        wx.ready(() => {
          wx.updateAppMessageShareData({
            title: "你有一封来自悦诗风吟#发光肌秘所#的邀请函", // 分享标题
            desc: "与白牡丹系列代言人朱正廷一同探索肌肤白到自发光的秘密", // 分享描述
            //link: 'http://mm.diandianboke.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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

          wx.updateTimelineShareData({
            title: "你有一封来自悦诗风吟#发光肌秘所#的邀请函", // 分享标题
            desc: "与白牡丹系列代言人朱正廷一同探索肌肤白到自发光的秘密", // 分享描述
            //link: 'http://mm.diandianboke.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
