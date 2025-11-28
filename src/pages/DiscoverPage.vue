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

    <!-- 简介 -->
    <div class="field">
      <textarea
        v-model="form.desc"
        @input="saveToLocal"
        placeholder="个人简介"
      />
    </div>

    <!-- 底部导航 -->
    <BottomNav v-model="navTab" />
  </div>
</template>

<script>
import BottomNav from "@/components/BottomNav.vue";

export default {
  components: { BottomNav },
  data() {
    return {
      navTab: "discover",
      form: {
        name: "",
        avatar: "",
        cover: "",
        desc: "",
        works: [] // ⭐ 保留逻辑，不动
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

    async uploadWorkImg(e, index) {
      const files = Array.from(e.target.files);
      if (!files.length) return;
      // ⭐ 逻辑保留，只是页面暂时不用
      this.form.works[index].img = await this.toBase64(files[0]);
      this.saveToLocal();
    },

    addWork() {
      this.form.works.push({ img: "", title: "", likes: 0 });
      this.saveToLocal();
    },

    removeWork(i) {
      this.form.works.splice(i, 1);
      this.saveToLocal();
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
  padding-top: 250px;
  position: relative;
}

/* ====== 封面图 ====== */
.cover-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 220px;
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
  bottom: 10px;
  right: 12px;
  opacity: 0;
  width: 72px;
  height: 72px;
  cursor: pointer;
   z-index: 10;
}
.cover-box::after {
  content: "更换封面";
  position: absolute;
  bottom: 23px;
  right: 18px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
}

/* ====== 头像 ====== */
.avatar-box {
  position: absolute;
  top: 120px;
  left: 15%;
  transform: translateX(-50%);
  z-index: 2;
}
.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 3px solid #fff;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
.avatar-box input[type="file"] {
  position: absolute;
  bottom: -5px;
  right: calc(50% - 44px);
  opacity: 0;
  width: 88px;
  height: 88px;
  cursor: pointer;
}

/* ====== 姓名输入框 ====== */
.name-field {
  position: absolute;
  top: 130px;
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
  padding: 8px 12px;
}

/* ====== 文本输入 ====== */
.field input,
.field textarea {
  border: none !important;
  outline: none !important;
  background: transparent !important;
  box-shadow: none !important;
  -webkit-appearance: none;
}
.field {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

.field textarea {
  width: 100%;          /* ⭐ 让简介真正占满整个屏幕 */
  min-height: 80px;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
}

</style>
