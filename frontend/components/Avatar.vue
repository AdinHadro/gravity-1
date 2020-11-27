<template>
  <nuxt-link
    tag="div"
    class="avatar"
    v-bind:class="{ 'avatar-hover': hover }"
    :to="`/tramperi/${user.username}`"
    exact
  >
    <div class="image-wrapper" v-bind:class="{ big: size == 'big' }">
      <img v-if="!image" src="~/assets/images/user.png" />
      <img v-if="image" :src="image" />
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    size: "",
    hover: false,
    user: {}
  },
  computed: {
    image: function() {
      return this.user && this.user.image && this.user.image.url
        ? process.env.CMS_URL + this.user.image.url
        : "";
    }
  }
};
</script>
