<template>
  <div class="publish-page">
    <div class="header">
      <h2>发布作品</h2>
      <p>上传你的作品图片与描述，吸引更多关注。</p>
    </div>

    <div class="card">
      <label class="field-label">作品封面</label>
      <div class="upload-box">
        <input class="file-input" type="file" accept="image/*" @change="onUpload" />
        <div v-if="form.img" class="preview">
          <img :src="form.img" alt="作品封面预览" />
        </div>
        <div v-else class="placeholder">点击上传</div>
      </div>

      <label class="field-label">标题</label>
      <input v-model="form.title" class="text-input" placeholder="给作品起个名字" />

      <label class="field-label">描述</label>
      <textarea
        v-model="form.desc"
        class="text-area"
        rows="4"
        placeholder="简单介绍一下你的作品灵感、使用的妆容或技巧"
      />

      <button class="submit-btn" @click="submit">发布作品</button>
    </div>

    <BottomNav v-model="navTab" />
  </div>
</template>

<script>
import BottomNav from "@/components/BottomNav.vue";

export default {
  name: "PublishPage",
  components: { BottomNav },
  data() {
    return {
      navTab: "publish",
      form: {
        title: "",
        desc: "",
        img: ""
      }
    };
  },
  methods: {
    toBase64(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    },
    async onUpload(e) {
      const [file] = e.target.files;
      if (!file) return;
      this.form.img = await this.toBase64(file);
    },
    submit() {
      if (!this.form.title.trim()) {
        alert("请填写作品标题");
        return;
      }
      alert("作品已保存，本地预览效果展示中~");
    }
  },
  watch: {
    navTab(newName) {
      if (newName && newName !== this.$route.name) {
        this.$router.push({ name: newName });
      }
    },
    $route(to) {
      if (to.name && to.name !== this.navTab) {
        this.navTab = to.name;
      }
    }
  }
};
</script>

<style scoped>
.publish-page {
  padding: 1rem;
  padding-bottom: 6rem;
  background: linear-gradient(180deg, #fff7fb 0%, #ffffff 60%);
  min-height: 100vh;
}

.header h2 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  color: #222;
}

.header p {
  margin: 0 0 1rem;
  color: #666;
}

.card {
  background: #fff;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 8px 26px rgba(0, 0, 0, 0.06);
}

.field-label {
  display: block;
  margin: 0.75rem 0 0.4rem;
  font-weight: 600;
  color: #333;
}

.upload-box {
  position: relative;
  width: 100%;
  height: 200px;
  border: 1px dashed #ff91b6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #fff2f8;
  margin-bottom: 0.5rem;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.placeholder {
  color: #ff3b6b;
  font-weight: 600;
}

.preview,
.preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-input,
.text-area {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 0.75rem;
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
}

.text-area {
  resize: none;
}

.submit-btn {
  width: 100%;
  margin-top: 1rem;
  background: linear-gradient(90deg, #ff7aa5, #ff2f6c);
  color: #fff;
  border: none;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(255, 70, 121, 0.28);
}
</style>
