<template>
  <div class="location-page container">
    <h1 class="text-center my-4">Coffee Shops</h1>
    
    <!-- Tabel Coffee Shops -->
    <div v-if="coffeeShops && coffeeShops.length">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Location</th>
            <th>Owner</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(shop, index) in coffeeShops" :key="shop.id">
            <td>{{ index + 1 }}</td>
            <td>{{ shop.name }}</td>
            <td>{{ shop.location }}</td>
            <td>{{ shop.owner }}</td>
            <td>{{ shop.rating }}</td>
            <td>
              <button class="btn btn-primary btn-sm" @click="viewDetails(shop.id)">View</button>
              <button class="btn btn-warning btn-sm" @click="editCoffeeShop(shop)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteCoffeeShop(shop.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No Coffee Shops found!</p>

    <!-- Pagination -->
    <nav v-if="pagination && pagination.total_pages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
          <button class="page-link" @click="fetchCoffeeShops(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
            Previous
          </button>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
          <button class="page-link" @click="fetchCoffeeShops(pagination.next_page_url)" :disabled="!pagination.next_page_url">
            Next
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal for Viewing Coffee Shop -->
    <div class="modal fade" id="viewModal" tabindex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="viewModalLabel">Coffee Shop Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Name:</strong> {{ selectedShop?.name || 'N/A' }}</p>
            <p><strong>Location:</strong> {{ selectedShop?.location || 'N/A' }}</p>
            <p><strong>Owner:</strong> {{ selectedShop?.owner || 'N/A' }}</p>
            <p><strong>Rating:</strong> {{ selectedShop?.rating || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Modal } from "bootstrap";

export default {
  name: "Location",
  data() {
    return {
      coffeeShops: [], // Data coffee shops
      pagination: {}, // Informasi pagination
      selectedShop: null, // Coffee shop yang sedang dilihat
    };
  },
  mounted() {
    this.fetchCoffeeShops();
  },
  methods: {
    // Method untuk fetch data coffee shop
    async fetchCoffeeShops(pageUrl = "http://localhost:8000/api/coffee-shops") {
      try {
        const response = await axios.get(pageUrl);
        this.coffeeShops = response.data.data?.posts || [];
        this.pagination = response.data.data?.pagination || {};
      } catch (error) {
        console.error("Error fetching coffee shops:", error);
      }
    },
    
    // Method untuk melihat detail coffee shop
    async viewDetails(id) {
  try {
    const response = await axios.get(`http://localhost:8000/api/coffee-shops/${id}`);
    
    // Cek apakah respons memiliki data yang benar
    console.log(response.data); // Periksa respons di konsol
    
    // Akses data yang benar berdasarkan struktur baru
    if (response.data.success && response.data.data.data) {
      this.selectedShop = response.data.data.data; // Menyimpan data coffee shop
    } else {
      console.error("Data coffee shop tidak ditemukan.");
    }

    // Tampilkan modal
    const modal = new Modal(document.getElementById("viewModal"));
    modal.show();
    
  } catch (error) {
    console.error("Error fetching coffee shop details:", error);
  }
}
,
    
    // Method untuk menghapus coffee shop
    async deleteCoffeeShop(id) {
      if (!confirm("Are you sure you want to delete this coffee shop?")) return;
      try {
        await axios.delete(`http://localhost:8000/api/coffee-shops/${id}`);
        alert("Coffee shop deleted successfully.");
        this.fetchCoffeeShops();
      } catch (error) {
        console.error("Error deleting coffee shop:", error);
      }
    },

    // Method untuk mengedit coffee shop
    editCoffeeShop(shop) {
      alert("Edit functionality to be implemented!");
    },
  },
};
</script>

<style scoped>
.location-page {
  text-align: center;
  margin-top: 20px;
}

.table th,
.table td {
  vertical-align: middle;
}
</style>
