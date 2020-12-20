<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app temporary width="330px">
      <div id="menu-head">
        <router-link to="/" tag="h2"></router-link>
        <v-icon @click="drawer = false">mdi-close</v-icon>
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
            <v-badge :content="productCount" color="green" >
              
              <h1 style="font-size:16px; position: fixed; padding-left:22px; color:green; font-family: 'Roboto';">{{productCount}}</h1>
              
          
              <button @click="toggleComponentOne">Toggle Component One</button>
              <KorpaN
        v-if="showComponentOne"
    />
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

import KorpaN from "~/components/KorpaN.vue"

export default {
  components: {
    KorpaN,
    Login,
    Register,
    ScndMenu,

  },
  data() {
    return {
      showComponentOne: false,
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
  methods: {
    toggleComponentOne () {
      this.showComponentOne = !this.showComponentOne;
    },
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
