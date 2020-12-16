<template>
  <div class="menu-wrapper">
    <v-treeview
      rounded
      hoverable
      activatable
      open-on-click
      :items="categories"
    ></v-treeview>

    <div class="ban-top">
      <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              v-on:click.stop="showMobMenu"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>

          <div
            class="collapse navbar-collapse visible-md visible-xl"
            id="bs-example-navbar-collapse-1"
            data-hover="dropdown"
            data-animations="fadeInDown fadeInRight fadeInUp fadeInLeft"
          >
            <ul class="nav navbar-nav">
              <li
                class="dropdown"
                v-for="category in categories"
                v-bind:key="category.id"
              >
                <nuxt-link
                  tag="a"
                  :to="category.url"
                  aria-expanded="false"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  exact
                >
                  {{ category.name }}
                  <span class="caret"></span>
                </nuxt-link>
                <ul class="dropdown-menu dropdownhover-bottom" role="menu">
                  <li
                    class="dropdown"
                    v-for="sub in category.subCategories"
                    v-bind:key="sub.id"
                  >
                    <nuxt-link
                      tag="a"
                      :to="sub.url"
                      aria-expanded="false"
                      exact
                    >
                      {{ sub.name }}
                      <span
                        v-if="sub.subCategories.length"
                        class="caret"
                      ></span>
                    </nuxt-link>
                    <ul class="dropdown-menu dropdownhover-right">
                      <li
                        v-for="subsub in sub.subCategories"
                        v-bind:key="subsub.id"
                      >
                        <nuxt-link tag="a" :to="subsub.url" exact>{{
                          subsub.name
                        }}</nuxt-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="search-box visible-xs">
        <v-text-field
          type="search"
          name="search"
          placeholder="Pretraži..."
          v-model="searchText"
          v-on:keyup.enter="goToSearch"
        />
        <input type="button" value=" " v-on:click="goToSearch" />
      </div>
    </div>
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
    margin-right: 5%;
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
