<template>
  <div class="message-page">
    <TopBar v-model="keyword" />


    <!-- 聊天 / 互动 -->
    <ChatSwitch v-model="mode" />

    <!-- 全部 / 婚庆公司 / 化妆师 -->
    <CategorySelector v-model="category" />

    <!-- 会话列表 -->
    <MessageList
      :list="filteredList"
      :active-id="activeId"
      @select="handleSelect"
    />
        <BottomNav v-model="currentTab" />
  </div>
</template>

<script>
import TopBar from "@/MessageComponents/TopBar.vue";
import ChatSwitch from "@/MessageComponents/ChatSwitch.vue";
import CategorySelector from "@/MessageComponents/CategorySelector.vue";
import MessageList from "@/MessageComponents/MessageList.vue";
import systemAvatar from "@/assets/avater.png";
import avatar1 from "@/assets/avatar1.png";
import avatar2 from "@/assets/avatar2.png";
import avatar3 from "@/assets/avatar3.png";
export default {
  name: "MessagePage",
  components: {
    TopBar,
    ChatSwitch,
    CategorySelector,
    MessageList
  },
  data() {
    return {
      keyword: "",
      mode: "chat",
      category: "all",
       currentTab: "message", 
      activeId: 2,
      // ✅ 模拟“后端返回的最终格式”
      messageList: [
        {
          id: 1,
          name: "系统通知",
          preview: "您有新的婚庆订单消息",                 
          time: "11:29",
          type: "system",
          avatar: systemAvatar  // <--- 正确：头像字段叫 avatar
        },
        {
          id: 2,
          name: "贾先生",
          preview: "你好，我要新娘妆容……",
          time: "11:30",
          type: "user",
          avatar: avatar2,  // <--- 正确
          role: "user"
        },
        {
          id: 3,
          name: "贾先生",
          preview: "麻烦帮我确认下档期～",
          time: "11:30",
          type: "user",
          avatar: avatar3,  // <--- 正确
          role: "company"
        },
        {
          id: 4,
          name: "张女士",
          preview: "好的，谢谢～",
          time: "11:32",
          type: "user",
           avatar: avatar1,        // <--- 没头像用默认头像
           role: "company"
        }
      ]
    };
  },
  methods: {
handleSelect(item) {

  setTimeout(() => {
    this.$router.push({
      name: "chat",
      params: { id: item.id },
      query: {
        name: item.name,
        avatar: item.avatar
      }
    });
    
  }, 100);
}


  },
  computed: {
 filteredList() {
  let list = this.messageList;

  // ⭐ 搜索
  if (this.keyword.trim()) {
    const k = this.keyword.trim();
    list = list.filter(
      i => i.name.includes(k) || i.preview.includes(k)
    );
  }

  // ⭐ 分类筛选
  if (this.category === "wedding") {
    list = list.filter(i => i.role === "company");
  } else if (this.category === "user") {
    list = list.filter(i => i.role === "user");
  } 
  // category = "all" 就不筛选

  return list;
}

},
  watch: {
    // 点击底部导航时，切换到对应路由
    currentTab(newName) {
      if (newName && newName !== this.$route.name) {
        this.$router.push({ name: newName });
      }
    },
    // 当路由通过其他方式变化时，更新底部导航高亮
    $route(to) {
      if (to.name && to.name !== this.currentTab) {
        this.currentTab = to.name;
      }
    }
  }

};
</script>

<style scoped>
.message-page {
  padding: 10px;
}
</style>
