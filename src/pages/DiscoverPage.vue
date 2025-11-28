<template>
  <div class="edit-page">

    <!-- 封面图 -->
    <div class="cover-box">
      <img :src="form.cover" class="cover-img" />
      <input type="file" @change="uploadCover" />
    </div>

    <!-- 头像 -->
    <div class="avatar-box">
      <img :src="form.avatar" class="avatar" />
      <input type="file" @change="uploadAvatar" />
    </div>

    <!-- 姓名 -->
    <div class="field name-field">
      <input class="name-input" v-model="form.name" @input="saveToLocal" />
    </div>

    <!-- 简介（直接可编辑） -->
    <div class="desc-display" :class="{ expanded: showFullDesc }">
      <textarea
        class="desc-box"
        :class="{ collapsed: !showFullDesc }"
        v-model="form.desc"
        @input="saveToLocal"
        placeholder="在这里输入你的个人简介"
        rows="3"
      ></textarea>
      <button
        v-if="form.desc && form.desc.length > 30"
        class="toggle-btn"
        type="button"
        @click="showFullDesc = !showFullDesc"
      >
        {{ showFullDesc ? "收起" : "更多" }}
      </button>
    </div>

    <!-- 发布入口（封面右上角） -->
    <div class="publish-float">
      <PublishButton @click="goPublish" />
    </div>

    <!-- 底部导航 -->
      <WorksGrid
        :list="works"
        @like="onLike"
        @open="openWork"
      />
    <BottomNav v-model="navTab" />
  </div>
</template>

<script>
import BottomNav from "@/components/BottomNav.vue";
import PublishButton from "@/components/PublishButton.vue";
import WorksGrid from "@/DiscoverComponent/WorksGrid.vue";
import { worksData } from "@/datas/worksData";
export default {
  components: { BottomNav, PublishButton, WorksGrid },
  data() {
    return {
      works: worksData,
      navTab: "discover",
      showFullDesc: false,
      form: {
        name: "",
        avatar: "",
        cover: "",
        desc: "",
        works: []
      }
    };
  },
  mounted() {
    // ⭐ 从本地加载
    const saved = localStorage.getItem("artist_profile");
    if (saved) {
      this.form = JSON.parse(saved);
    }
  },
  methods: {
    // ⭐ 将 File 转为 Base64
    toBase64(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    },

    async uploadCover(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.form.cover = await this.toBase64(file);
      this.saveToLocal();
    },

    async uploadAvatar(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.form.avatar = await this.toBase64(file);

      this.saveToLocal();
    },

    // 点赞累加
    onLike(id) {
      this.works = this.works.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      );
    },

    openWork(item) {
      // 跳转到作品详情（按需调整路由名称/路径）
      this.$router.push({
        name: "workDetail",
        params: { id: item.id },
        query: {
          title: item.title,
          img: item.img,
          likes: item.likes,
          images: item.images ? JSON.stringify(item.images) : undefined
        }
      });
    },

    goPublish() {
      this.$router.push({ name: "publish" });
    },

    // ⭐ 保存到 LocalStorage
    saveToLocal() {
      localStorage.setItem("artist_profile", JSON.stringify(this.form));
      console.log("已保存到本地");
    }
  },
  watch: {
    // 底部导航组件跳转
    navTab(newVal) {
      if (newVal !== this.$route.name) {
        this.$router.push({ name: newVal });
      }
    },
    // 同步导航高亮
    $route(to) {
      if (to.name !== this.navTab) {
        this.navTab = to.name;
      }
    }
  }
};
</script>
<style scoped>

.edit-page {
  padding-top: 14.8rem; /* 250px */
  padding-bottom: 4.25rem; /* 底部导航的安全距离 */
  position: relative;
  min-height: 100vh;
  overflow-x: hidden; /* 去掉横向滑动 */
  background: #f7f7f7;
}

/* ====== 封面图 ====== */
.cover-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 13.75rem; /* 220px */
  z-index: 1;
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 封面上传按钮 */
.cover-box input[type="file"] {
  position: absolute;
  bottom: 0.625rem; /* 10px */
  right: 0.75rem; /* 12px */
  opacity: 0;
  width: 4.5rem; /* 72px */
  height: 4.5rem; /* 72px */
  cursor: pointer;
  z-index: 9999;
}
.cover-box::after {
  content: "更换封面";
  position: absolute;
  bottom: 1.4375rem; /* 23px */
  right: 1.125rem; /* 18px */
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  padding: 0.375rem 0.875rem; /* 6px 14px */
  border-radius: 1.25rem; /* 20px */
  font-size: 0.75rem; /* 12px */
}

/* ====== 头像 ====== */
.avatar-box {
  position: absolute;
  top: 7.5rem; /* 120px */
  left: 15%;
  transform: translateX(-50%);
  z-index: 2;
}
.avatar {
  width: 5.5rem; /* 88px */
  height: 5.5rem; /* 88px */
  border-radius: 50%;
  border: 0.1875rem solid #fff; /* 3px */
  object-fit: cover;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.15); /* 4px 16px */
}
.avatar-box input[type="file"] {
  position: absolute;
  bottom: -0.3125rem; /* -5px */
  right: calc(50% - 2.75rem); /* 44px */
  opacity: 0;
  width: 5.5rem; /* 88px */
  height: 5.5rem; /* 88px */
  cursor: pointer;
}

/* ====== 姓名输入框 ====== */
.name-field {
  position: absolute;
  top: 8.125rem; /* 130px */
  left: 50%;
  transform: translateX(-40%);
  width: 60%;
  z-index: 5;
}
.name-input {
  width: 100%;
  font-size: 2rem;
  color: #ffffff;
  border: none;
  outline: none;
  padding: 0.5rem 0.75rem; /* 8px 12px */
}

/* ====== 文本输入 ====== */
.field input {
  border: none !important;
  outline: none !important;
  background: transparent !important;
  box-shadow: none !important;
  -webkit-appearance: none;
}
.field {
  padding: 0 1rem; /* 16px */
  box-sizing: border-box;
}

.desc-display {
  margin: 0.25rem 1rem 0.5rem;
  padding: 0.65rem 0.875rem 1.4rem;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.8rem rgba(0, 0, 0, 0.06);
  position: relative;
}

.desc-box {
  width: 100%;
  min-height: 3.2rem;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #222;
  font-family: inherit;
}

.desc-box.collapsed {
  max-height: 3.2rem; /* ~2行 */
  overflow: hidden;
}

.publish-float {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 6;
}

.toggle-btn {
  position: absolute;
  right: 0.75rem;
  bottom: 0.35rem;
  background: none;
  border: none;
  color: #ff6b81;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
}

/* ====== 作品列表 ====== */
h3 {
  padding-left: 1.125rem; /* 18px */
  margin-top: 0.625rem; /* 10px */
  margin-bottom: 0.75rem; /* 12px */
  font-size: 1rem; /* 16px */
  font-weight: bold;
  color: #333;
}

.works {
  padding: 0 1rem; /* 16px */
}

.work-item {
  background: #fff;
  padding: 0.75rem; /* 12px */
  border-radius: 0.875rem; /* 14px */
  margin-bottom: 1rem; /* 16px */
  box-shadow: 0 0.1875rem 0.75rem rgba(0, 0, 0, 0.06);
  position: relative;
}

/* 上传容器 */
.upload-box {
  position: relative;
  width: 100%;
  height: 11.25rem; /* 180px */
  background: #f3f3f3;
  border-radius: 0.75rem; /* 12px */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plus {
  font-size: 3rem; /* 48px */
  color: #ccc;
  font-weight: 300;
}

.work-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.work-item input[type="text"] {
  margin-top: 0.625rem; /* 10px */
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem; /* 16px */
  padding: 0.375rem 0; /* 6px */
  color: #333;
}

/* 删除按钮 */
.dele {
  position: absolute;
  top: 9.375rem; /* 150px */
  right: 0.625rem; /* 10px */
  width: 2rem; /* 32px */
  height: 2rem; /* 32px */
  backdrop-filter: blur(0.25rem); /* 4px */
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.dele img {
  width: 1.4rem;
  height: 1.4rem;
}


</style>
