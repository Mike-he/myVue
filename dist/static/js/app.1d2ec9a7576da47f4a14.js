webpackJsonp([1],{"79AO":function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("7+uW"),a=t("mtWM"),i=t.n(a),r=t("fxnj"),c=t.n(r),s={name:"App",mounted:function(){i.a.post("http://mm.diandianboke.com:8000/wechat/share/signature",{app_id:"wxba7f7c2f25ed9cc8",url:encodeURIComponent(window.location.href.split("#")[0])}).then(function(e){var n=e.data;c.a.config({debug:!0,appId:n.appId,timestamp:n.timestamp,nonceStr:n.nonceStr,signature:n.signature,jsApiList:["updateAppMessageShareData","updateTimelineShareData"]}),c.a.ready(function(){c.a.updateAppMessageShareData({title:"你有一封来自悦诗风吟#发光肌秘所#的邀请函",desc:"与白牡丹系列代言人朱正廷一同探索肌肤白到自发光的秘密",link:window.location.href,imgUrl:"http://mm.diandianboke.com:8000/logo.jpg",success:function(){console.log("分享成功")},error:function(e){console.log(e)}}),c.a.updateTimelineShareData({title:"你有一封来自悦诗风吟#发光肌秘所#的邀请函",desc:"与白牡丹系列代言人朱正廷一同探索肌肤白到自发光的秘密",link:window.location.href,imgUrl:"http://mm.diandianboke.com:8000/logo.jpg",success:function(){console.log("分享成功")},error:function(e){console.log(e)}})})})}},l={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var p=t("VU/8")(s,l,!1,function(e){t("79AO")},null,null).exports,u=t("/ocq"),d={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{staticClass:"hello"},[n("div",{domProps:{textContent:this._s(this.msg)}})])},staticRenderFns:[]};var m=t("VU/8")({name:"HelloWorld",data:function(){return{msg:"Hello Vicky!"}}},d,!1,function(e){t("mmhd")},"data-v-653126be",null).exports;o.a.use(u.a);var f=new u.a({routes:[{path:"/",name:"HelloWorld",component:m}]});t("uMhA");o.a.config.productionTip=!1,new o.a({el:"#app",router:f,components:{App:p},template:"<App/>"})},mmhd:function(e,n){},uMhA:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.1d2ec9a7576da47f4a14.js.map