<template>
  <div class="catalog">
    <ItemCard v-for="v in getDeals" :key="v.name" :item="v" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ItemCard from '../../../components/ItemCard'
export default {
  components: {
    ItemCard
  },
  async fetch(ctx) {
    await ctx.store.commit('category/SET_CATEGORY', ctx.route.params.name)
    await ctx.store.dispatch('category/GET_DEALS')
  },
  computed: {
    ...mapGetters('category', ['getDeals'])
  }
}
</script>
