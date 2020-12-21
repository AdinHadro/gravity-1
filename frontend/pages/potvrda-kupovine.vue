<template>
  <div>
    <div class="page">
      <div class="kupovina">
        <h3>Lični podatci za dostavu (Molimo vas da unesete tačne podatke)</h3>
      </div>
      <h5>Upišite Vaše ime</h5>
      <v-text-field v-model="ime"> </v-text-field>
      <h5>Upišite Vaše prezime</h5>
      <v-text-field v-model="prezime"> </v-text-field>
      <h5>Upišite Vašu broj telefona</h5>
      <v-text-field v-model="telefon"> </v-text-field>
      <h5>
        Upišite Vaše tačnu adresu u formatu Grad, Poštanski broj, Broj ulice,
        ukoliko živite u okolnim naseljima molimo Vas da naznačite o kojem se
        gradu radi.
      </h5>
      <v-text-field v-model="adresa"> </v-text-field>
      <h5>Ukoliko želite kopiju narudžbe na e-mail molimo upišite ga</h5>
      <v-text-field v-model="email"> </v-text-field>

      <div v-for="(product, index) in products" :key="index">
        {{ product.name }}
      </div>
      <v-btn
        style="margin-bottom:100px"
        rounded
        color="sucess"
        dark
        @click="orderFinal"
        >Završi kupovinu
      </v-btn>
    </div>

    <h3>Pogledajte artikle koje naručujete</h3>
    <div class="kupovina-produkti-style">
      <div
        class="kupovina-produkti"
        v-for="(product, index) in products"
        :key="index"
      >
        <img
          :src="product.images[0].url"
          style="width:200px; height:200px; padding-left:10px;"
        />
        <h1
          style="font-size: 15pt;
    float: right;"
        >
          {{ product.price }} KM
        </h1>
        <h1
          style="font-size: 15pt;
    border-bottom: 1pt solid;"
        >
          {{ product.name }}
        </h1>
      </div>

      <v-btn rounded color="sucess" dark>
        Potvrdi kupovinu
      </v-btn>
    </div>
  </div>
</template>

<script>
import orderMutation from "~/apollo/mutations/order/createOrder.gql";

export default {
  data() {
    return {
      ime: "",
      prezime: "",
      telefon: "",
      adresa: "",
      email: ""
    };
  },
  computed: {
    products() {
      return this.$store.getters["cart/products"];
    }
  },
  created() {},

  methods: {
    orderFinal() {
      this.$apollo.mutate({
        mutation: orderMutation,
        variables: {
          data: {
            Ime: this.ime,
            Prezime: this.prezime,
            Telefon: this.telefon,
            Email: this.email,
            Adresa: this.adresa,
            OrderProducts: this.products.map(x => {
              return { product: x.id, size: x.selectedSize.id };
            })
          }
        }
      });
    }
  }
};
</script>
