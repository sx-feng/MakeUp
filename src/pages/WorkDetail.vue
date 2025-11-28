<template>
  <div class="detail-page">
    <div class="top-bar">
      <button class="back-btn" type="button" @click="$router.back()">
        <img src="/icons/返回.png" alt="返回" />
      </button>
      <span class="top-title">作品详情</span>
    </div>

    <div class="carousel">
      <img
        :src="currentImg"
        class="banner"
        @click="openLightbox"
      />
      <button
        v-if="images.length > 1"
        class="nav-btn prev"
        type="button"
        @click="prev"
      >
        ‹
      </button>
      <button
        v-if="images.length > 1"
        class="nav-btn next"
        type="button"
        @click="next"
      >
        ›
      </button>
      <div v-if="images.length > 1" class="dots">
        <span
          v-for="(img, idx) in images"
          :key="idx"
          :class="['dot', { active: idx === currentIndex }]"
          @click="go(idx)"
        ></span>
      </div>
    </div>

    <h2 class="title">{{ title }}</h2>

    <p class="likes">❤️ {{ likes }}</p>

    <p class="desc">
      {{ desc || "这里是作品的详细描述，可以从数据库或 API 加载。" }}
    </p>

    <div
      v-if="lightbox"
      class="lightbox"
      @click.self="closeLightbox"
    >
      <img :src="currentImg" class="lightbox-img" />
      <button class="close-btn" type="button" @click="closeLightbox">×</button>
      <button
        v-if="images.length > 1"
        class="nav-btn prev"
        type="button"
        @click.stop="prev"
      >
        ‹
      </button>
      <button
        v-if="images.length > 1"
        class="nav-btn next"
        type="button"
        @click.stop="next"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkDetail",

  props: ["id"],

  data() {
    return {
      images: [],
      currentIndex: 0,
      title: this.$route.query.title || "",
      likes: this.$route.query.likes || "",
      desc: this.$route.query.desc || "",
      lightbox: false
    };
  },
  computed: {
    currentImg() {
      return this.images[this.currentIndex] || "";
    }
  },
  created() {
    this.initImages();
  },
  methods: {
    initImages() {
      const { images, img } = this.$route.query;
      if (images) {
        try {
          const parsed = JSON.parse(images);
          if (Array.isArray(parsed) && parsed.length) {
            this.images = parsed;
            return;
          }
        } catch (e) {
          // fallback below
        }
      }
      if (img) {
        this.images = [img];
      } else {
        this.images = [];
      }
    },
    next() {
      if (!this.images.length) return;
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prev() {
      if (!this.images.length) return;
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    go(idx) {
      if (idx >= 0 && idx < this.images.length) {
        this.currentIndex = idx;
      }
    },
    openLightbox() {
      this.lightbox = true;
    },
    closeLightbox() {
      this.lightbox = false;
    }
  }
};
</script>

<style scoped>
.detail-page {
  padding: 1rem;
}

.carousel {
  position: relative;
}

.banner {
  width: 100%;
  height: 37rem;
  object-fit: cover;
  border-radius: 1rem;
  cursor: zoom-in;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.back-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 0.25rem 0.8rem rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.back-btn img {
  width: 1rem;
  height: 1rem;
}

.top-title {
  font-size: 1.05rem;
  color: #333;
  font-weight: 600;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn.prev {
  left: 0.5rem;
}

.nav-btn.next {
  right: 0.5rem;
}

.dots {
  display: flex;
  gap: 0.4rem;
  position: absolute;
  bottom: 0.6rem;
  left: 50%;
  transform: translateX(-50%);
}

.dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.dot.active {
  background: #ff4d6a;
}

.title {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 1rem 0 0.3rem;
}

.likes {
  color: #ff4d6a;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.desc {
  font-size: 1rem;
  line-height: 1.7;
  color: #444;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
}
</style>
