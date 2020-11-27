<template>
  <div>
    <div
      class="page-head_agile_info_w3l"
      v-bind:style="topCategoryImage ? { 'background-image': 'url(' + topCategoryImage + ')' } : ''"
    >
      <div class="container">
        <h3>
          {{breadcrumb[breadcrumb.length - 1].name}}
          <span>Kategorija</span>
        </h3>
        <div class="services-breadcrumb">
          <div class="agile_inner_breadcrumb">
            <ul class="w3_short">
              <li>
                <nuxt-link to="/">Početna</nuxt-link>
              </li>
              <li v-for="crumb in breadcrumb" v-bind:key="crumb.id">
                <i>|</i>
                {{ crumb.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="banner-bootom-w3-agileits">
      <div class="container">
        <div class="left-colum">
          <div class="col-md-4 products-left">
            <div class="filter-price">
              <h3>
                Filtriraj po
                <span>Cijeni</span>
              </h3>

              <ul class="dropdown-menu6">
                <li>
                  <div id="slider-range"></div>
                  <div class="range-inputs">
                    <input v-model="priceFrom" v-on:keyup="search()" type="number" id="amount1" />
                    <label>KM</label>
                    <span>-</span>
                    <input v-model="priceTo" v-on:keyup="search()" type="number" id="amount2" />
                    <label>KM</label>
                  </div>
                </li>
              </ul>
            </div>
            <div class="community-poll">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Grad</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="checks">
                      <v-checkbox
                        :label="item.name"
                        :value="item.id"
                        v-model="cities"
                        v-on:change="search"
                        v-for="item in filters.cities"
                        v-bind:key="item.id"
                      ></v-checkbox>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <div class="community-poll">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Stanje</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="checks">
                      <v-checkbox
                        :label="item.name"
                        :value="item.id"
                        v-model="conditions"
                        v-on:change="search"
                        v-for="item in filters.conditions"
                        v-bind:key="item.id"
                      ></v-checkbox>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <div class="community-poll">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Brend</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="checks">
                      <v-checkbox
                        :label="item.name"
                        :value="item.id"
                        v-model="brands"
                        v-on:change="search"
                        v-for="item in filters.brands"
                        v-bind:key="item.id"
                      ></v-checkbox>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>

            <div class="community-poll">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Veličina</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="checks">
                      <v-checkbox
                        :label="item.name"
                        :value="item.id"
                        v-model="sizes"
                        v-on:change="search"
                        v-for="item in filters.sizes"
                        v-bind:key="item.id"
                      ></v-checkbox>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>

            <div class="community-poll">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Boja</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="checks">
                      <v-checkbox
                        :label="item.name"
                        :value="item.id"
                        v-model="colors"
                        v-on:change="search"
                        v-for="item in filters.colors"
                        v-bind:key="item.id"
                      ></v-checkbox>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>

            <div class="community-poll">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>MAterijal</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="checks">
                      <v-checkbox
                        :label="item.name"
                        :value="item.id"
                        v-model="materials"
                        v-on:change="search"
                        v-for="item in filters.materials"
                        v-bind:key="item.id"
                      ></v-checkbox>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>

            <div class="community-poll">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>Ostali tagovi</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="checks">
                      <v-checkbox
                        :label="item.name"
                        :value="item.id"
                        v-model="tags"
                        v-on:change="search"
                        v-for="item in filters.tags"
                        v-bind:key="item.id"
                      ></v-checkbox>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="col-md-8 products-right">
          <h5>
            Produkti
            <span>Pretraga ({{ productCount }})</span>
          </h5>
          <div class="sort-grid">
            <div class="sorting">
              <h6>Poredaj po:</h6>
              <select v-model="orderBy" v-on:change="search">
                <option value="created_at:DESC">Najnoviji</option>
                <option value="price:ASC">Cijena(Jeftiniji - Skuplji)</option>
                <option value="price:DESC">Cijena(Skuplji - Jeftiniji)</option>
                <option value="name:ASC">Naziv(A - Z)</option>
                <option value="name:DESC">Naziv(Z - A)</option>
              </select>
              <div class="clearfix"></div>
            </div>
            <div class="sorting">
              <h6>Prikaži:</h6>
              <select v-model="pageSize" v-on:change="search">
                <option value="21">21</option>
                <option value="51">51</option>
                <option value="99">99</option>
              </select>
              <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div v-if="!loading">
            <div v-for="product in products" v-bind:key="product.id">
              <Product :product="product" :size="4" />
            </div>
            <div class="clearfix"></div>
            <div class="row pagination-wrapper" v-if="productCount > 0">
              <v-pagination v-model="page" :length="pageLength" :total-visible="6"></v-pagination>
            </div>
            <div class="no-results" v-if="productCount === 0">
              <h2>Nema produkata za trazene pretrage. Izaberite drugu kategoriju ili promijenite uslove pretrage.</h2>
            </div>
          </div>
          <div class="loader" v-if="loading">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filtersQuery from "~/apollo/queries/filter/filters";
import categoriesQuery from "~/apollo/queries/category/categoriesByUrl";
import productsQuery from "~/apollo/queries/product/products";
import productCountQuery from "~/apollo/queries/product/productCount";
import Product from "../components/Product";

export default {
  components: {
    Product
  },
  data() {
    return {
      loading: true,
      topCategoryImage: "",
      breadcrumb: [{ name: "Pretraga" }],
      products: [],
      productCount: 0,
      pageSize: 21,
      page: 1,
      pageLength: 1,
      filters: {
        colors: [],
        conditions: [],
        brands: [],
        sizes: [],
        materials: [],
        tags: [],
        cities: []
      },
      priceFrom: null,
      priceTo: null,
      orderBy: "created_at:DESC",
      colors: [],
      conditions: [],
      brands: [],
      sizes: [],
      materials: [],
      tags: [],
      cities: [],
      searchText: this.$route.query.text
    };
  },
  async created() {
    this.loadFilters();
    await this.loadCategory();
    this.loadProducts(true);
  },
  watch: {
    page(val) {
      this.search(false);
    }
    // products: function() {
    //   this.$nextTick(function() {
    //     const that = this;
    //     $("#slider-range").slider({
    //       range: true,
    //       min: 0,
    //       max: 500,
    //       values: [0, 100],
    //       slide: function(event, ui) {
    //         that.priceFrom = ui.values[0];
    //         that.priceTo = ui.values[1];
    //       },
    //       stop: function(event, ui) {
    //         that.search();
    //       }
    //     });
    //   });
    // }
  },

  mounted() {},
  methods: {
    search(reset = true) {
      if (reset) this.page = 1;

      this.loadProducts(reset);
    },
    async loadCategory() {
      const req = {
        query: categoriesQuery,
        variables: {
          where: {
            url: this.$route.path.toLowerCase()
          }
        }
      };

      const categories = (await this.$apollo.query(req)).data.categories;
      if (categories.length) {
        this.category = categories[0];
        this.breadcrumb = [];
        if (this.category.parentCategory) {
          if (this.category.parentCategory.parentCategory) {
            this.breadcrumb.push(this.category.parentCategory.parentCategory);
          }
          this.breadcrumb.push(this.category.parentCategory);
        }
        this.breadcrumb.push(this.category);

        this.topCategoryImage = this.breadcrumb[0].image
          ? process.env.CMS_URL + this.breadcrumb[0].image.url
          : this.topCategoryImage;
      }
    },
    async loadFilters() {
      const req = {
        query: filtersQuery,
        variables: {
          where: {
            _sort: "name:ASC"
          }
        }
      };

      this.filters = (await this.$apollo.query(req)).data;
    },
    async loadProducts(getCount = true) {
      this.loading = true;
      let variables = {};

      if (this.category) variables.categories_in = [this.category.id];
      if (this.searchText) variables.name_contains = this.searchText;
      if (this.priceFrom) variables.price_gte = this.priceFrom;
      if (this.priceTo) variables.price_lte = this.priceTo;
      if (this.colors.length) variables.colors_in = this.colors;
      if (this.conditions.length) variables.condition_in = this.conditions;
      if (this.brands.length) variables.brands_in = this.brands;
      if (this.sizes.length) variables.sizes_in = this.sizes;
      if (this.materials.length) variables.materials_in = this.materials;
      if (this.tags.length) variables.tags_in = this.tags;
      if (this.cities.length) variables.city_in = this.cities;
      variables._sort = this.orderBy;

      const req = {
        query: productsQuery,
        variables: {
          where: variables,
          limit: +this.pageSize,
          start: (this.page - 1) * +this.pageSize
        }
      };

      if (getCount) {
        this.loadProductCount(variables);
      }

      this.products = (await this.$apollo.query(req)).data.products;
      this.loading = false;
    },
    async loadProductCount(variables) {
      const req = {
        query: productCountQuery,
        variables: {
          where: variables
        }
      };
      const count = (await this.$apollo.query(req)).data.products.length;
      this.pageLength = Math.ceil(count / this.pageSize);
      this.productCount = count;
    }
  }
};
</script>

<style scoped>
.v-expansion-panel-header {
  color: #2fdab8;
  text-align: center;
  background: #f7f7f7;
  font-size: 1.2em;
  font-weight: 700;
  border-bottom: 1px solid #d2d2d2;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>