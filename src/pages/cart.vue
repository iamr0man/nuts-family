<template>
  <div class="cart">
    <div class="cart__header">
      <h3>Кошик</h3>
      <CartItem v-for="v in cart" :key="v.id" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartItem from '../components/CartItem.vue'
export default {
  components: {
    CartItem
  },
  data: () => ({
    amount: 1
  }),
  computed: {
    ...mapGetters('auth', { profile: 'getProfile' }),
    ...mapGetters('cart', { cart: 'getCart' })
  }
}
</script>

<style lang="scss">
.cart {
  display: flex;
}
</style>
