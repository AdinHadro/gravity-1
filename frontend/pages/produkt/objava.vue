<template>
  <div v-if="user" class="banner-bootom-w3-agileits product-publish">
    <div class="container">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Kreiranje produkta</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :rules="[rules.required, rules.min]"
              label="Naziv"
              required
            ></v-text-field>
            <v-textarea v-model="description" label="Opis" outlined></v-textarea>
            <v-text-field
              type="number"
              v-model="price"
              :rules="[rules.required]"
              label="Cijena"
              required
            ></v-text-field>
            <label class="category-select-label">Izaberite jednu ili više kategorija:</label>
            <v-treeview
              selectable
              hoverable
              activatable
              rounded
              dense
              selected-color="#cd9865"
              :items="filters.categories"
              v-model="categories"
              item-children="subCategories"
              item-key="id"
              item-text="name"
            ></v-treeview>
            <v-autocomplete
              v-model="city"
              :items="filters.cities"
              :rules="[rules.oneSelection]"
              item-text="name"
              item-value="id"
              label="Izaberite grad"
              chips
              persistent-hint
              autocomplete="false"
            ></v-autocomplete>
            <v-autocomplete
              v-model="condition"
              :items="filters.conditions"
              :rules="[rules.oneSelection]"
              item-text="name"
              item-value="id"
              label="Izaberite stanje"
              chips
              persistent-hint
              autocomplete="false"
            ></v-autocomplete>
            <v-autocomplete
              v-model="colors"
              :items="filters.colors"
              item-text="name"
              item-value="id"
              label="Izaberite boje"
              multiple
              chips
              persistent-hint
              autocomplete="false"
            ></v-autocomplete>
            <v-combobox
              v-model="brands"
              :items="filters.brands"
              :rules="[rules.oneSelection]"
              item-text="name"
              item-value="id"
              label="Izaberite brendove"
              multiple
              chips
              persistent-hint
              autocomplete="false"
            ></v-combobox>
            <v-autocomplete
              v-model="sizes"
              :items="filters.sizes"
              :rules="[rules.oneSelection]"
              item-text="name"
              item-value="id"
              label="Izaberite veličine"
              multiple
              chips
              persistent-hint
              autocomplete="false"
            ></v-autocomplete>
            <v-autocomplete
              v-model="materials"
              :items="filters.materials"
              item-text="name"
              item-value="id"
              label="Izaberite materijale"
              multiple
              chips
              persistent-hint
              autocomplete="false"
            ></v-autocomplete>
            <v-autocomplete
              v-model="tags"
              :items="filters.tags"
              item-text="name"
              item-value="id"
              label="Izaberite dodatne oznake"
              multiple
              chips
              persistent-hint
            ></v-autocomplete>
            <v-file-input
              label="Slike"
              accept="image/*"
              v-model="images"
              required
              :rules="[
                rules.requiredImage,
                rules.imageUploadLimit,
                rules.imagesLengthLimit
              ]"
              multiple
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid || loading"
            color="success"
            class="mr-4"
            @click="publish"
            x-large
          >
            <v-progress-circular v-if="loading" indeterminate color="white"></v-progress-circular>
            <span class="btn-free-text" v-if="!loading">Objavi produkt</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog persistent v-model="dialog" max-width="450px">
      <v-card>
        <v-card-title class="headline">Produkt uspješno objavljen</v-card-title>

        <v-card-text>Klik na OK će vas odvesti na objavljeni artikal.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="goToProduct">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import filtersQuery from "~/apollo/queries/filter/filtersAndCategories";
import strapi from "~/utils/Strapi";

export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      images: [],
      categories: [],
      colors: [],
      brands: [],
      materials: [],
      tags: [],
      sizes: [],
      condition: "",
      city: "",
      filters: {
        colors: [],
        conditions: [],
        brands: [],
        sizes: [],
        materials: [],
        tags: [],
        categories: [],
        cities: []
      },
      valid: true,
      loading: false,
      dialog: false,
      productId: "",
      rules: {
        required: value => !!value || "Obavezno.",
        min: v => (v && v.length >= 3) || "Minimalno 3 karaktera",
        oneSelection: v => (v && !!v.length) || "Obavezan odabir",
        requiredImage: files =>
          (files && files.length && files[0].size > 0) || "Slika je obavezna",
        imageUploadLimit: files =>
          (files && files.length && files.every(x => x.size <= 10000000)) ||
          "Slika je prevelika, maximalno 10MB",
        imagesLengthLimit: files =>
          (files && files.length < 6) || "Samo 5 slika je dozvoljeno"
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  async created() {
    if (this.redirectIfNotLoggedIn()) this.loadFilters();
  },
  watch: {
    user(newUser, oldUser) {
      this.redirectIfNotLoggedIn();
    }
  },
  methods: {
    redirectIfNotLoggedIn() {
      if (!this.user.id) {
        this.$router.replace({
          path: "/"
        });
      }
      return !!this.user.id;
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
      this.filters.categories.forEach(
        x => (x.disabled = !x.subCategories.length)
      );
    },
    async publish() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        const existingBrands = this.brands.filter(brand => brand.id);
        const newBrandNames = this.brands.filter(brand => !brand.id);
        const brandPromises = newBrandNames.map(brandName =>
          Promise.resolve(
            strapi
              .createEntry("brands", { name: brandName })
              .then(createdBrand => {
                existingBrands.push(createdBrand);
              })
          )
        );
        Promise.all(brandPromises).then(async () => {
          const res = await strapi.createEntry("products", {
            user: this.user.id,
            name: this.name,
            description: this.description,
            price: this.price,
            categories: this.getCategoriesPath(),
            condition: this.condition,
            brands: existingBrands,
            colors: this.colors,
            materials: this.materials,
            sizes: this.sizes,
            colors: this.colors,
            tags: this.tags,
            city: this.city
          });
          this.productId = res.id;

          await this.uploadImages();
          this.loading = false;
          this.dialog = true;
        });
      }
    },
    goToProduct() {
      this.dialog = false;
      this.$router.replace({
        path: `/produkt/${this.productId}`
      });
    },
    async uploadImages() {
      for (let i = 0; i < this.images.length; i++) {
        const imageExt = this.images[i].name.split(".").pop();
        const form = new FormData();
        form.append(
          "files",
          this.images[i],
          `product_${this.productId}_${i}.${imageExt}`
        );
        form.append("refId", this.productId);
        form.append("ref", "product");
        form.append("field", "images");

        try {
          const files = await strapi.upload(form);
        } catch (err) {
          console.log(err);
        }
      }
    },
    getCategoriesPath() {
      let path = [];

      this.categories.forEach(cat => {
        this.filters.categories.forEach(x => {
          x.subCategories.forEach(y => {
            y.subCategories.forEach(z => {
              if (z.id == cat) path = path.concat([x.id, y.id, z.id]);
            });
            if (y.id == cat) path = path.concat([x.id, y.id]);
          });
          if (x.id == cat) path = path.concat([x.id]);
        });
      });

      return path;
    }
  }
};
</script>
<style lang="scss">
.product-publish {
  .v-autocomplete {
    width: 85%;
  }
  .v-card__text {
    padding: 0 5%;
  }
  .v-treeview {
    border: 1px solid #c3c2c2;
    border-radius: 4px;
    width: 60%;
   
    .v-treeview-node__root {
      margin: 0;
    }
  }
  i.v-treeview-node__toggle + i.v-treeview-node__checkbox {
    display: none;
  }
  .category-select-label {
    margin-top: 20px;
  }
}
</style>
