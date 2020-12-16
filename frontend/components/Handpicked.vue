<template>
  <div class="handpickeds">
    <div class="new_arrivals_agile_w3ls_info" v-for="group in handpickeds" v-bind:key="group.id">
      <div class="container">
        <h3 class="wthree_text_info">{{ group.title }}</h3>
        <div id="horizontalTab">
          <div class="resp-tabs-container">
            <div
              class="tab1 resp-tab-content resp-tab-content-active"
              v-for="product in group.products"
              v-bind:key="product.id"
            >
              <Product :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import handpickedsQuery from "~/apollo/queries/handpicked/handpickeds";
import latestProductsQuery from "~/apollo/queries/product/latestProducts";
import Product from "./Product";

export default {
  components: {
    Product
  },
  data() {
    return {
      handpickeds: []
    };
  },
  async created() {
    const products = (
      await this.$apollo.query({
        query: latestProductsQuery
      })
    ).data.products;

    const handpicked = (
      await this.$apollo.query({
        query: handpickedsQuery
      })
    ).data.handpickeds;

    const latest = [{ id: 0, title: "Super ponuda !", products }];
    this.handpickeds = [...latest, ...handpicked];
  }
};
</script>  