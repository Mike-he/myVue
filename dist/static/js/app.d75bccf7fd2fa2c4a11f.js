webpackJsonp([1],{"41HP":function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("7+uW"),a=t("mtWM"),i=t.n(a),r={name:"App",mounted:function(){i.a.post("http://mm.diandianboke.com:8000/wechat/share/signature",{app_id:"wxba7f7c2f25ed9cc8",url:encodeURIComponent(window.location.href.split("#")[0])}).then(function(e){var n=e.data.data;wx.config({debug:!0,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["updateAppMessageShareData","updateTimelineShareData"]}),wx.ready(function(){wx.updateAppMessageShareData({title:"你有一封来自悦诗风吟#发光肌秘所#的邀请函",desc:"与白牡丹系列代言人朱正廷一同探索肌肤白到自发光的秘密",link:window.location.href,imgUrl:"http://mm.diandianboke.com:8000/logo.jpg",success:function(){console.log("分享成功")},error:function(e){console.log(e)}}),wx.updateTimelineShareData({title:"你有一封来自悦诗风吟#发光肌秘所#的邀请函",desc:"与白牡丹系列代言人朱正廷一同探索肌肤白到自发光的秘密",link:window.location.href,imgUrl:"http://mm.diandianboke.com:8000/logo.jpg",success:function(){console.log("分享成功")},error:function(e){console.log(e)}})})})}},c={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var s=t("VU/8")(r,c,!1,function(e){t("gGKY")},null,null).exports,l=t("/ocq"),p={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"hello"},[n("div",{domProps:{textContent:this._s(this.msg)}})])},staticRenderFns:[]};var u=t("VU/8")({name:"HelloWorld",data:function(){return{msg:"Hello world!"}}},p,!1,function(e){t("41HP")},"data-v-0f35601c",null).exports;o.a.use(l.a);var d=new l.a({routes:[{path:"/",name:"HelloWorld",component:u}]});t("fxnj"),t("uMhA");o.a.config.productionTip=!1,new o.a({el:"#app",router:d,components:{App:s},template:"<App/>"})},gGKY:function(e,n){},uMhA:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.d75bccf7fd2fa2c4a11f.js.map