<template>
    <div>
      <h2>Checkout</h2>
      <div class="products-container">
        <div v-for="product in cart" :key="product.id" class="product">
        <div class="content">
          <figure>
            <img :src="product.image" height="100px" width="100px" alt="Product Image">
          </figure>
          <div class="text">
            <p>Subject: {{ product.subject }} </p>
            <p>Price: {{ product.price }} </p>
            <p>Location: {{ product.location }}</p>
          </div>
        </div>
        <button @click="removeItem(product.id)">Remove from Cart</button>
      </div>
      </div>
      <p class="tprice">Total Price: {{ totalPrice }}</p>
      <div class="checkout" style="margin-bottom: 5px;">
        <h2 style="font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">Checkout</h2>
        <p>
          Name:
          <input v-model.trim="order.Name">
        </p>
        <p>
          Phone Number:
          <input type="number" v-model.trim="order.Phone">
        </p>
        <button class="placeOrd" @click="submitForm" :disabled="!validateDetails">Place Order</button>
      </div>
    </div>
  </template>
  
  <script>
  /* eslint-disable */ 
  export default {
    name: "Orders-list", 
    props: ['cart', 'products'],
    data() {
      return {
        order: {
          Name : "", 
          Phone: ""
        }
      }
    },
    methods: {
      removeItem(productId) {
        console.log("Trying to remove product");
        console.log("Index: ", productId);
        this.$emit("remove-item", productId);
      },
      submitForm() {
        alert("Purchase Completed\nYou're Enrolled in the subjects!!!!");
        window.location.reload();
      },
    },
    computed: {
      validateDetails() {
        return /^[A-Za-z\s]+$/.test(this.order.Name) && /^[0-9]+$/.test(this.order.Phone);
      },
      totalPrice() {
            return this.cart.reduce((total, product) => total + product.price, 0);
        },
    }
  }
  </script>
  