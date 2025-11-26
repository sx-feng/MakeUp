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
    <div class="field">
      <label>姓名</label>
      <input v-model="form.name" @input="saveToLocal" />
    </div>

    <!-- 简介 -->
    <div class="field">
      <label>简介</label>
      <textarea v-model="form.desc" @input="saveToLocal" />
    </div>

    <!-- 作品列表 -->
    <h3>作品展示</h3>
    <div class="works">
      <div v-for="(w,i) in form.works" :key="i" class="work-item">
        <img :src="w.img" class="work-img" />
        <input type="file" @change="e=>uploadWorkImg(e,i)" />

        <input v-model="w.title" @input="saveToLocal" placeholder="作品标题" />
        <input v-model.number="w.likes" type="number" @input="saveToLocal" placeholder="点赞数" />

        <button @click="removeWork(i)">删除</button>
      </div>
    </div>

    <button @click="addWork">新增作品</button>

    <button class="save-btn" @click="saveToLocal">保存主页</button>

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

    async uploadWorkImg(e, index) {
      const file = e.target.files[0];
      if (!file) return;
      this.form.works[index].img = await this.toBase64(file);
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
<style>
.edit-page {
  padding-bottom: 90px; /* 给底部导航留空间 */
  background: #fafafa;
  min-height: 100vh;
  font-family: "Helvetica Neue", Arial, sans-serif;
}

/* ====== 封面图 ====== */
.cover-box {
  position: relative;
   width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: 0 0 14px 14px;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 封面上传按钮 */
.cover-box input[type="file"] {
  position: absolute;
  bottom: 12px;
  right: 12px;
  opacity: 0;
  width: 72px;
  height: 72px;
  cursor: pointer;
}

.cover-box::after {
  content: "更换封面";
  position: absolute;
  bottom: 18px;
  right: 18px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
}
.cover-box input[type="file"] {
  z-index: 9999 !important;
}

/* ====== 头像 ====== */
.avatar-box {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: -200px;
  left: -150px;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 3px solid #fff;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
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

.avatar-box::after {
  position: absolute;
  bottom: -28px;
  right: calc(50% - 40px);
  font-size: 12px;
  color: #888;
}

/* ====== 输入块 ====== */
.field {
  margin: 20px;
  background: #fff;
  padding: 15px 16px;
  border-radius: 14px;
  box-shadow: 0px 3px 12px rgba(0,0,0,0.06);
}

.field label {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.field input,
.field textarea {
  width: 100%;
  margin-top: 6px;
  border: none;
  outline: none;
  font-size: 14px;
  color: #444;
  background: transparent;
  resize: none;
}

/* ====== 作品列表 ====== */
h3 {
  padding-left: 18px;
  margin-top: 30px;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.works {
  padding: 0 16px;
}

.work-item {
  background: #fff;
  padding: 12px;
  border-radius: 14px;
  margin-bottom: 16px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  position: relative;
}

.work-img {
  width: 100%;
  height: 180px;
  border-radius: 12px;
  object-fit: cover;
}

/* 删除按钮 */
.work-item button {
  background: #ff4d6a;
  border: none;
  padding: 8px 12px;
  color: #fff;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 13px;
}

.work-item input[type="text"],
.work-item input[type="number"] {
  margin-top: 10px;
  width: 100%;
  border: none;
  background: #f7f7f7;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
}

.work-item input[type="file"] {
  margin-top: 10px;
}

/* ===== 新增作品按钮 ===== */
button {
  margin: 20px auto;
  display: block;
  background: #ff4d6a;
  color: #fff;
  border: none;
  padding: 12px 22px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

/* ===== 保存按钮 ===== */
.save-btn {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #ff6b8b, #ff3b6b);
  padding: 14px 30px;
  font-size: 15px;
  border-radius: 30px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0px 6px 14px rgba(255,0,90,0.25);
}


</style>