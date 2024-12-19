<!-- src/components/CoffeeShopCard.vue -->
<template>
    <div class="coffee-shop-card">
      <div class="card">
        <img :src="shop.image" class="card-img-top" alt="Coffee Shop Image" />
        <div class="card-body">
          <h5 class="card-title">{{ shop.name }}</h5>
          <p class="card-text">{{ shop.location }}</p>
          <button @click="openModal(shop.id)" class="btn btn-primary">View Details</button>
          <button @click="updateShop(shop)" class="btn btn-warning">Edit</button>
          <button @click="deleteShop(shop.id)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      shop: Object,
      openModal: Function,
      updateShop: Function,
      deleteShop: Function,
    },
  };
  </script>
  
  <style scoped>
  .coffee-shop-card {
    margin-bottom: 20px;
  }
  </style>
  