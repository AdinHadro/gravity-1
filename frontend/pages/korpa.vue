<template>
  <div class="page">
    <div class="products">
      <div class="prodcut" v-for="product in products" :key="product.id">
        <h1>{{ product.name }}</h1>

        <img :src="product.images[0].url" style="width:300px; height:300px;" />

        <h1>{{ product.price }}</h1>
      </div>

      <v-btn rounded color="sucess" dark>
        Potvrdi kupovinu
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },

  created() {
    const basket = this.$auth.$storage.getLocalStorage("basket") || {
      products: []
    };
    this.products = basket.products;
  }
};
</script>

<style></style>
