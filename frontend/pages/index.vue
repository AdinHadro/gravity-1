<template>
  <div>
      <Slider />
    <div class="page">
    
      <Handpicked />
       <Promo />

      <div class="divid-two-divs">
        </div>
    </div>
    <div class="sale-w3ls">
      <div class="container">
        <h6>
          <span>Gravity SHOPPING</span> Najraznovrsniji web shop u BiH
        
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


