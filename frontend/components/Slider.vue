<template>
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li
        data-target="#myCarousel"
        :data-slide-to="index"
        v-bind:class="{ 'active' : index == 0}"
        v-for="(slide, index) in slidesRes"
        v-bind:key="slide.id"
      ></li>
    </ol>
    <div class="carousel-inner" role="listbox">
      <div
        class="item"
        v-bind:class="{ 'active' : index == 0}"
        v-for="(slide, index) in slidesRes"
        v-bind:key="slide.id"
        v-bind:style="{ 'background-image': 'url(' + slide.imageUrl + ')' }"
      >
        <div>
          <div class="carousel-caption">
            <h3>{{ slide.title }}</h3>
            <p>{{ slide.subtitle }}</p>
            <div class="slider-inside">
              <a
                class="hvr-outline-out button2"
                style="color:white"
                :href="slide.link"
              >{{ slide.actionText }}</a>
              <a
                class="left carousel-control"
                style="color:white"
                href="#myCarousel"
                role="button"
                data-slide="prev"
              >
                <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="right carousel-control"
                style="color:white"
                href="#myCarousel"
                role="button"
                data-slide="next"
              >
                <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slidesQuery from "~/apollo/queries/slide/slides";

export default {
  data() {
    return {
      slides: [],
      query: ""
    };
  },
  apollo: {
    slides: {
      prefetch: true,
      query: slidesQuery
    }
  },
  computed: {
    slidesRes() {
      let slides = [...this.slides];

      slides.forEach(slide => {
        slide.imageUrl = slide.image
          ? process.env.CMS_URL + slide.image.url
          : "";
      });

      return slides;
    }
  }
};
</script>  