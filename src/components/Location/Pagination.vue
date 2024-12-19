<template>
    <nav v-if="pagination && pagination.total_pages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
          <button class="page-link" @click="fetch(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
            Previous
          </button>
        </li>
        <li
          v-for="page in pagination.total_pages"
          :key="page"
          class="page-item"
          :class="{ active: pagination.current_page === page }"
        >
          <button class="page-link" @click="fetch(pagination.page_url_for(page))">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
          <button class="page-link" @click="fetch(pagination.next_page_url)" :disabled="!pagination.next_page_url">
            Next
          </button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    props: {
      pagination: Object,
    },
    methods: {
      fetch(url) {
        this.$emit('fetch-shops', url);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to Pagination */
  </style>
  