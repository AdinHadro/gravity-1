<template>
  <div v-if="product.id">
    <div class="page-head_agile_info_w3l">
      <div class="container">
        <h3>
          <span>{{ product.name }}</span>
        </h3>
      </div>
    </div>
    <div class="banner-bootom-w3-agileits">
      <div class="container">
        <div class="divid-two-divs"></div>
        <div class="central-single-product">
          <div class="col-md-4 single-right-left-leva">
            

            

            <div class="how-to-order" style="padding:10px;">
              <h3 style="padding:10px;">
                Kako naručiti ?
              </h3>
              <v-divider></v-divider>

              <div class="info-part" style="padding:10px;">
                <h5 style="padding:10px;">
                  Nakon što željene artikle dodate u korpu, unesite svoje ime i prezime, adresu (ulicu i grad) i broj
                  telefona.
                </h5>
                <div class="step-1"> 
                  <h1>1.</h1> 
                   <img
                  src="~/assets/images/narudzba1.png"
                  style="max-width:140px; max-height:140px;"
                /></div>
               
              </div>
            </div>
          </div>

          <div class="col-md-4 single-right-left">
            <div class="grid images_3_of_2">
              <!-- <div class="flexslider">
              <ul class="slides">
                <li
                  v-for="(image, index) in product.images"
                  v-bind:key="index"
                  :data-thumb="image.url"
                >
                  <div class="thumb-image">
                    <img :src="image.url" data-imagezoom="true" class="img-responsive" />
                  </div>
                </li>
              </ul>
              <div class="clearfix"></div>
            </div> -->
              <template>
                <v-carousel>
                  <v-carousel-item
                    v-for="(image, index) in product.images"
                    :key="index"
                    :src="image.url"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  ></v-carousel-item>
                </v-carousel>
              </template>
            </div>
          </div>
          <div class="col-md-4 single-right-left-desna">
            <div class="product-name">
              <h3>{{ product.name }}</h3>
            </div>

            <div class="description">
              <h5>{{ product.description }}</h5>
            </div>

            <div class="product-price">
              <h2>
                Cijena:
                <span class="item_price">{{ product.price }} KM</span>
              </h2>
              <div class="button-buy">
                <template>
                  <div class="text-center">
                    <v-btn rounded color="sucess" dark>
                      Kupi artikal
                    </v-btn>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- <div class="col-md-8 single-right-left simpleCart_shelfItem">
          <h3>{{product.name}}</h3>
          <v-btn
            class="button-delete"
            v-if="user.id && user.id==product.user.id"
            v-on:click="deleteProduct"
          >IZBRIŠI ARTIKAL</v-btn>
          <p>
            <span class="item_price">{{product.price}} KM</span>
          </p>
          <div class="rating1">
            <span class="starRating">
              <input id="rating5" type="radio" name="rating" value="5" />
              <label for="rating5">5</label>
              <input id="rating4" type="radio" name="rating" value="4" />
              <label for="rating4">4</label>
              <input id="rating3" type="radio" name="rating" value="3" checked />
              <label for="rating3">3</label>
              <input id="rating2" type="radio" name="rating" value="2" />
              <label for="rating2">2</label>
              <input id="rating1" type="radio" name="rating" value="1" />
              <label for="rating1">1</label>
            </span>
          </div>
          <div class="description">
            <h5>{{ product.description }}</h5>
          </div>

          <div class="col-md-6 occasional">
            <h5>Specifikacije artikla :</h5>
            <p>Boja</p>
            <li v-for="color in product.colors" v-bind:key="'color' + color.id">{{ color.name }}</li>
            <p>Brend</p>
            <li v-for="brand in product.brands" v-bind:key="'brand' + brand.id">{{brand.name}}</li>
            <p>Veličina</p>
            <li v-for="size in product.sizes" v-bind:key="'size' + size.id">{{size.name}}</li>
            <p>Stanje</p>
            <li>{{ product.condition && product.condition.name }}</li>
            <p>Tagovi</p>
            <li v-for="taggy in product.tags" v-bind:key="'tag' + taggy.id">{{taggy.name}}</li>
            <p> Grad </p>
            <li> {{product.city && product.city.name}} </li>




            <div class="clearfix"></div>
          </div>
             </div> -->

          <!-- <div class="col-md-6 responsive_tabs_agileits">
            <div id="horizontalTab">
              <div class="msg-design">
                <h1>Pošalji poruku</h1>
              </div>
              <div class="send-msg">
                <div class="resp-tabs-container">
                  <div class="tab2">
                    <div class="single_page_agile_its_w3ls">
                      <div class="bootstrap-tab-text-grids">
                        <div class="bootstrap-tab-text-grid">
                          <div class="avatar-edit-2">
                            <avatar :user="product.user" />
                          </div>

                          <div class="user-name">
                            <h5>Korisničko ime: {{ product.user.username }}</h5>
                          </div>
                        </div>
                        <div class="not-logged-in" v-if="!user.id">
                          <h1>Da bi bili u mogućnosti da pošaljete poruku morate biti prijavljeni kao korisnik molimo Vas da izvršite prijavu.</h1>
                          <div class="button-login">
                            <Login />
                          </div>
                        </div>

                        <div class="logged-in-msg" v-if="user.id">
                          <div class="add-review">
                            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
                              <v-textarea
                                v-model="messageText"
                                placeholder="Poruka"
                                v-on:keyup.enter="sendMessage"
                                :rules="[rules.max]"
                              ></v-textarea>

                              <div class="button1">
                                <v-btn color="success" class="mr-4" @click="sendMessage">
                                  <v-icon>mdi-send</v-icon>
                                </v-btn>
                              </div>
                            </v-form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- <ul class="social-nav model-3d-0 footer-social w3_agile_social single_page_w3ls">
            <li class="share">Share On :</li>
            <li>
              <a href="#" class="facebook">
                <div class="front">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </div>
                <div class="back">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="twitter">
                <div class="front">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </div>
                <div class="back">
                  <i class="fa fa-twitter" aria-hidden="true"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="instagram">
                <div class="front">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </div>
                <div class="back">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="pinterest">
                <div class="front">
                  <i class="fa fa-linkedin" aria-hidden="true"></i>
                </div>
                <div class="back">
                  <i class="fa fa-linkedin" aria-hidden="true"></i>
                </div>
              </a>
            </li>
          </ul> -->

          <div class="clearfix"></div>
        </div>
      </div>
    </div>

    <div class="divid-two-divs"></div>
  </div>
</template>

<script>
import Avatar from "~/components/Avatar.vue";
import productQuery from "~/apollo/queries/product/products.gql";
import strapi from "~/utils/Strapi";
import Login from "~/components/Login.vue";

export default {
  components: {
    Login,
    Avatar
  },
  data() {
    return {
      tabs: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

      length: 3,
      window: 0,

      breadcrumb: [{ name: "Pretraga" }],
      valid: true,
      rules: {
        max: v => !v || v.length <= 1000 || "Maksimalno 1000 karaktera"
      },
      messageText: "",
      product: { colors: [{}], images: [], condition: {}, user: {}, city: "" }
    };
  },
  watch: {
    product: function() {
      this.$nextTick(function() {
        $(".flexslider").flexslider({
          animation: "slide",
          controlNav: "thumbnails"
        });
      });
    }
  },
  methods: {
    async deleteProduct() {
      await strapi.deleteEntry("products", this.product.id);
      this.$router.replace({ path: "/" });
    },
    async sendMessage() {
      if (
        this.$refs.form.validate() &&
        this.messageText &&
        this.messageText.length
      ) {
        let res = await strapi.createEntry("messages", {
          fromUser: this.user.id,
          toUser: this.product.user.id,
          text: this.messageText
        });
      }

      this.$router.replace({
        path: "/poruke"
      });
    }
  },
  async created() {
    const res = await this.$apollo.query({
      query: productQuery,
      variables: { where: { id: this.$route.params.id } }
    });

    if (!res.data.products[0]) {
      this.$router.replace({ path: "/" });
      return;
    } else {
      this.product = res.data.products[0];
    }

    this.product.images.forEach(
      image => (image.url = process.env.CMS_URL + image.url)
    );
    this.product.userImage = process.env.CMS_URL + this.product.user.image.url;
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>

<style scoped>

.step-1 {display: flex;}
.step-1 h1 {
  padding-top: 20px;
      font-size: 70px;
    color: grey;}


#inspire > div > div > header {
  max-height: 64px !important;
}

#inspire > div > div > header > div > .v-toolbar__content {

  margin-bottom: -50px important;
}


.button-buy {
  padding-top: 15px;
}

.product-price {
  margin-left: 36%;
}

.product-name h3 {
  margin-left: 33%;
}
.divid-two-divs {
  background: transparent;
  min-height: 100px;
}

.button-delete {
  float: right;
}

.msg-design {
  text-align: center;
  background: #cd9865;
}

.msg-design h1 {
  font-size: 20px;
  padding: 20px;
  color: #4d4242;
}

.button-login {
  margin-left: 108px;
  margin-bottom: 15px;
}

.not-logged-in h1 {
  text-align: center;
  font-size: 14pt;
  font-style: normal;
  color: grey;
  padding: 33px;
}
.avatar-edit-2 {
  margin-left: 40px;
}

.button1 v-btn {
  min-width: 340px !important;
}

.v-application .success {
  background-color: #008080 !important;
  border-color: #4caf50 !important;
}

.send-msg {
  max-width: 100%;
}

.resp-tab-item.resp-tab-active {
  background: #cd9865;
  width: 92%;
  border-bottom: 4px solid #cd9865;
}

.resp-tab-item.resp-tab-active::before {
  border-top: 10px solid #cd9865;
}
.user-name {
  margin-left: 30px;
  padding-top: 24px;
}
</style>
