<template>
  <div>
    <div class="produckti" style="height:400px; width:300px;">
    </div>
    <v-text-field v-model="Ime"> </v-text-field>
    <v-text-field v-model="Prezime"> </v-text-field>
    <v-text-field v-model="Telefon"> </v-text-field>
    <v-text-field v-model="Adresa"> </v-text-field>
    <div class="produckti" style="height:400px; width:300px;">
    <div v-for="product in productiIzKorpe" :key="product.id">
      {{ product.Name }}
        </div>
    </div>
    <v-btn @click="orderFinal">Završi kupovinu</v-btn>
  </div>
</template>

<script>
import orderMutation from '~/apollo/mutations/order/createOrder.gql'

export default {
  data() {
    return {
      products:[],
      Ime: '',
      Prezime: '',
      Telefon: '',
      Adresa: '',
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
