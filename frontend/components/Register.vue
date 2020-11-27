<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <div class="register-button-1">
          <v-btn class="button1234" text v-on="on">
            <i class="fa fa-user-plus" aria-hidden="true"></i>
            &nbsp; Registracija
          </v-btn>
        </div>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Registracija</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username.value"
              :rules="[rules.required, rules.min, rules.max, rules.word, rules.uniqueUsername]"
              label="Korisničko ime"
              @input="username.isValid = true"
              :loading="username.loading"
              :disabled="username.loading"
              required
            ></v-text-field>
            <v-text-field
              v-model="email.value"
              :rules="[rules.required, rules.email, rules.uniqueEmail]"
              :loading="email.loading"
              :disabled="email.loading"
              @input="email.isValid = true"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.max]"
              :type="showPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Šifra"
              required
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :rules="[rules.required, rules.min, rules.max, rules.passwordsMatch]"
              type="password"
              name="input-10-1"
              label="Potvrdi šifru"
              required
            ></v-text-field>
            <v-file-input
              label="Profilna slika"
              accept="image/*"
              v-model="profileImage"
              required
              :rules="[rules.requiredImage, rules.imageUploadLimit]"
            ></v-file-input>
            <v-checkbox
              class="accept"
              v-model="termsAccepted"
              :rules="[v => !!v || 'Morate potvrditi za nastavak!']"
              label="Prihvatate li uslove korištenja?"
              required
            ></v-checkbox>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid || loading" color="success" class="mr-4" @click="validate">
            <v-progress-circular v-if="loading" indeterminate color="white"></v-progress-circular>
            <span class="btn-free-text" v-if="!loading">Registracija</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import strapi from "~/utils/Strapi";
import usersQuery from "~/apollo/queries/user/users";

export default {
  data() {
    return {
      valid: true,
      profileImage: [],
      username: {
        value: "",
        isValid: true,
        loading: false
      },
      email: {
        value: "",
        isValid: true,
        loading: false
      },
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      loading: false,
      rules: {
        required: value => !!value || "Obavezno.",
        min: v => (v && v.length >= 3) || "Minimalno 3 karaktera",
        max: v => !v || v.length <= 20 || "Maksimalno 20 karaktera",
        email: v => /.+@.+\..+/.test(v) || "E-mail mora biti tačan",
        passwordsMatch: () =>
          this.password === this.confirmPassword || "Šifre se ne podudaraju",
        requiredImage: file => (file && file.size > 0) || "Slika je obavezna",
        imageUploadLimit: file =>
          (file && file.size <= 10000000) ||
          "Slika je prevelika, maximalno 10MB",
        uniqueUsername: () =>
          this.username.isValid || "Korisničko ime je zauzeto",
        uniqueEmail: () => this.email.isValid || "E-Mail je zauzet",
        word: v =>
          /^[\w]+$/.test(v) || "Dozovoljeni karakteri su slova, brojevi i _"
      },
      showPassword: false,
      dialog: false
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        await this.isUserUnique("username", this.username);
        await this.isUserUnique("email", this.email);

        if (!this.username.isValid || !this.email.isValid) {
          this.$refs.form.validate();
          this.loading = false;
          return;
        }

        let response = {};
        try {
          response = await strapi.register(
            this.username.value,
            this.email.value,
            this.password
          );

          this.setUser({
            user: response.user,
            rememberMe: true,
            $apolloHelpers: this.$apolloHelpers
          });

          await this.uploadImage(response.user.id);
        } catch (err) {
          console.log(err);
        }

        this.loading = false;
        this.dialog = false;
      }
    },
    async uploadImage(userId) {
      const imageExt = this.profileImage.name.split(".").pop();
      const form = new FormData();
      form.append("files", this.profileImage, `user_${userId}.${imageExt}`);
      form.append("refId", userId);
      form.append("ref", "user");
      form.append("source", "users-permissions");
      form.append("field", "image");

      try {
        const files = await strapi.upload(form);
      } catch (error) {
        console.log(error);
      }
    },
    async isUserUnique(field, obj, format) {
      if (obj.value) {
        const req = {
          query: usersQuery,
          variables: {
            where: {}
          }
        };

        req.variables.where[field] = obj.value;

        let users = (await this.$apollo.query(req)).data.users;

        obj.isValid = !users.length;
        return obj.isValid;
      }
      return false;
    },
    ...mapMutations({
      setUser: "auth/setUser"
    })
  }
};
</script> 

<style scopped>
.button1234 {
  color: #cd9865 !important;
}

.register-button-1 {
  max-width: 140px;
}
</style>