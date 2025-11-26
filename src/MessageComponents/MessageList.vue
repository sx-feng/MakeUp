<template>
  <div class="message-list">

    <!-- 系统消息，永远在最上面 -->
    <div
      v-for="item in systemItems"
      :key="'sys-' + item.id"
      class="message-row system-row"
      :class="{ active: item.id === activeId }"
      @click="$emit('select', item)"
    >
      <!-- 左侧头像：系统专用 -->
      <div class="avatar-wrap">
        <div class="avatar system-avatar">
          <img :src="item.avatar || defaultAvatar" class="avatar-img" />
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="message-content">
        <div class="row-top">
          <span class="name">{{ item.name }}</span>
          <span class="time">{{ item.time }}</span>
        </div>

        <div class="row-bottom" v-if="item.preview">
          <span class="preview">
            {{ item.preview }}
          </span>
        </div>
      </div>
    </div>

    <!-- 普通会话列表 -->
    <div
      v-for="item in userItems"
      :key="item.id"
      class="message-row"
      :class="{ active: item.id === activeId }"
      @click="$emit('select', item)"
    >
      <!-- 头像 -->
      <div class="avatar-wrap">
        <div class="avatar">
          <img :src="item.avatar || defaultAvatar" class="avatar-img" />
        </div>
      </div>

      <!-- 右侧内容 -->
      <div class="message-content">
        <div class="row-top">
          <span class="name">{{ item.name }}</span>
          <span class="time">{{ item.time }}</span>
        </div>

        <div class="row-bottom">
          <span class="preview">
            {{ item.preview }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import defaultAvatar from "@/assets/avatar1.png"; // 随便一张当默认头像

export default {
  name: "MessageList",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      defaultAvatar
    };
  },
  computed: {
    // 系统消息
    systemItems() {
      return this.list.filter(item => item.type === "system");
    },
    // 普通消息
    userItems() {
      return this.list.filter(item => item.type !== "system");
    }
  }
};
</script>

<style scoped>
.message-list {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
  --avatar-width: 48px;
}

/* 公共行布局 */
.message-row {
  display: flex;
  padding: 10px 10px;
  cursor: pointer;
}

.message-row.active {
  border: none;
  background: transparent;
}

/* 左侧头像区域 */
.avatar-wrap {
  width: var(--avatar-width);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-right: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: #e0f2ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 系统消息头像可以用不同底色（可选） */
.system-avatar {
  background: #4caf50;
}

/* 头像图片真正显示 */
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 右侧内容 */
.message-content {
  flex: 1;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
}

.row-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.name {
  font-size: 15px;
  font-weight: 600;
}

.time {
  font-size: 12px;
  color: #999;
}

.row-bottom {
  margin-top: 4px;
}

.preview {
  font-size: 13px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
