<template>
  <article class="col-md-4 mb-4" @click="openModal(post.id)">
    <div class="card">
      <img :src="post.image" class="card-img-top" alt="Post Image">
      <div class="card-body">
        <span class="badge bg-secondary">{{ post.category }}</span>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.author }} <br><small>{{ post.created_at }}</small></p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post", "openModal"]
};
</script>

<style scoped>
.card {
  border: 1px solid #D7C8A1;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #F8F3E6;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.25rem;
  color: #3E2723;
}

.card-text {
  font-size: 0.9rem;
  color: #5D4037;
}

.badge.bg-secondary {
  background-color: #795548;
  color: #ffffff;
}
</style>
