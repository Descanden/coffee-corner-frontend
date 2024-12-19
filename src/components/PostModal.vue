<template>
    <div class="modal fade" id="articleModal" tabindex="-1" aria-labelledby="articleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="articleModalLabel">{{ isEditing ? "Edit Post" : (selectedPost ? selectedPost.title : "Loading...") }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Editing Form -->
            <div v-if="isEditing">
              <div class="mb-3">
                <label for="postTitle" class="form-label">Title</label>
                <input v-model="editedPost.title" type="text" class="form-control" id="postTitle">
              </div>
              <div class="mb-3">
                <label for="postAuthor" class="form-label">Author</label>
                <input v-model="editedPost.author" type="text" class="form-control" id="postAuthor">
              </div>
              <div class="mb-3">
                <label for="postCategory" class="form-label">Category</label>
                <input v-model="editedPost.category" type="text" class="form-control" id="postCategory">
              </div>
              <div class="mb-3">
                <label for="postContent" class="form-label">Content</label>
                <textarea v-model="editedPost.content" class="form-control" id="postContent" rows="4"></textarea>
              </div>
              <div class="mb-3">
                <label for="postImage" class="form-label">Image</label>
                <input type="file" class="form-control" id="postImage" @change="handleFileChange">
                <img v-if="previewImage" :src="previewImage" class="img-fluid mt-3" alt="Preview Image">
              </div>
            </div>
  
            <!-- View Mode -->
            <div v-else>
              <img :src="selectedPost ? selectedPost.image : ''" class="img-fluid mb-3" alt="Post Image">
              <p><strong>Author:</strong> {{ selectedPost ? selectedPost.author : "Loading..." }}</p>
              <p><strong>Category:</strong> {{ selectedPost ? selectedPost.category : "Loading..." }}</p>
              <p>{{ selectedPost ? selectedPost.content : "Loading content..." }}</p>
            </div>
          </div>
          <div class="modal-footer">
            <!-- Action Buttons -->
            <button v-if="!isEditing" @click="startEditing" type="button" class="btn btn-primary">Edit</button>
            <button v-if="!isEditing" @click="deletePost" type="button" class="btn btn-danger">Delete</button>
            <button v-if="isEditing" @click="saveChanges" type="button" class="btn btn-success">Save</button>
            <button v-if="isEditing" @click="cancelEditing" type="button" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PostModal",
    props: ["selectedPost"],
    data() {
      return {
        isEditing: false,
        editedPost: {},
        previewImage: null,
      };
    },
    watch: {
      selectedPost(newPost) {
        if (newPost) {
          this.editedPost = { ...newPost };
          this.previewImage = newPost.image;
        }
      },
    },
    methods: {
      startEditing() {
        this.isEditing = true;
        this.editedPost = { ...this.selectedPost };
      },
      cancelEditing() {
        this.isEditing = false;
        this.previewImage = this.selectedPost.image;
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImage = e.target.result;
            this.editedPost.image = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      saveChanges() {
        this.$emit("update-post", this.editedPost);
        this.isEditing = false;
      },
      deletePost() {
        if (confirm("Are you sure you want to delete this post?")) {
          this.$emit("delete-post", this.selectedPost.id);
          const modal = bootstrap.Modal.getInstance(document.getElementById("articleModal"));
          modal.hide();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-body img {
    max-height: 300px;
    object-fit: contain;
    width: 100%;
    border-radius: 15px;
  }
  </style>
  