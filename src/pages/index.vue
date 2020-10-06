<template>
  <div class="home">
    <v-row>
      <!--      <v-col xs="12" lg="12" xs12 class="d-flex flex-column">-->
      <!--        <div>-->
      <!--          <v-text-field-->
      <!--            label="Пошук"-->
      <!--            single-line-->
      <!--            clearable-->
      <!--            solo-->
      <!--            persistent-hint-->
      <!--            hide-details-->
      <!--            @input="debounceSearch"-->
      <!--          >-->
      <!--            <v-icon class="mdi mdi-magnify" />-->
      <!--          </v-text-field>-->
      <!--        </div>-->
      <!--      </v-col>-->
    </v-row>
    <v-row class="pt-5">
      <v-col v-for="v in categories" :key="v" cols="12" sm="6" md="4" lg="3">
        <div class="home__category" @click="setCategory(v.value)">
          <span class="name secondary">{{ v.name }}</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  // async fetch(ctx) {
  // await ctx.store.dispatch('deals/GET_DEALS')
  // },
  data: () => ({
    categories: [
      {
        name: 'Горіхи',
        value: 'nuts'
      },
      {
        name: 'Сухофрукти',
        value: 'dried-fruits'
      },
      {
        name: 'Подарункові набори',
        value: 'gift-sets'
      }
    ],
    searchInput: null,
    debounce: null
  }),
  computed: {
    // ...mapGetters('deals', { searchDeals: 'getDeals' }),
    // searchedDeals() {
    //   return this.searchDeals(this.searchInput)
    // }
  },
  methods: {
    // async setCategory(name) {
    //   this.
    // }
    // debounceSearch(event) {
    //   clearTimeout(this.debounce)
    //   this.debounce = setTimeout(() => {
    //     this.searchInput = event
    //   }, 600)
    // }
  },
  head() {
    return {
      title: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ],
      noscript: [{ innerHTML: 'Body No Scripts', body: true }],
      script: []
    }
  }
}
</script>
<style scoped lang="scss">
* {
  font-family: 'Montserrat', sans-serif;
}
.offer-card {
  min-width: 220px;
}
a,
a:active {
  text-decoration: none;
}
.home {
  &__category {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    border-radius: 50px;
    background: #008080;
    box-shadow: 0 0 20px #006d6d, 0 0 20px #009393;
    .name {
      font-weight: 800;
    }
  }
}
</style>
