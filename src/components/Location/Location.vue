<template>
  <div class="location-page container">
    <h1 class="text-center my-4">Coffee Shops</h1>

    <!-- Button untuk menambahkan coffee shop baru -->
    <button class="btn btn-success mb-3" @click="showAddModal">Add New Coffee Shop</button>

    <!-- Tabel Coffee Shops -->
    <div v-if="locationCoffeeShops && locationCoffeeShops.length">
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
          <tr v-for="(shop, index) in locationCoffeeShops" :key="shop.id">
            <td>{{ index + 1 }}</td>
            <td>{{ shop.name }}</td>
            <td>{{ shop.location }}</td>
            <td>{{ shop.owner }}</td>
            <td>{{ shop.rating }}</td>
            <td>
              <button class="btn btn-primary btn-sm" @click="viewLocationDetails(shop.id)">View</button>
              <button class="btn btn-warning btn-sm" @click="editLocationCoffeeShop(shop)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteLocationCoffeeShop(shop.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No Coffee Shops found!</p>

    <!-- Pagination -->
    <nav v-if="locationPagination && locationPagination.total_pages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !locationPagination.prev_page_url }">
          <button class="page-link" @click="fetchLocationCoffeeShops(locationPagination.prev_page_url)" :disabled="!locationPagination.prev_page_url">
            Previous
          </button>
        </li>
        <li class="page-item" :class="{ disabled: !locationPagination.next_page_url }">
          <button class="page-link" @click="fetchLocationCoffeeShops(locationPagination.next_page_url)" :disabled="!locationPagination.next_page_url">
            Next
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal untuk Menambahkan Coffee Shop -->
    <div class="modal fade" id="addLocationModal" tabindex="-1" aria-labelledby="addLocationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addLocationModalLabel">Add New Coffee Shop</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addNewCoffeeShop">
              <div class="mb-3">
                <label for="addLocationName" class="form-label">Name</label>
                <input type="text" id="addLocationName" v-model="newShop.name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="addLocationLocation" class="form-label">Location</label>
                <input type="text" id="addLocationLocation" v-model="newShop.location" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="addLocationOwner" class="form-label">Owner</label>
                <input type="text" id="addLocationOwner" v-model="newShop.owner" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="addLocationRating" class="form-label">Rating</label>
                <input type="number" id="addLocationRating" v-model="newShop.rating" class="form-control" min="1" max="5" required />
              </div>
              <button type="submit" class="btn btn-success">Add Coffee Shop</button>
            </form>
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
      locationCoffeeShops: [], // Data coffee shops
      locationPagination: {}, // Informasi pagination
      newShop: { // Data untuk shop baru
        name: '',
        location: '',
        owner: '',
        rating: 1,
      },
    };
  },
  mounted() {
    this.fetchLocationCoffeeShops();
  },
  methods: {
    async fetchLocationCoffeeShops(pageUrl = "http://localhost:8000/api/coffee-shops") {
      try {
        const response = await axios.get(pageUrl);
        this.locationCoffeeShops = response.data.data.posts || [];
        this.locationPagination = response.data.data.pagination || {};
      } catch (error) {
        console.error("Error fetching coffee shops:", error);
      }
    },
    async addNewCoffeeShop() {
      try {
        const response = await axios.post("http://localhost:8000/api/coffee-shops", this.newShop);
        if (response.status === 201) {
          alert("Coffee shop added successfully.");
          this.fetchLocationCoffeeShops();
          const modal = new Modal(document.getElementById("addLocationModal"));
          modal.hide();
        }
      } catch (error) {
        console.error("Error adding coffee shop:", error);
      }
    },
    showAddModal() {
      const modal = new Modal(document.getElementById("addLocationModal"));
      modal.show();
    },
    async viewLocationDetails(id) {
      alert("View details functionality to be implemented!");
    },
    async editLocationCoffeeShop(shop) {
      alert("Edit functionality to be implemented!");
    },
    async deleteLocationCoffeeShop(id) {
      if (confirm("Are you sure you want to delete this coffee shop?")) {
        try {
          await axios.delete(`http://localhost:8000/api/coffee-shops/${id}`);
          alert("Coffee shop deleted successfully.");
          this.fetchLocationCoffeeShops();
        } catch (error) {
          console.error("Error deleting coffee shop:", error);
        }
      }
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
