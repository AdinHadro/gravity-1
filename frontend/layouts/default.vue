<template>
  <v-app class="v-application trampa-app">
    <div class="header" id="home">
      <div class="container">
        <div class="container-top1">
          <div class="mail-top-hearder">info@gravity.ba</div>

          <ul class="social-nav model-3d-0 footer-social w3_agile_social">
            <li>
              <a href="https://www.facebook.com/fashiontrampa/" class="facebook">
                <div class="front">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </div>
                <div class="back">
                  <i class="fa fa-facebook" aria-hidden="true"></i>
                </div>
              </a>
            </li>

            <li>
              <a href="https://www.instagram.com/fashiontrampa/" class="instagram">
                <div class="front">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </div>
                <div class="back">
                  <i class="fa fa-instagram" aria-hidden="true"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-bot">
      <!-- <div class="top-menu-main">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/o-nama">O nama</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/pravila-koristenja">Pravila korištenja</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/pomoc">Pomoć</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/oglasavanje">Oglašavanje</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contact">Kontakt</nuxt-link>
        </li>
      </div> -->

      <div class="header-bot_inner_wthreeinfo_header_mid">
        <nuxt-link to="/" class="logo_agile">
        <div class="logo-fix">
          <img src="~/assets/images/gravity-logo.png" style="max-height: 120px; margin-top:-16px; margin-right:145px" alt /> 
        </div>
        </nuxt-link>

        <div class="header-middle d-none d-md-block">
          <div class="search-box">
            <input
              type="search"
              name="search"
              placeholder="Pretraži..."
              v-model="searchText"
              v-on:keyup.enter="goToSearch"
            />
            <input type="button" value=" " v-on:click="goToSearch" />
          </div>
        </div>

        <!-- <div class="user-options">
          <div class="register_button">
            <Register v-if="!user.id" />
          </div>
          <div class="login-button1">
            <Login v-if="!user.id" />
          </div>
          <div class="logged-in" v-if="user.id">
            <div class="profile-menu text-center">
              <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y>
                <template v-slot:activator="{ on }">
                  <i v-on="on" class="fa fa-user" aria-hidden="true"></i>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <div class="avatar-edit">
                          <avatar :user="user" />
                        </div>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{ user.username }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <div class="btn123">
                    <button
                      v-on:click="$router.replace({path: '/produkt/objava'})"
                      type="button"
                      class="white--text v-btn v-btn--flat v-btn--text theme--light v-size--default grey--text text--accent-4"
                    >Objavi novi artikal</button>
                  </div>

                  <div class="btn123">
                    <button
                      v-on:click="logout({ $apolloHelpers })"
                      type="button"
                      class="white--text v-btn v-btn--flat v-btn--text theme--light v-size--default grey--text text--accent-4"
                    >Odjava</button>
                  </div>
                </v-card>
              </v-menu>

              <div v-on:click="$router.replace({path: '/poruke'})">
                <i class="fa fa-comments-o" aria-hidden="true"></i>
              </div>

              <div v-on:click="$router.replace({path: '/produkt/objava'})">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div> -->

        <div class="clearfix"></div>
      </div>
    </div>

    <Menu />
    <div class="container">
      <adsbygoogle ad-slot="3734586839" data-ad-format="auto" />
    </div>

    <div class="page-wrapper">
      <nuxt />
    </div>

    <div class="footer">
      <div class="footer-right">
        <div class="top-menu-main-mobile">
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/o-nama">O nama</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/pravila-koristenja">Pravila korištenja</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/pomoc">Pomoć</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/oglasavanje">Oglašavanje</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/contact">Kontakt</nuxt-link>
          </li>
        </div>
        <div class="footer_agile_inner_info_w3l">
          <div class="footer-left">
            <h2>
              <a href="/">
                <span>P</span>osjetite nas na društvenim mrežama
              </a>
            </h2>
            <p></p>
            <ul class="social-nav model-3d-0 footer-social w3_agile_social two">
              <li>
                <a href="https://www.facebook.com/fashiontrampa/" class="facebook">
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
                <a href="https://www.instagram.com/fashiontrampa/" class="instagram">
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
            </ul>
          </div>
          <div class="sign-grds">
            <div class="sign-gd-two">
              <h4>
                KONTAKTIRAJTE
                <span>nas</span>
              </h4>
              <div class="w3-address">
                <div class="w3-address-grid">
                  <div class="w3-address-left">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                  </div>
                  <div class="w3-address-right">
                    <h6>Broj telefona</h6>
                    <p>+387 62 257 336</p>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="clearfix"></div>
                <div class="w3-address-grid">
                  <div class="w3-address-left">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                  </div>
                  <div class="w3-address-right">
                    <h6>Email Adresa</h6>
                    <p>Email : trampa@fashiontrampa.ba</p>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="w3-address-grid">
                  <div class="w3-address-left">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                  </div>
                  <div class="w3-address-right">
                    <h6>Lokacija</h6>
                    <p>Bosna i Hercegovina 71000, Sarajevo</p>
                  </div>
                  <div class="clearfix"></div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="credits">
          <h1>Design & Development by <a href="https://www.linkedin.com/in/adin-hadrovic-69bb708a/"> A | H </a></h1>
                    
           </div>

      </div>
    </div>
    <ResetPassword v-if="hasResetPasswordToken" />
  </v-app>
</template>

<script>
import Cookies from "js-cookie";
import { mapMutations } from "vuex";
import Menu from "~/components/Menu.vue";
import Login from "~/components/Login.vue";
import Register from "~/components/Register.vue";
import ResetPassword from "~/components/ResetPassword.vue";
import Avatar from "~/components/Avatar.vue";

export default {
  components: {
    Menu,
    Login,
    Register,
    ResetPassword,
    Avatar
  },
  data() {
    return {
      searchText: "",
      fav: true,
      menu: false,
      message: false,
      hints: true,
      hasResetPasswordToken: false
    };
  },
  created() {
    const jwt = Cookies.get("jwt");
    const userCookie = Cookies.get("user");
    if ((!jwt && userCookie) || (jwt && !userCookie)) {
      this.logout({ $apolloHelpers: this.$apolloHelpers });
      document.location.href = "";
    }
    if (this.$route.query.code) {
      this.hasResetPasswordToken = true;
    }
  },
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    ...mapMutations({
      logout: "auth/logout"
    }),
    goToSearch() {
      this.$router.push({
        path: "/pretraga",
        query: {
          text: this.searchText
        }
      });
    }
  }
};
</script>  

<style scoped lang="scss">
.v-card.v-sheet.theme--light {
  z-index: 99;
}

.v-list-item__title {
  margin-left: 22px;
  margin-top: 10px;
  font-size: 15pt;
  font-style: normal;
  font-family: cursive;
  color: grey;
}

.avatar-edit {
  cursor: pointer;
  margin: 2px 0 0 30px;
}

.btn123 {
  color: teal;
  padding-right: 19px;
  margin-left: 5px;
}

.logged-in {
  min-width: -webkit-fill-available;
}
.col-md-4.bootstrap-tab-text-grid-left {
  min-height: 95px;
}

.col-md-4.user-name-btn {
  margin-left: 29px;
}

.profile-menu {
  display: flex;

  z-index: 2;
  &:hover {
    cursor: pointer;
  }
  i {
    &:hover {
      color: #c89865;
    }

    margin-left: 30px;
    font-size: 50px;
    color: teal;
  }
}
</style>


