<template>
  <div class="catalog">
    <div class="catalog__search">
      <v-text-field
        label="Що хочете куштувати сьогодні?"
        single-line
        clearable
        solo
        hide-details
        @input="debounceSearch"
      >
        <v-icon class="mdi mdi-magnify" />
      </v-text-field>
    </div>
    <div class="catalog__items">
      <ItemCard
        v-for="v in searchedItems"
        :key="v.name"
        class="my-4"
        :item="v"
      />
      <ItemCard
        v-for="v in searchedItems"
        :key="v.name"
        class="my-4"
        :item="v"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ItemCard from '~/components/ItemCard'
export default {
  components: {
    ItemCard
  },
  async fetch(ctx) {
    await ctx.store.commit('category/SET_CATEGORY', ctx.route.params.name)
    await ctx.store.dispatch('category/GET_DEALS')
  },
  data: () => ({
    searchInput: null,
    debounce: null
  }),
  computed: {
    ...mapGetters('category', ['getItems']),
    searchedItems() {
      return this.getItems(this.searchInput)
    }
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        this.searchInput = event
      }, 600)
    }
  }
}
</script>

<style lang="scss">
.catalog__items {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
}
</style>
