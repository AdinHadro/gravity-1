<template>
  <div class="menu-wrapper">
    <v-treeview rounded hoverable :items="categories"></v-treeview>

    <MobileMenu :categories="categories" v-if="showMobileMenu" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import categoriesQuery from "~/apollo/queries/category/categories";
import MobileMenu from "./MobileMenu";

export default {
  components: {
    MobileMenu
  },
  data() {
    return {
      categories: [],
      query: "",
      showMobileMenu: false,
      searchText: ""
    };
  },
  watch: {
    categories: function() {
      const that = this;
      this.$nextTick(function() {
        $(document).on("click touchend", function(e) {
          if (
            !$(event.target).is(".mobile-menu") &&
            !$(event.target)
              .parents(".mobile-menu")
              .is(".mobile-menu")
          ) {
            that.showMobileMenu = false;
          }
        });
      });
    }
  },

  computed: {
    username() {
      return this.$store.getters["auth/username"];
    }
  },
  async created() {
    const response = (
      await this.$apollo.query({
        query: categoriesQuery
      })
    ).data.categories;
    response.forEach(category => {
      category.children = category.subCategories;
      category.children.forEach(subCategory => {
        subCategory.children = subCategory.subCategories;
      });
    });
    this.categories = response;
  },

  methods: {
    ...mapMutations({
      logout: "auth/logout"
    }),
    showMobMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
    goToPage(link) {
      this.showMobileMenu = false;
      this.$router.replace({ path: link });
    },
    goToSearch() {
      this.showMobileMenu = false;
      this.$router.push({
        path: "/pretraga",
        query: {
          text: this.searchText
        }
      });
      this.searchText = "";
    }
  }
};
</script>
<style>
.navbar {
  z-index: 5;
}
.navbar-collapse {
  display: none;
}
.navbar.navbar-default {
  width: 100%;
}
@media (max-width: 768px) {
  .menu-wrapper {
    position: relative;
  }
  .search-box {
    margin-right: 11%;
  }
  .search-box > div {
    float: left;
  }
  .search-box .v-input {
    width: 200px;
  }
  .search-box .v-text-field__details {
    display: none;
  }
  .ban-top .search-box input[type="button"] {
    margin-top: 11px;
    width: 44px;
    height: 37px;
    background-size: 37px 38px;
  }
  .navbar.navbar-default {
    width: auto;
    padding-left: 5%;
  }
  .ban-top {
    display: flex;
    justify-content: space-between;
  }
}
.navbar-default .navbar-nav > li > a {
  color: #e2e1e1;
}
</style>
