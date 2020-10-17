<template>
  <div class="cart">
    <div class="cart__header">
      <h3>Кошик</h3>
      <CartItem v-for="v in products" :key="v.id" :item="v" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartItem from '../components/CartItem.vue'
import { db } from '~/plugins/firebase'
export default {
  components: {
    CartItem
  },
  async asyncData(ctx) {
    let products = {}
    let data = {}
    try {
      products = (
        await Promise.all(
          ctx.store.getters['cart/getCart'].products.map((v) => {
            const categoryRef = db.collection(v.categoryName)
            data = v
            return categoryRef.doc(v.productId).get()
          })
        )
      )
        .filter((doc) => doc.exists)
        .map((doc) => ({ id: doc.id, product: doc.data(), ...data }))
      return { products }
    } catch (error) {
      console.log(`received an error in asyncData method:`, error)
      return {}
    }
  },
  data: () => ({
    products: []
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
