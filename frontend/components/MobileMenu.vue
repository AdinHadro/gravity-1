<template>
  <div class="mobile-menu">
    <v-treeview
      hoverable
      activatable
      rounded
      dense
      selected-color="#cd9865"
      :items="categories"
      item-children="subCategories"
      item-key="id"
      item-text="name"
    >
      <template v-slot:label="{ item }">
        <v-btn text v-on:click="goTo(item.url)">{{item.name}}</v-btn>
      </template>
    </v-treeview>
  </div>
</template>

<script>
export default {
  props: ["categories"],
  methods: {
    goTo(url) {
      this.$router.replace({ path: url });
      this.$parent.showMobileMenu = false;
    }
  }
};
</script>
<style scoped>
.mobile-menu {
  padding: 0 0 20px 20px;
  position: absolute;
  width: 80%;
  background: #b7dbde;
  z-index: 26;
}
.mobile-menu .v-treeview button {
  color: #cd9865;
  min-width: 20px;
  padding: 0;
  text-transform: none;
}
.mobile-menu /deep/ .mdi-menu-down::before {
  font-size: 36px;
}
.v-application--is-ltr
  .mobile-menu
  /deep/
  .v-treeview-node--leaf
  > .v-treeview-node__root {
  padding-left: 10px;
  padding: 0;
  margin: 0;
}
</style>
