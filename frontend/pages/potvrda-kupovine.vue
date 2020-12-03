<template>
  <div>
    <v-text-field v-model="ime"> </v-text-field>
    <v-text-field v-model="prezime"> </v-text-field>
    <v-text-field v-model="telefon"> </v-text-field>
    <v-text-field v-model="email"> </v-text-field>
    <v-text-field v-model="adresa"> </v-text-field>
    <div v-for="product in productiIzKorpe" :key="product.id">
      {{ product.Name }}
    </div>
    <v-btn @click="orderFinal">Završi kupovinu</v-btn>
  </div>
</template>

<script>
import orderMutation from '~/apollo/mutations/order/createOrder.gql'

export default {
  data() {
    return {
      ime: '',
      prezime: '',
      telefon: '',
      email: '',
      adresa: '',
      productiIzKorpe: '',
    }
  },
  created() {
    const korpa = this.$auth.$storage.getLocalStorage('basket') || { products: [] }
    this.productiIzKorpe = korpa.products
  },
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
            products: this.productiIzKorpe.map((x) => x.id),
          },
        },
      })
    },
  },
}
</script>
