<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" v-if="pagination.prev_page_url">
        <a class="page-link" href="#" @click.prevent="fetchPosts(pagination.prev_page_url)">Prev</a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{ active: pagination.current_page === page }">
        <a class="page-link" href="#" @click.prevent="fetchPosts(pagination.first_page_url)">{{ page }}</a>
      </li>
      <li class="page-item" v-if="pagination.next_page_url">
        <a class="page-link" href="#" @click.prevent="fetchPosts(pagination.next_page_url)">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pagination", "fetchPosts"]
};
</script>

<style scoped>
.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
