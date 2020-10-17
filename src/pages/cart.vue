<template>
  <div class="cart">
    <h3 class="cart__header">Кошик</h3>
    <CartItem v-for="v in products" :key="v.id" :item="v" />
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
            debugger
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
  flex-direction: column;
  align-items: center;
  &__header {
    z-index: 1;
  }
}
</style>
