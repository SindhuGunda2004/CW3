<template>
    <div>
        <nav>
            <!-- search bar -->
            <span class="searchbar"><input type="text" style="margin-left: 515px; font-size: 15px;"
                    placeholder="Search" v-model="searchVal">

            </span>
            <!-- sorting and ordering -->
            <div class="sortby">
                <label>Sort By:</label>
                <select v-model="selectedSort">
                    <option value="price">Price</option>
                    <option value="subject">Subject</option>
                    <option value="location">Location</option>
                    <option value="availability">Availability</option>
                </select>
                <label style="margin-left: 15px;">Order By:</label>
                <select v-model="selectedOrder">
                    <option value="AscDesc">Ascending to Descending</option>
                    <option value="DescAsc">Descending to Ascending</option>
                </select>
            </div>
        </nav>
        <div class="products-container">
            <div v-for="product in searchingAndSortedProducts" :key="product.id" class="product">
                <div class="content">
                    <figure>
                        <img :src="product.image" style="width: 100px; height: 100px;">
                    </figure>
                    <div class="text">
                        <p>Subject: {{product.subject}} </p>
                        <p>Location: {{product.location}}</p>
                        <p>Price: {{product.price}}</p>
                        <p>Available Stock: {{product.slotsAvailable}}</p>
                    </div>
                </div>
                <button @click="add(product)" v-if="canAddToCart(product)">Add to cart</button>
                    <button disabled="disabled" v-else>
                        Add to Cart
                    </button>
                    <span v-if="product.slotsAvailable === 0">All Out!</span>
                    <span v-else-if="product.slotsAvailable < 10">
                        Only {{product.slotsAvailable}} left!
                    </span>
                    <span v-else>Buy Now!!</span>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "ProductsList",
    props: ['products'],
    data() {
        return{
            searchVal: '',
            selectedSort: '',
            selectedOrder: '',
        }
    },
    methods: {
        add(product) {
            console.log("added product:", product.id);
            // trigger
            this.$emit('addProduct', product);
        },
        // function to check if there are slots available else it will disablt add to cart button
        canAddToCart: function (product) {
            return product.slotsAvailable > 0;
        },
    },
    computed: {
        searchingAndSortedProducts: function () {
            // first we are storing all products in the filtered list 
            let filteredList = this.products;

            // // Provide a default value for searchVal if it's undefined
            // let searchVal = this.searchVal;

            // search
            // the value entered in search bar is stored in searchVal
            if (this.searchVal.trim().length > 0) {
                // using the filter function we are filtering all products that are returned
                // for the conditions inside the filter fucntion
                filteredList = filteredList.filter((product) =>
                    // checks if searchVal is there in subject or location so that it can return subjects 
                    // that have those letters in subject or location
                    product.subject.toLowerCase().includes(this.searchVal.trim().toLowerCase()) ||
                    product.location.toLowerCase().includes(this.searchVal.trim().toLowerCase())
                );
            }
            // sorting
            // slice creates a copy of the array so that the original array is unmodified 
            let sortedArray = filteredList.slice();
            if (this.selectedSort == "price" && this.selectedOrder == "AscDesc") {
                return sortedArray.sort((a, b) => a.price - b.price);
            }
            if (this.selectedSort == "price" && this.selectedOrder == "DescAsc") {
                return sortedArray.sort((a, b) => b.price - a.price);
            }
            if (this.selectedSort == "location" && this.selectedOrder == "AscDesc") {
                return sortedArray.sort((a, b) => a.location.localeCompare(b.location));
            }
            if (this.selectedSort == "location" && this.selectedOrder == "DescAsc") {
                return sortedArray.sort((a, b) => b.location.localeCompare(a.location));
            }
            if (this.selectedSort == "subject" && this.selectedOrder == "AscDesc") {
                return sortedArray.sort((a, b) => a.subject.localeCompare(b.subject));
            }
            if (this.selectedSort == "subject" && this.selectedOrder == "DescAsc") {
                return sortedArray.sort((a, b) => b.subject.localeCompare(a.subject));
            }
            if (this.selectedSort == "availability" && this.selectedOrder == "AscDesc") {
                return sortedArray.sort((a, b) => a.slotsAvailable - b.slotsAvailable);
            }
            if (this.selectedSort == "availability" && this.selectedOrder == "DescAsc") {
                return sortedArray.sort((a, b) => b.slotsAvailable - a.slotsAvailable);
            }
            return sortedArray;
        }
    }

};
</script>
