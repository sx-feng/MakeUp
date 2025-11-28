<template>
  <div class="publish-page">
    <div class="header">
      <button class="back-btn" type="button" @click="goBack">
        <img src="/icons/返回.png" alt="返回" />
      </button>
      <div class="title-wrap">
        <h2>发布作品</h2>
        <p>上传你的作品图片与描述，吸引更多关注。</p>
      </div>
    </div>

    <div class="card">
      <label class="field-label">作品图片（可多选）</label>
      <div class="upload-box">
        <input
          class="file-input"
          type="file"
          accept="image/*"
          multiple
          @change="onUpload"
        />
        <div v-if="form.images.length" class="preview-list">
          <div v-for="(img, idx) in form.images" :key="idx" class="preview-item">
            <img :src="img" alt="作品预览" />
          </div>
        </div>
        <div v-else class="placeholder">点击选择多张图片</div>
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
        images: []
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
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      const list = await Promise.all(files.map(f => this.toBase64(f)));
      this.form.images = list;
    },
    submit() {
      if (!this.form.title.trim()) {
        alert("请填写作品标题");
        return;
      }
      alert("作品已保存，本地预览效果展示中~");
    },
    goBack() {
      this.$router.back();
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

.header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.back-btn {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: none;
  background: #ffffff;
  box-shadow: 0 0.25rem 0.8rem rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.back-btn img {
  width: 1.1rem;
  height: 1.1rem;
}

.title-wrap h2 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  color: #222;
}

.title-wrap p {
  margin: 0;
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

.preview-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
  overflow-y: auto;
}

.preview-item {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.preview-item img {
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
