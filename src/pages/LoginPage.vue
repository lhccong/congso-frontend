<template>
  <div class="title">
    <a-image :src="so" :preview="false" height="60px" width="60px" />
    <text STYLE="margin-left: 20px;font-size: 30px;font-weight: 500"
      >CSO 信息聚合平台
    </text>
  </div>
  <div>
    <div class="container">
      <a-tabs size="large" v-model:activeKey="activeKey" @change="onTabChange">
        <a-tab-pane key="1">
          <template #tab>
            <span>
              <ScanOutlined />
              公众号登录
            </span>
          </template>
          <a-image :src="qrcode_gh" :preview="false" />
          <a-input-search
            v-model:value="value"
            placeholder="请输入验证码"
            enter-button="登录"
            size="large"
            @search="onSearch"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import QRCode from "qrcode";
import qrcode_gh from "@/assets/qrcode_for_gh.jpg";
import so from "@/assets/搜索.png";
import { ScanOutlined, WechatOutlined } from "@ant-design/icons-vue";
import myAxios from "@/plugins/myAxios";
import { useRoute, useRouter } from "vue-router/dist/vue-router";

const qrcodeCanvas = ref(null);
const value = ref("");
const activeKey = ref("1");

// 在组件挂载后生成二维码
onMounted(() => {
  // // 调用微信登录接口获取登录二维码
  // // 这里省略实际的微信登录接口调用逻辑，模拟生成一个假的二维码
  // const fakeQRCodeValue = "https://baidu.com";
  //
  // // 使用 qrcode 插件生成二维码并渲染到页面
  // QRCode.toCanvas(qrcodeCanvas.value, fakeQRCodeValue, {
  //   width: 258,
  //   height: 258,
  // });
  // getWechatQrCode("qrcode-container");
});
const router = useRouter();
const route = useRoute();
const onSearch = (searchValue) => {
  const query = {
    mpCode: searchValue,
  };
  myAxios.post("/user/mp/login", query).then((res) => {
    if (res !== null) {
      router.push("/index/post");
    }
    console.log(res);
  });
  // console.log("use value", searchValue);
  // console.log("or use this.value", value.value);
};
const getWechatQrCode = (id) => {
  const state = parseInt(new Date().getTime() / 1000);
  // eslint-disable-next-line no-undef
  const obj = new WxLogin({
    // self_redirect: true,
    id: id,
    appid: "wx36b802049f256d44",
    scope: "snsapi_base",
    redirect_uri: encodeURIComponent("https://qingxin.store/mp"),
    state: state,
    href: "",
  });
};
</script>

<style scoped>
.ant-input-group-wrapper {
  display: block;
}

.title {
  /*margin-left: 380px;*/
  /*position: absolute;*/
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  align-items: center; /* 垂直居中对齐 */
}

.container {
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  /*align-items: center; !* 垂直居中对齐 *!*/
  height: 70vh; /* 设置容器高度，让二维码在页面中居中显示 */
}

/*.qrcode-container {*/
/*  height: 200px;*/
/*  background-color: #ffffff; !* 设置二维码容器背景颜色 *!*/
/*  !*border-radius: 10px; !* 设置边框圆角 *!*!*/
/*  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1); !* 添加阴影效果 *!*/
/*  display: flex;*/
/*  justify-content: center; !* 水平居中对齐 *!*/
/*  align-items: center; !* 垂直居中对齐 *!*/
/*}*/
</style>
