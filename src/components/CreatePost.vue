<template>
  <div class="create-post">
    <h2>Create New Post</h2>
    <form @submit.prevent="createPost">
      <div class="mb-3">
        <label for="postTitle" class="form-label">Title</label>
        <input v-model="post.title" type="text" id="postTitle" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="postAuthor" class="form-label">Author</label>
        <input v-model="post.author" type="text" id="postAuthor" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="postCategory" class="form-label">Category</label>
        <input v-model="post.category" type="text" id="postCategory" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="postContent" class="form-label">Content</label>
        <textarea v-model="post.content" id="postContent" class="form-control" rows="4" required></textarea>
      </div>
      <div class="mb-3">
        <label for="postImage" class="form-label">Image</label>
        <input type="file" @change="handleFileChange" class="form-control" id="postImage" />
      </div>
      <button type="submit" class="btn btn-success">Create Post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreatePost',
  data() {
    return {
      post: {
        title: '',
        author: '',
        category: '',
        content: '',
        image: null,
      },
    };
  },
  methods: {
    handleFileChange(event) {
      this.post.image = event.target.files[0];
    },
    async createPost() {
      const formData = new FormData();
      formData.append('title', this.post.title);
      formData.append('author', this.post.author);
      formData.append('category', this.post.category);
      formData.append('content', this.post.content);
      formData.append('image', this.post.image);

      try {
        const response = await this.$axios.post('/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          this.$router.push('/');  // Setelah berhasil, redirect ke halaman utama atau halaman list
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    },
  },
};
</script>

<style scoped>
.create-post {
  margin: 20px;
}

.create-post h2 {
  margin-bottom: 20px;
}

.create-post form {
  max-width: 600px;
  margin: 0 auto;
}

.create-post .form-label {
  font-weight: bold;
}
</style>
