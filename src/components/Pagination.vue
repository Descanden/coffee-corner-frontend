<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" v-if="pagination.prev_page_url">
        <a class="page-link" href="#" @click.prevent="fetchPosts(pagination.prev_page_url)">Prev</a>
      </li>
      <li 
        class="page-item" 
        v-for="page in pagination.total_pages" 
        :key="page" 
        :class="{ active: pagination.current_page === page }"
      >
        <a 
          class="page-link" 
          href="#" 
          @click.prevent="fetchPosts(pagination.first_page_url)">{{ page }}</a>
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
.pagination {
  font-family: 'Arial', sans-serif;
}

.pagination .page-item {
  margin: 0 5px;
}

.pagination .page-item .page-link {
  color: #3E2723;
  border: 1px solid #D7C8A1;
  border-radius: 5px;
  background-color: #F8F3E6;
}

.pagination .page-item.active .page-link {
  background-color: #795548;
  border-color: #5D4037;
  color: #ffffff;
}

.pagination .page-item .page-link:hover {
  background-color: #D7C8A1;
  color: #3E2723;
}
</style>
