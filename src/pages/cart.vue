<template>
  <div class="cart">
    <h3 class="cart__header">{{ headerName }}</h3>
    <h4 class="cart__total">{{ totalPrice }} грн.</h4>
    <div class="cart__items">
      <CartItem v-for="v in cart.products" :key="v.id" :item="v" />
    </div>
    <v-btn
      :disabled="!isExist"
      color="primary"
      class="cart__action"
      @click="checkout"
      >Оформити замовлення</v-btn
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartItem from '../components/CartItem.vue'
export default {
  components: {
    CartItem
  },
  props: {
    headerName: {
      type: String,
      default: () => 'Кошик'
    }
  },
  data: () => ({
    products: []
  }),
  computed: {
    ...mapGetters('auth', { profile: 'getProfile' }),
    ...mapGetters('cart', { cart: 'getCart' }),
    isExist() {
      return Boolean(this.cart.products.length)
    },
    totalPrice() {
      return this.cart.products.reduce(
        (acc, curr) => acc + curr.amount * curr.product.price[curr.weight],
        0
      )
    }
  },
  methods: {
    async checkout() {
      await this.$router.push('/checkout')
    }
  }
}
</script>

<style lang="scss">
.cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__header {
    font-weight: 400;
    font-size: 16px;
  }
  &__items {
    display: flex;
    flex-direction: column;
  }
  &__total {
    z-index: 1;
    font-weight: bold;
    font-size: 18px;
  }
  &__action {
    border-radius: 30px;
  }
}

@media screen and (min-width: 868px) {
  .cart {
    &__items {
      flex-direction: row;
    }
  }
}
</style>
