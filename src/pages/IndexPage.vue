<template>
  <div class="index-page">
    <a-input-search
      v-model:value="searchText"
      placeholder="快来查询吧~~"
      enter-button="查询"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-tabs @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :post-list="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片">
        <PictureList :picture-list="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :user-list="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios from "@/plugins/myAxios";

const postList = ref([]);

const pictureList = ref([]);

const userList = ref([]);

const router = useRouter();
const route = useRoute();

const activeKey = route.params.category;

const searchText = ref(route.query.text || "");

const initSearchParam = {
  type: route.params.category,
  text: "",
  pageSize: 10,
  current: 1,
};
const searchParam = ref(initSearchParam);

/**
 * 加载数据
 * @param params
 */
const loadDataOld = (params: any) => {
  const postQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/post/list/page/vo", postQuery).then((res: any) => {
    postList.value = res.records;
  });
  const pictureQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/picture/list/page/vo", pictureQuery).then((res: any) => {
    pictureList.value = res.records;
  });
  const userQuery = {
    ...params,
    userName: params.text,
  };
  myAxios.post("/user/list/page/vo", userQuery).then((res: any) => {
    userList.value = res.records;
  });
};

/**
 * 加载所有数据
 * @param params
 */
const loadAllData = (params: any) => {
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/search/all", query).then((res: any) => {
    postList.value = res.postList;
    userList.value = res.userList;
    pictureList.value = res.pictureList;
  });
};

/**
 * 加载单类数据
 * @param params
 */
const loadData = (params: any) => {
  const { type } = params;
  if (!type) {
    router.push({
      path: `/post`,
    });
    // message.error("类型为空");
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/search/all", query).then((res: any) => {
    if (type === "post") {
      postList.value = res.dataList;
    } else if (type === "user") {
      userList.value = res.dataList;
    } else if (type === "picture") {
      pictureList.value = res.dataList;
    }
  });
};

watchEffect(() => {
  searchParam.value = {
    ...initSearchParam,
    text: route.query.text,
    type: route.params.category,
  } as any;
  loadData(searchParam.value);
});

//首次请求
// loadData(initSearchParam);

const onSearch = (value: string) => {
  router.push({
    query: {
      ...searchParam.value,
      text: value,
    },
  });
  // loadData(searchParam.value);
};
const onTabChange = (key: string) => {
  // alert(route);
  console.log(route.params);
  // console.log(route)
  router.push({
    path: `./${key}`,
    query: searchParam.value,
  });
};
</script>
