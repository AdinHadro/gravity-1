<template>
  <div v-if="basket" class="basket">
    <div class="my-item">
      <v-img contain :src="basket.item.Icon | url" max-height="30px" max-width="30px" />
      <div>
        <div class="flexed-between">
          <h2>My {{ basket.item.name }}</h2>
          <h2>{{ basket.totalPrice }} kr</h2>
        </div>
        <div class="mending">
          <div class="selected-services">
            <div v-for="(service, index) in basket.services" :key="index">
              <h3>{{ service.name }}</h3>
              <div>
                <h3>{{ service.selectedOption.price.price }} kr</h3>
                <v-btn v-if="showRemoval" text color="green" @click="remove(service, index)">Remove</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSuppliers && !isOrdered" class="my-item supplier">
      <p>Order by 5 pm, delivers:</p>
      <p>Delivery options for: 168 51</p>
      <div v-for="supplier in basket.suppliers" :key="supplier.id" class="supplier-info">
        <label>TAILOR BAG - HOME DELIVERY</label>
        <div class="flexed-between">
          <nuxt-link :to="`/suppliers/${supplier.slug}`">{{ supplier.name }}</nuxt-link>
          <p></p>
          <p>{{ supplier.price }} kr</p>
        </div>
        <p>Get tailor bag within 2 days</p>
        <p>Post tailor bag. Take 3-5 days to receive repaired piece</p>
      </div>
    </div>
    <div v-if="showSuppliers && isOrdered" class="my-item supplier">
      <div v-for="supplier in basket.suppliers" :key="supplier.id" class="supplier-info">
        <label>TAILOR BAG - HOME DELIVERY</label>
        <div class="flexed-between">
          <nuxt-link :to="`/suppliers/${supplier.slug}`">{{ supplier.name }}</nuxt-link>
          <p>{{ supplier.price }} kr</p>
        </div>
        <p>
          1 tailor bag will be delivered to {{ address.FirstName }} {{ address.LastName }} at {{ address.Address1 }}.
          {{ address.City }} {{ address.Zip }}
        </p>
        <p class="big">
          Estimated delivery:
          {{ $moment(basket.createdAt).add(5, 'days').format('dddd Do MMMM YYYY') }}
        </p>
      </div>
    </div>
    <div class="my-item shipping">
      <div class="flexed-between">
        <p>Shipping</p>
        <p>Free</p>
      </div>
      <div class="flexed-between">
        <p>Total incl tax</p>
        <label>{{ basket.totalPrice }} kr</label>
      </div>
    </div>
  </div>
</template>
<script>
import ordersQuery from '~/apollo/queries/order/orders'

export default {
  props: {
    showServices: {
      type: Boolean,
      default: false,
    },
    showRemoval: {
      type: Boolean,
      default: false,
    },
    showSuppliers: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      basket: null,
      isOrdered: false,
      address: null,
    }
  },
  async created() {
    const reference = this.$route.params.id
    this.isOrdered = !!reference

    if (this.isOrdered) await this.loadBasketFromOrder(reference)
    else this.loadBasketFromStorage()
  },
  methods: {
    remove(service, index) {
      this.basket.services.splice(index, 1)
      this.basket.totalPrice -= service.selectedOption.price.price

      const supp = this.basket.suppliers.find((x) => x.id === service.selectedOption.price.supplierId)
      supp.price -= service.selectedOption.price.price

      this.$auth.$storage.setLocalStorage('basket', this.basket, true)
    },
    loadBasketFromStorage() {
      this.basket = this.$auth.$storage.getLocalStorage('basket')
      this.basket.suppliers = this.mapSuppliersFromBasket()
    },
    async loadBasketFromOrder(reference) {
      const req = { query: ordersQuery, variables: { where: { Reference: reference } } }
      const orders = (await this.$apollo.query(req)).data.orders
      if (orders.length) {
        const order = orders[0]
        this.basket = {
          totalPrice: order.Price,
          item: order.OrderSupplier[0].OrderServiceOption[0].service.item,
          createdAt: order.created_at,
        }

        if (this.showServices) {
          this.basket.services = this.mapServices(order)
        }

        if (this.showSuppliers) {
          this.basket.suppliers = this.mapSuppliersFromOrder(order)
          this.address = order.user.addresses[0]
        }
      }
    },
    mapServices(order) {
      const services = order.OrderSupplier.map((x) =>
        x.OrderServiceOption.map((y) => {
          return { name: y.service.name, selectedOption: { price: { price: y.ServiceOption[0].SalePrice } } }
        })
      ).flat()

      return services
    },
    mapSuppliersFromOrder(order) {
      const supps = order.OrderSupplier.map((x) => {
        return {
          id: x.supplier.id,
          name: x.supplier.Name,
          slug: x.supplier.Slug,
          price: x.OrderServiceOption.map((y) => y.ServiceOption[0].SalePrice).reduce((a, b) => a + b),
        }
      })

      return supps
    },
    mapSuppliersFromBasket() {
      const supplierMap = new Map()
      if (this.basket) {
        this.basket.services.forEach((service) => {
          const price = service.selectedOption.price.price
          const supplierId = service.selectedOption.price.supplierId
          const name = service.selectedOption.price.supplierName
          const slug = service.selectedOption.price.supplierSlug
          let supplier = supplierMap.get(supplierId)
          if (!supplier) {
            supplierMap.set(supplierId, {
              id: supplierId,
              name,
              slug,
              price: 0,
            })
            supplier = supplierMap.get(supplierId)
          }

          supplier.price += price
          supplierMap.set(supplierId, supplier)
        })
      }

      return [...supplierMap].map((x) => x[1])
    },
  },
}
</script>
<style lang="scss" scoped>
.supplier {
  display: block;
  border-bottom: 2px solid $border-color;
  .supplier-info {
    padding: 15px 20px;
    background-color: white;
    margin-top: 5px;
    &:first-of-type {
      margin-top: 20px;
    }
    label {
      font-size: 14px;
    }
    p {
      &:first-child {
        margin: 5px 0;
      }
    }
  }
  > p {
    margin-left: 20px;
  }
}
.shipping {
  display: block;
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  label {
    font-size: 18px;
    font-weight: 400;
  }
}
h2 {
  font-size: 17px;
  font-weight: 400;
  line-height: 1;
}
p {
  margin-bottom: 0;
  font-size: 14px;
  &.big {
    margin-top: 10px;
    font-weight: 400;
    font-size: 16px;
  }
}
</style>
