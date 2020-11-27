<template>
  <div>
    <div class="page">
      <Slider />
      <Promo />
      <Handpicked />
      <div class="divid-two-divs">
        </div>
    </div>
    <div class="sale-w3ls">
      <div class="container">
        <h6>
          <span>PRVI</span> BiH second hand i online
          <span>SHOPPING</span> portal
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "~/components/Slider.vue";
import Handpicked from "~/components/Handpicked.vue";
import Promo from "~/components/Promo.vue";

export default {
  components: {
    Slider,
    Handpicked,
    Promo
  }
};
</script>

<style scoped>

.divid-two-divs { 
background: transparent;
min-height: 100px;
}

</style>>


