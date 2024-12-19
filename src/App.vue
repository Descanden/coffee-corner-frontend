<template>
  <div id="app">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="container">
      <section class="py-4">
        <h1 class="text-center fw-bold">Coffee Blog <br> from coffee experts</h1>
      </section>

      <div class="row">
        <Sidebar />

        <!-- Blog Section -->
        <section class="col-md-9">
          <!-- Router View -->
          <router-view></router-view>

          <!-- Fallback: Blog Posts -->
          <div v-if="!$route.name || $route.name === 'Home'" class="row">
            <PostCard
              v-for="post in posts"
              :key="post.id"
              :post="post"
              :openModal="openModal"
            />
          </div>

          <Pagination
            v-if="!$route.name || $route.name === 'Home'"
            :pagination="pagination"
            :fetchPosts="fetchPosts"
          />
        </section>
      </div>
    </main>

    <!-- Post Modal -->
    <PostModal 
      :selectedPost="selectedPost" 
      @update-post="handleUpdatePost"
      @delete-post="handleDeletePost" 
    />

    <!-- Footer -->
    <footer class="text-center py-3 bg-light">
      <p>&copy; 2024 Caffeine Blog. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import PostCard from './components/PostCard.vue';
import Pagination from './components/Pagination.vue';
import PostModal from './components/PostModal.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    PostCard,
    Pagination,
    PostModal,
  },
  data() {
    return {
      posts: [],
      pagination: {},
      selectedPost: null,
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts(pageUrl = 'http://localhost:8000/api/posts') {
      try {
        const response = await axios.get(pageUrl);
        this.posts = response.data.data.posts;
        this.pagination = response.data.data.pagination;
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    async openModal(postId) {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${postId}`);
        this.selectedPost = response.data.data.posts[0];
        const modal = new bootstrap.Modal(document.getElementById('articleModal'));
        modal.show();
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    },
    async handleUpdatePost(updatedPost) {
      try {
        const response = await axios.put(`http://localhost:8000/api/posts/${updatedPost.id}`, updatedPost);
        if (response.status === 200) {
          alert('Post updated successfully!');
          this.fetchPosts();
        }
      } catch (error) {
        console.error('Error updating post:', error);
      }
    },
    async handleDeletePost(postId) {
      try {
        const response = await axios.delete(`http://localhost:8000/api/posts/${postId}`);
        if (response.status === 200) {
          alert('Post deleted successfully!');
          this.fetchPosts();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },
  },
};
</script>

<style>
body {
  font-family: 'Crimson Pro', serif;
  background-color: #F5DEB3; /* Warna coklat terang */
  color: #252525;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}
</style>

