<template>
  <div class="banner_bottom_agile_info">
    <div class="container">
      <div class="banner_bottom_agile_info_inner_w3ls">
        <div
          class="col-md-6 wthree_banner_bottom_grid_three_left1 grid"
          v-for="promo in promos"
          v-bind:key="promo.id"
        >
          <figure class="effect-roxy">
            <img :src="getImage(promo)" alt=" " class="img-responsive" />
            <figcaption>
              <h3>{{ promo.title }}</h3>
              <p>{{ promo.description }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import promosQuery from "~/apollo/queries/promo/promos";

export default {
  data() {
    return {
      promos: [],
      query: ""
    };
  },
  apollo: {
    promos: {
      prefetch: true,
      query: promosQuery
    }
  },
  methods: {
    getImage(promo) {
      return process.env.CMS_URL + promo.image.url;
    }
  }
};
</script>  