<template>
  <div :class="`col-lg-${size} col-md-4 col-sm-6 col-12 product-men`">
    <div class="men-pro-item simpleCart_shelfItem">
      <nuxt-link tag="div" class="men-thumb-item" :to="`/produkt/${prod.id}`" exact>
        <div class="product-image-wrapper">
          <img :src="prod.imageUrl" alt class="pro-image-front" />
          <img :src="prod.imageUrl" alt class="pro-image-back" />
        </div>
        <div class="men-cart-pro">
          <div class="inner-men-cart-pro">
            <nuxt-link :to="`/produkt/${prod.id}`" class="link-product-add-cart">Pogledaj</nuxt-link>
          </div>
        </div>
        <div class="avatar-wrapper">
          <avatar :user="prod.user" :hover="true" />
        </div>
      </nuxt-link>
      <div class="item-info-product">
        <h4>
          <nuxt-link tag="a" :to="`/produkt/${prod.id}`" exact>{{ prod.name }}</nuxt-link>
        </h4>
        <div class="info-product-price">
          <span class="item_price">{{ prod.price }} KM</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "~/components/Avatar.vue";

export default {
  components: {
    Avatar
  },
  props: {
    product: { user: {} },
    size: {
      type: Number,
      required: false,
      default: 3
    }
  },
  data() {
    return {
      prod: { user: {} }
    };
  },
  mounted() {
    this.prod = this.product;
    this.prod.imageUrl =
      this.product.images && this.product.images.length
        ? process.env.CMS_URL + this.product.images[0].url
        : "";
  }
};
</script>