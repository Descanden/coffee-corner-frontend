<template>
    <div v-if="coffeeShops && coffeeShops.length">
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
          <tr v-for="(shop, index) in coffeeShops" :key="shop.id">
            <td>{{ index + 1 }}</td>
            <td>{{ shop.name }}</td>
            <td>{{ shop.location }}</td>
            <td>{{ shop.owner }}</td>
            <td>{{ shop.rating }}</td>
            <td>
              <button class="btn btn-edit btn-sm" @click="edit(shop)">Edit</button>
              <button class="btn btn-delete btn-sm" @click="delete(shop.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No Coffee Shops found!</p>
  </template>
  
  <script>
  export default {
    name: 'CoffeeShopTable',
    props: {
      coffeeShops: Array,
      pagination: Object,
    },
    methods: {
      edit(shop) {
        this.$emit('edit', shop);
      },
      delete(id) {
        this.$emit('delete', id);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles specific to CoffeeShopTable */
  </style>
  