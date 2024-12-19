<template>
  <div class="location-page container">
    <div class="header d-flex justify-content-between align-items-center">
      <h1 class="my-4">Our Location</h1>
      <!-- Button untuk menambahkan coffee shop baru -->
      <button class="btn btn-add mb-3" @click="showAddModal">Add New Coffee Shop</button>
    </div>

    <!-- Tabel Coffee Shops -->
    <div v-if="locationCoffeeShops && locationCoffeeShops.length">
      <table class="table table-striped">
        <thead class="table-header">
          <tr>
            <th>No</th>
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
              <!-- <button class="btn btn-view btn-sm" @click="viewLocationDetails(shop.id)">View</button> -->
              <button class="btn btn-edit btn-sm" @click="editLocationCoffeeShop(shop)">Edit</button>
              <button class="btn btn-delete btn-sm" @click="deleteLocationCoffeeShop(shop.id)">Delete</button>
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

        <!-- Pagination buttons for individual pages -->
        <li 
          v-for="page in locationPagination.total_pages" 
          :key="page" 
          class="page-item" 
          :class="{ active: locationPagination.current_page === page }">
          <button 
            class="page-link" 
            @click="fetchLocationCoffeeShops(locationPagination.page_url_for(page))">
            {{ page }}
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

    <!-- Modal untuk Mengedit Coffee Shop -->
    <div class="modal fade" id="editLocationModal" tabindex="-1" aria-labelledby="editLocationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editLocationModalLabel">Edit Coffee Shop</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateCoffeeShop">
              <div class="mb-3">
                <label for="editLocationName" class="form-label">Name</label>
                <input type="text" id="editLocationName" v-model="currentShop.name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="editLocationLocation" class="form-label">Location</label>
                <input type="text" id="editLocationLocation" v-model="currentShop.location" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="editLocationOwner" class="form-label">Owner</label>
                <input type="text" id="editLocationOwner" v-model="currentShop.owner" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="editLocationRating" class="form-label">Rating</label>
                <input type="number" id="editLocationRating" v-model="currentShop.rating" class="form-control" min="1" max="5" required />
              </div>
              <button type="submit" class="btn btn-warning">Update Coffee Shop</button>
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
      locationCoffeeShops: [],
      locationPagination: {},
      newShop: {
        name: '',
        location: '',
        owner: '',
        rating: 1,
      },
      currentShop: {
        id: null,
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
    editLocationCoffeeShop(shop) {
      this.currentShop = { ...shop };
      const modal = new Modal(document.getElementById("editLocationModal"));
      modal.show();
    },
    async updateCoffeeShop() {
      try {
        const response = await axios.put(`http://localhost:8000/api/coffee-shops/${this.currentShop.id}`, this.currentShop);
        if (response.status === 200) {
          alert("Coffee shop updated successfully.");
          this.fetchLocationCoffeeShops();
          const modal = new Modal(document.getElementById("editLocationModal"));
          modal.hide();
        }
      } catch (error) {
        console.error("Error updating coffee shop:", error);
      }
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
  margin-top: 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
}

.table {
  background-color: #fff8e1;
  border-radius: 8px;
}

.table th,
.table td {
  vertical-align: middle;
}

.table-header {
  background-color: #d49a6a;
  color: #fff;
}

.btn {
  border-radius: 5px;
}

.btn-add {
  background-color: #b57b3d;
  color: white;
  border: none;
}

.btn-add:hover {
  background-color: #8c5c2f;
}

/* .btn-view {
  background-color: #a68f5a;
  color: white;
  border: none;
}

.btn-view:hover {
  background-color: #8e7842;
} */

.btn-edit {
  background-color: #f1c232;
  color: white;
  border: none;
  margin-right: 5px;
}

.btn-edit:hover {
  background-color: #e0b02c;
}

.btn-delete {
  background-color: #8B5E3C;
  color: white;
  border: none;
}

.btn-delete:hover {
  background-color: #5A3E2B;
}

.modal-content {
  background-color: #fff8e1;
  border-radius: 8px;
}

.modal-header {
  background-color: #d49a6a;
  color: #fff;
}

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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
