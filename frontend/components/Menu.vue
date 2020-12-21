<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app temporary width="330px">
      <div id="menu-head">
        <router-link to="/" tag="h2"></router-link>
        <v-icon @click="drawer = false">mdi-close</v-icon>
      </div>
      <div class="menu-fix" style="padding-top:50px;"></div>
      <MobileScnd />

      <div id="menu-social">
        <div class="social-icons">
          <v-icon>mdi-instagram</v-icon>
          <v-icon>mdi-twitter</v-icon>
          <v-icon>mdi-facebook</v-icon>
        </div>
        <p>Vaša Gravity Prodaja</p>
      </div>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="drawer1"
      right
      fixed
      app
      temporary
      width="330px"
    >
      <div id="menu-head">
        <router-link to="/" tag="h2"></router-link>
        <v-icon @click="drawer1 = false">mdi-close</v-icon>
      </div>
      <div class="basket-full" style="padding-top:50px;">
        <div class="products">
          <div
            class="prodcut"
            v-for="(product, index) in products"
            :key="index"
          >
            <img
              :src="product.images[0].url"
              style="width:200px; height:200px; padding-left:10px;"
            />
            <h1
              style="font-size: 15pt;
    float: right;"
            >
              {{ product.price }} KM
            </h1>
            <div class="button-style-delete">
              <v-btn
                @click="[deleteProduct(product)]"
                style="font-size:7pt"
                rounded
                color="red"
                dark
              >
                Očisti korpu
              </v-btn>
            </div>
            <h1
              style="font-size: 15pt;
    border-bottom: 1pt solid;"
            >
              {{ product.name }}
            </h1>
          </div>
          <nuxt-link to="/potvrda-kupovine">
            <v-btn
              style="margin-top:20px; margin-left:20%;"
              rounded
              color="sucess"
              dark
            >
              Potvrdi kupovinu
            </v-btn>
          </nuxt-link>
        </div>
      </div>

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
            <h1
              style="font-size:16px; position: fixed; padding-left:28px; color:green; font-family: 'Roboto';"
            >
              {{ productCount }}
            </h1>

            <v-app-bar-nav-icon @click.stop="drawer1 = !drawer1">
              <v-icon>mdi-cart-outline</v-icon>
            </v-app-bar-nav-icon>
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
import MobileScnd from "~/components/MobileScnd.vue";
import KorpaN from "~/components/KorpaN.vue";

export default {
  components: {
    KorpaN,
    Login,
    Register,
    ScndMenu,
    MobileScnd
  },
  data() {
    return {
      showComponentOne: false,
      drawer: false,
      drawer1: false,
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
    },
    products() {
      return this.$store.getters["cart/products"];
    }
  },
  methods: {
    deleteProduct(product) {
      this.deleteProduct(product);
    },
    toggleComponentOne() {
      this.showComponentOne = !this.showComponentOne;
    },
    showRegister() {
      this.$refs.register.dialog = true;
    },
    ...mapMutations({
      logout: "authentication/logout",
      deleteProduct: "cart/deleteProduct"
    })
  },
  created() {}
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
