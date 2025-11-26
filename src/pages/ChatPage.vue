<template>
  <div class="chat-page" v-if="user">

    <!-- 顶部栏 -->
    <div class="chat-header">
      <button class="back" @click="$router.back()">
        <img src="/icons/返回.png" />
      </button>
      <img :src="user.avatar" class="avatar" />
      <span class="name">{{ user.name }}</span>
    </div>

       <!-- 聊天内容区（自动撑满、自动滚动） -->
    <div class="chat-body" ref="chatBody">
      

      <!-- ⭐ 消息气泡必须放这里！！！ -->
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['msg-row', msg.self ? 'self' : 'other']"
      >
        <!-- 对方头像 -->
        <img v-if="!msg.self" :src="user.avatar" class="msg-avatar" />
        
        <div class="msg-bubble">{{ msg.text }}</div>

        <!-- 我的头像 -->
        <img v-if="msg.self" :src="user.avatar" class="msg-avatar" />
      </div>
    </div>


    <!-- 底部输入区（贴着底部导航上方） -->
    <div class="chat-input">
      <input type="text" v-model="inputMsg" placeholder="请输入消息..." />
      <button @click="sendMsg">发送</button>
    </div>

  </div>
</template>

<script>
import avatar1 from "@/assets/avatar1.png";
import avatar2 from "@/assets/avatar2.png";
import avatar3 from "@/assets/avatar3.png";

export default {
  name: "ChatPage",

  data() {
    return {
      inputMsg: "",
      messages: [], // ⭐存放发送的消息
      allUsers: [
        { id: 1, name: "喜羊羊", avatar: avatar1 },
        { id: 2, name: "美羊羊", avatar: avatar2 },
        { id: 3, name: "美羊羊", avatar: avatar3 }
      ]
    };
  },

computed: {
    user() {
      return {
        id: this.$route.params.id,
        name: this.$route.query.name,
        avatar: this.$route.query.avatar
      };
    }
  },
  methods: {
    sendMsg() {
      if (!this.inputMsg.trim()) return;

      // ⭐ 添加一条消息
      this.messages.push({
        text: this.inputMsg,
        self: true
      });

      this.inputMsg = "";

      this.$nextTick(() => {
        this.scrollToBottom();
      });

      // ====== 下面是模拟对方自动回复（可删） ======
      setTimeout(() => {
        this.messages.push({
          text: "收到啦，我这边马上安排～",
          self: false
        });

        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }, 600);
    },

    scrollToBottom() {
      const box = this.$refs.chatBody;
      if (box) {
        box.scrollTop = box.scrollHeight;
      }
    }
  }
};
</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
  padding-bottom: 4.25rem;
  box-sizing: border-box;

  overflow: hidden; /* ⭐重要：锁住页面滚动 */
}


/* 顶部 */
.chat-header {
  height: 3rem;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.6rem;
  box-shadow: 1px 2px 4px rgba(0,0,0,0.06);
    border-bottom: 0.5px solid #eee;
}

.back {
  border: none;
  background: none;
  margin-right: 0.5rem;
}
.back img {
  width: 0.9rem;
  height: 0.9rem;
}

.avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.name {
  font-size: 1rem;
  font-weight: bold;
}

/* 聊天内容自动撑满 */
.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;

  background: #ffffff;
}

.tip {
  color: #888;
  font-size: 0.9rem;
}
/* 消息行布局 */
.msg-row {
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.6rem;
}

/* 我的消息靠右 */
.msg-row.self {
  justify-content: flex-end;
}

/* 对方消息靠左 */
.msg-row.other {
  justify-content: flex-start;
}

.msg-avatar {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
}

/* 聊天气泡 */
.msg-bubble {
  max-width: 60%;
  padding: 0.5rem 0.8rem;
  border-radius: 0.6rem;
  margin: 0 0.4rem;
  font-size: 0.9rem;
  line-height: 1.2rem;
}

.self .msg-bubble {
  background: #ff4b7d;
  color: white;
}

.other .msg-bubble {
  background: #fff;
  color: #333;
  border: 1px solid #eee;
}

/* 底部输入框（贴底） */
.chat-input {
  height: 3.2rem;
  display: flex;
  padding: 0.4rem;
  background: #fff;
  border-top: 1px solid #eee;
  box-sizing: border-box;

  position: fixed;
  bottom: 1rem; /* ⭐正好顶在底部导航上方 */
  left: 0;
  width: 100%;
}

.chat-input input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 1rem;
  padding: 0.3rem 0.6rem;
}

.chat-input button {
  margin-left: 0.4rem;
  padding: 0 0.8rem;
  background: #ff4b7d;
  color: #fff;
  border: none;
  border-radius: 1rem;
}
</style>
