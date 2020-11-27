<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <div class="register-button-1">
          <v-btn class="button1234" text v-on="on">
            <i class="fa fa-user-plus" aria-hidden="true"></i>
            &nbsp; Promjena šifre
          </v-btn>
        </div>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Promjena šifre</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.max]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Nova šifra"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :rules="[rules.required, rules.min, rules.max, rules.passwordsMatch]"
              type="password"
              name="input-10-1"
              label="Potvrdi novu šifru"
              required
            ></v-text-field>
            <v-btn :disabled="!valid || loading" color="success" class="mr-4" @click="validate">
              <v-progress-circular v-if="loading" indeterminate color="white"></v-progress-circular>
              <span class="btn-free-text" v-if="!loading">Promijeni</span>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-bottom-sheet v-model="confirmSheet" persistent>
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          color="error"
          @click="confirmSheet = !confirmSheet; $router.replace({ path: '/' });"
        >Zatvori</v-btn>
        <div class="py-3">Šifra uspješno promijenjena. Sada se možete prijaviti sa novom šifrom.</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
import strapi from "~/utils/Strapi";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      password: "",
      confirmPassword: "",
      rules: {
        required: value => !!value || "Obavezno.",
        min: v => (v && v.length >= 3) || "Minimalno 3 karaktera",
        max: v => !v || v.length <= 20 || "Maksimalno 20 karaktera",
        passwordsMatch: () =>
          this.password === this.confirmPassword || "Šifre se ne podudaraju"
      },
      showPassword: false,
      dialog: true,
      confirmSheet: false
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        try {
          const response = await strapi.resetPassword(
            this.$route.query.code,
            this.password,
            this.confirmPassword
          );

          this.confirmSheet = true;
        } catch (err) {
          alert(
            "Došlo je do greške, pošaljite mail na trampa@fashiontrampa.ba"
          );
        }

        this.loading = false;
        this.dialog = false;
      }
    }
  }
};
</script>