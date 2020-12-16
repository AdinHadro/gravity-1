<template>
  <div>
    <v-navigation-drawer v-model="drawer" right fixed app temporary width="330px">
      <div id="korpa-head">
        <router-link to="/" tag="h2"></router-link>
        <v-icon @click="drawer = false">mdi-close</v-icon>
      </div>

 

      <!-- <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list> -->

      <div id="menu-social">
        <div class="social-icons">
          <v-icon>mdi-instagram</v-icon>
          <v-icon>mdi-twitter</v-icon>
          <v-icon>mdi-facebook</v-icon>
        </div>
        <p>Vaša Gravity Prodaja</p>
      </div>
    </v-navigation-drawer>
    <v-app-bar app>
      <div class="top-toolbar-cont">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <div class="bar-content">
          <v-toolbar-title
            class="clickable"
            @click="$router.push({ path: '/' })"
          ></v-toolbar-title>
          <div class="cart-design">
            <v-badge :content="productCount" color="green" >
              <div class: notification-cart>
              <h1 style="font-size:16px; position: fixed; padding-left:22px; color:green; font-family: 'Roboto';">{{productCount}}</h1>
              </div>
              <v-icon
                >mdi-cart-outline</v-icon
              >
            </v-badge>
          </div>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Login from "~/components/Login.vue";
import Register from "~/components/Register.vue";
import ScndMenu from "~/components/ScndMenu.vue";


export default {
  components: {
    Login,
    Register,
    ScndMenu,

  },
  data() {
    return {
              products: [],

      drawer: false,
      items: [
        { icon: "mdi-shopping", title: "Pogledajte korpu", to: "/basket" },
        { icon: "mdi-plus-box", title: "Pomoć", to: "/orders" },
        { icon: "mdi-tag-heart", title: "O nama", to: "/buy" }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters["authentication/user"];
    },

    productCount() {
      return this.$store.getters["cart/productCount"];
    }
  },
  created() {
    const basket = this.$auth.$storage.getLocalStorage("basket") || {
      products: []
    };
    this.products = basket.products;
  },
  methods: {
    showRegister() {
      this.$refs.register.dialog = true;
    },
    ...mapMutations({
      logout: "authentication/logout"
    })
  }
};
</script>
<style scoped>
#home > div > div:nth-child(2) > header > div {
  display: flex;
  flex-direction: row-reverse;
}
.alternate-look #top-pic-head {
  display: none;
}
</style>
