<template>
  <section class="card info-card">
    <div class="user-row">
      <img :src="user.avatar" class="avatar" />
      <div class="user-text">
        <div class="name-row">
          <h2 class="name">{{ user.name }}</h2>
          <span class="tag">{{ user.badge }}</span>
        </div>
        <p class="desc">{{ user.title }}</p>
        <button class="link" @click="$emit('edit')">编辑资料</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MineUserCard",
  props: {
    user: Object
  },
  emits: ["edit"]
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 1rem;
  border: 1px solid #f0f0f0;
  box-shadow: none;
}
.info-card {
  padding: 1rem;
  margin-top: 0.5rem;
}
.user-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.avatar {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: none;
}
.name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.name {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
}
.tag {
  font-size: 0.75rem;
  background: #fef3c7;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
}
.desc {
  margin: 0.35rem 0;
  color: #666;
}
.link {
  color: #3b82f6;
  background: none;
  border: none;
  font-size: 0.9rem;
  padding: 0;
}
</style>
