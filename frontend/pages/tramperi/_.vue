<template>
  <div class="container">
    <div class="col-md-5 user-infos">
      <avatar :user="userProfile" size="big" />

      <h1>Korisničko ime: {{ userProfile.username }}</h1>

      <div class="logged-in" v-if="user.id">
        <div class="popup">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
              <v-btn class="button1234" text v-on="on">
                <i class="fa fa-exclamation-triangle" aria-hidden="true"></i> &nbsp; Prijavi Korisnika
              </v-btn>
            </template>

            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >Prijavi korisnika za zloupotrebu profila</v-card-title>

              <v-card-text>
                <p>
                  Vaša prijava se šalje direktno timu administratora fashiontrampa.ba, ista će biti provjerena te ukoliko se otkrije kršenje pravila korištena
                  korisnik će automatski biti banovan a njegovi artikli izbrisani, Vaš fashiontrampa team.
                </p>
                <div class="add-review">
                  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
                    <v-textarea
                      v-model="messageText"
                      placeholder="Poruka"
                      v-on:keyup.enter="sendMessage"
                      :rules="[rules.max]"
                    ></v-textarea>

                    <div class="button11">
                      <v-btn color="success" class="mr-4" @click="sendMessage">
                        <v-icon>mdi-send</v-icon>
                      </v-btn>
                    </div>
                  </v-form>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

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
                      <avatar :user="userProfile" />
                    </div>

                    <div class="user-name">
                      <h5>Korisničko ime: {{ userProfile.username }}</h5>
                    </div>
                  </div>
                  <div class="not-logged-in" v-if="!user.id">
                    <h3>
                      Da bi bili u mogućnosti da pošaljete poruku morate biti
                      prijavljeni kao korisnik moloimo Vas da izvršite prijavu.
                    </h3>
                    <div class="button-login">
                      <Login />
                    </div>
                  </div>

                  <div class="logged-in-msg" v-if="user.id">
                    <div class="add-review">
                      <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
                        <v-textarea
                          v-model="reportText"
                          placeholder="Poruka"
                          v-on:keyup.enter="sendMessage(true)"
                          :rules="[rules.max]"
                        ></v-textarea>

                        <div class="button11">
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
    </div>
    <div class="left-side">
      <div v-if="!loading">
        <h2>Svi objavljeni artikli od korisnika:</h2>
        <div v-for="product in products" v-bind:key="product.id">
          <Product :product="product" :size="2" />
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <div class="divid-two-divs">
        </div>
  </div>
</template>

<script>
import productsQuery from "~/apollo/queries/product/products";
import Product from "../../components/Product";
import Avatar from "~/components/Avatar.vue";
import userQuery from "~/apollo/queries/user/usersfull";
import Login from "~/components/Login.vue";
import strapi from "~/utils/Strapi";

export default {
  components: {
    Product,
    Avatar
  },
  data() {
    return {
      userProfile: {},
      loading: false,
      products: [],
      rules: {
        max: v => !v || v.length <= 1000 || "Maksimalno 1000 karaktera"
      },
      messageText: "",
      reportText: ""
    };
  },
  async created() {
    this.loadUser();
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const name = this.$route.path.toLowerCase().replace("/tramperi/", "");
      this.loading = true;
      const req = {
        query: productsQuery,
        variables: {
          where: {
            user: {
              username: name
            },
            _sort: "updated_at:DESC"
          },
          limit: 100,
          start: 0
        }
      };
      this.products = (await this.$apollo.query(req)).data.products;
      this.loading = false;
    },
    async loadUser() {
      const name = this.$route.path.toLowerCase().replace("/tramperi/", "");

      const req = {
        query: userQuery,
        variables: {
          where: {
            username: name
          }
        }
      };
      this.userProfile = (await this.$apollo.query(req)).data.users[0];
    },
    async sendMessage(isReport) {
      if (
        this.$refs.form.validate() &&
        this.messageText &&
        this.messageText.length
      ) {
        let res = await strapi.createEntry("messages", {
          fromUser: this.user.id,
          toUser: isReport ? 61 : this.userProfile.id,
          text: this.messageText
        });
      }

      this.$router.push({
        path: "/poruke"
      });
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  }
};
</script>

<style scoped>
.divid-two-divs { 
background: transparent;
min-height: 100px;
}

.button11 {
  padding-left: 200px;
}

p {
  margin-top: 10px;
  text-align: center;
  font-size: 12pt;
  word-wrap: break-word;
}

.left-side h2 {
  font-size: 20pt;
    font-style: normal;
    padding: 20px;
    color: grey;
  
}

.left-side {
  margin-top: 30px;
}

.user-infos h1 {
    font-size: 20pt;
    font-style: normal;
    
    color: grey;
    
    margin-top: 10px;
}
.user-infos {
  margin-top: 30px;
}

.popup {
  margin-top: 15px;
  margin-left: 45px;
}

#horizontalTab {
  max-width: 345px;
  margin-top: 20px;
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
  margin-left: 125px;
  margin-bottom: 15px;
}

.not-logged-in h3 {
  text-align: center;
  font-size: 15pt;
  font-style: normal;

  color: grey;
  padding: 23px;
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
