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
      
      <textarea v-model="form.desc" @input="saveToLocal"  placeholder="个人简介"/>
    </div>

    <!-- 作品列表 -->   
    <h3>作品展示</h3>
      <button class="new" @click="addWork">新增作品</button>
    <div class="works">
     <div v-for="(w,i) in form.works" :key="i" class="work-item">

  <!-- 点击区域（已有图片显示图片，否则显示加号） -->
  <div class="upload-box">
    <img v-if="w.img" :src="w.img" class="work-img" />
    <div v-else class="plus">+</div>

    <!-- 隐藏的文件选择框 -->
 <input class="file-input" type="file" multiple accept="image/*" @change="e => uploadWorkImg(e,i)" />

  </div>

  <input v-model="w.title" @input="saveToLocal" placeholder="作品标题" />

  <!-- <input v-model.number="w.likes" type="number" @input="saveToLocal" placeholder="点赞数" /> -->

  <span class="dele"  @click="removeWork(i)"><img src="/icons/删除.png" alt=""></span>

</div>

    </div>

  

    <!-- <button class="save-btn" @click="saveToLocal">保存主页</button> -->

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
  const files = Array.from(e.target.files);
  if (!files.length) return;

  // ⭐ 只使用第一张
  this.form.works[index].img = await this.toBase64(files[0]);

  this.saveToLocal();
}
,


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
.field textarea {
  resize: none;
  padding-left: 2rem;
}

/* ====== 作品列表 ====== */
h3 {
  padding-left: 18px;
  margin-top: 10px;
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
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
  position: relative;
}

/* 上传容器（固定高度，防止图片变小） */
.upload-box {
  position: relative;
  width: 100%;
  height: 180px;
  background: #f3f3f3;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 加号样式 */
.plus {
  font-size: 48px;
  color: #ccc;
  font-weight: 300;
}

/* 作品图（统一高度100%填满容器） */
.work-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 隐藏真实文件按钮 */
.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

/* 标题输入框 */
.work-item input[type="text"] {
  margin-top: 10px;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 6px 0;
  color: #333;
}

/* 删除按钮 */
.dele {
  position: absolute;
  top: 150px;
  right: 10px;
  width: 32px;
  height: 32px;
  backdrop-filter: blur(4px);
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

/* ===== 新增按钮 ===== */
button {
  margin: 10px auto;
  display: block;
  background: #ff4d6a;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
}
.new {
  margin: 10px 0 16px 18px;
  background: linear-gradient(90deg, #ff7aa5, #ff4d79);
  padding: 8px 18px;
  font-weight: 600;
  border-radius: 25px;
  box-shadow: 0 3px 8px rgba(255, 80, 120, 0.25);
}


</style>