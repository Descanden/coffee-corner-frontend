<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/location" class="navbar-brand logo">Caffeine</router-link>
    <button class="btn btn-primary ml-auto" @click="openCreateModal">Create</button>
  </nav>

  <!-- Modal Create Post -->
  <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createModalLabel">Create New Post</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Form for creating a new post -->
          <div>
            <div class="mb-3">
              <label for="postTitle" class="form-label">Title</label>
              <input v-model="newPost.title" type="text" class="form-control" id="postTitle">
            </div>
            <div class="mb-3">
              <label for="postAuthor" class="form-label">Author</label>
              <input v-model="newPost.author" type="text" class="form-control" id="postAuthor">
            </div>
            <div class="mb-3">
              <label for="postCategory" class="form-label">Category</label>
              <input v-model="newPost.category" type="text" class="form-control" id="postCategory">
            </div>
            <div class="mb-3">
              <label for="postContent" class="form-label">Content</label>
              <textarea v-model="newPost.content" class="form-control" id="postContent" rows="4"></textarea>
            </div>
            <div class="mb-3">
              <label for="postImage" class="form-label">Image</label>
              <input type="file" class="form-control" id="postImage" @change="handleImageChange">
              <img v-if="previewImage" :src="previewImage" class="img-fluid mt-3" alt="Preview Image">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button @click="createPost" type="button" class="btn btn-primary">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Navbar",
  data() {
    return {
      newPost: {
        title: '',
        author: '',
        category: '',
        content: '',
        image: null,
      },
      previewImage: null,
    };
  },
  methods: {
    openCreateModal() {
      const modal = new bootstrap.Modal(document.getElementById('createModal'));
      modal.show();
    },
    
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.previewImage = URL.createObjectURL(file); 
        this.newPost.image = file;
      }
    },

    async createPost() {
      try {
        const formData = new FormData();
        formData.append('title', this.newPost.title);
        formData.append('author', this.newPost.author);
        formData.append('category', this.newPost.category);
        formData.append('content', this.newPost.content);

        if (this.newPost.image) {
          formData.append('image', this.newPost.image);
        }

        const response = await axios.post('http://localhost:8000/api/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          alert('Post created successfully!');
          this.newPost = {
            title: '',
            author: '',
            category: '',
            content: '',
            image: null,
          };
          this.previewImage = null;
          const modal = bootstrap.Modal.getInstance(document.getElementById('createModal'));
          modal.hide();
          this.$emit("post-created");
        }
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
      }
    }
  },
};
</script>

<style scoped>
.navbar {
  background-color: #D7C8A1;
  border-radius: 8px;
  padding: 20px 80px;
}

.navbar .logo {
  font-size: 28px;
  font-weight: bold;
  color: #3E2723;
}

.modal-body img {
  max-height: 300px;
  object-fit: contain;
  width: 100%;
  border-radius: 15px;
}
</style>
