<template>
  <div class="app">
    <header class="navbar" style="display: flex; justify-content: space-between; align-items: center;">
            <p style="text-align: center; margin-left: 590px; font-size: 25px;">{{sitename}}
                <button class="fas fa-cart-arrow-down"
                    style="margin-left: 500px; position: absolute; background-color: #ffe14c; border: none; border-radius: 2px solid; padding: 4px;"
                    @click="toggleCartPage" :disabled="cartItemCount === 0">
                    {{this.cart.length}}
                </button>
            </p>
        </header>
        
    <main>
      <product-list  :products="products" @addProduct="addToCart" v-if="showProduct"></product-list>
      <orders :cart="cart" @remove-item="removeFromCart" v-else></orders>
    </main>
  </div>
</template>

<script> /* eslint-disable */
import productList from "./components/Lessons.vue";
import orders from "./components/Orders.vue"

/* eslint-disable */
export default {
  name: 'App',
  components: {
    productList,
    orders
  },
  data(){
    return{
      sitename: 'After School Adventures',
      cart:[],
      products: [],
      showProduct: true,
      cartIsEmpty: true,
    }
  },
  created: function () {
        console.log("Requesting data from the server ...");

        fetch('http://localhost:8080/collection/Lessons')
            .then((response) => {
                response.json().then((json) => {
                    // Updating the products array with the fetched data
                    this.products = json;
                    console.log(json);
                });
            })
    },
  methods: {
    addToCart(product){
      // Decreases slotsAvailable locally
      product.slotsAvailable--;
      console.log("addProduct event received by the root component.");
      this.cart.push(product);
    },
    toggleCartPage: function () {
      // ? is a ternery operator which works like if else statement, shorthand way of writing if-else
      // ? helps shifting between pages works like the toggle button when true it will be product page and 
      // when false it will be checkout page
      this.showProduct = this.showProduct ? false : true;
    },
    // funtion for removing a subject or class from the cart
    removeFromCart: function (productId) {
      // checking for the index of the product we are removing  
      // its taking the id of the product in scart and checking if its same as the id pased in premove product 
      const index = this.cart.findIndex(product => product.id === productId);
      console.log("Index form app.vue: ", index )
      // splice removes a specific product at specified index and 1 indicated that only 1 product has to be removed 
      // and we put [0] cuz we want the details directly instead of the details in the array
      // so basically by putting [0] we are accessing the first element of the array, so we are directly storing the element
      const removedProduct = this.cart.splice(index, 1)[0];
      console.log("Removed Product: ", removedProduct)
      const productIndex = this.products.findIndex(p => p.id === removedProduct.id);
      // directly updates the slots from here when a product is removed from cart
      this.products[productIndex].slotsAvailable++;
      // updates cartIsEmpty by checking whether its empty or not
      this.cartIsEmpty = this.cart.length === 0;
      },
  },
  computed: {
    cartItemCount: function () {
      return this.cart.length;
    },
    // function to check if there are slots available else it will disablt add to cart button
    canAddToCart: function (product) {
      return product.slotsAvailable > 0;
    },
  }
}
</script>