<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn class="button1234" text v-on="on">
          <i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp; Prijava
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Prijava</v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="identifier"
              label="Korisničko ime ili email"
              :rules="[rules.valid]"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.valid]"
              name="input-10-1"
              label="Šifra"
              @click:append="showPassword = !showPassword"
              v-on:keyup.enter="handleSubmit"
            ></v-text-field>
            <v-checkbox class="accept" v-model="rememberMe" label="Zapamti me?"></v-checkbox>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-dialog v-model="resetPasswordDialog" width="400">
            <template v-slot:activator="{ on }">
              <v-btn class="button1234" text v-on="on">
                <i class="fa fa-sign-in" aria-hidden="true"></i> &nbsp; Zaboravljena šifra
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Zaboravljena šifra</v-card-title>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field v-model="resetEmail" label="Email" :rules="[rules.email]"></v-text-field>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="loadingMail" color="success" class="mr-4" @click="forgotPassword">
                  <v-progress-circular v-if="loadingMail" indeterminate color="white"></v-progress-circular>
                  <span v-if="!loadingMail">Zaboravljena šifra?</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn :disabled="loading" color="success" class="mr-4" @click="handleSubmit">
            <v-progress-circular v-if="loading" indeterminate color="white"></v-progress-circular>
            <span v-if="!loading">Prijavi se</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-bottom-sheet v-model="confirmSheet">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" color="error" @click="confirmSheet = !confirmSheet">Zatvori</v-btn>
        <div
          class="py-3"
        >Link za promjenu šifre je poslan. Provjerite vaš email i kliknite na link u poruci.</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import strapi from "~/utils/Strapi";

export default {
  data() {
    return {
      identifier: "",
      password: "",
      resetEmail: "",
      rememberMe: true,
      loading: false,
      loadingMail: false,
      showPassword: false,
      dialog: false,
      resetPasswordDialog: false,
      valid: true,
      confirmSheet: false,
      rules: {
        valid: () => this.valid || "Pogrešan email/korisničko ime ili šifra",
        email: v => /.+@.+\..+/.test(v) || "E-mail mora biti tačan"
      }
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.valid = true;
        this.$refs.form.validate();
        this.loading = true;
        const response = await strapi.login(this.identifier, this.password);
        this.loading = false;
        this.setUser({
          user: response.user,
          rememberMe: this.rememberMe,
          $apolloHelpers: this.$apolloHelpers
        });
        this.dialog = false;
        this.valid = true;
      } catch (err) {
        this.valid = false;
        this.$refs.form.validate();
      }
      this.loading = false;
    },
    async forgotPassword() {
      if (this.$refs.form.validate()) {
        this.loadingMail = true;
        try {
          const response = await strapi.forgotPassword(
            this.resetEmail,
            window.location.href
          );
        } catch (error) {
          console.log(error);
        }

        this.loadingMail = false;
        this.resetPasswordDialog = false;
        this.dialog = false;
        this.confirmSheet = true;
      }
    },
    ...mapMutations({
      setUser: "auth/setUser"
    })
  }
};
</script>