<template>
  <div class="home">
    <v-row class="pt-5">
      <v-col
        v-for="v in categories"
        :key="v.value"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <div class="home__category" @click="setCategory(v.value)">
          <span class="name secondary">{{ v.name }}</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    categories: [
      {
        name: 'Горіхи',
        value: 'nuts'
      },
      {
        name: 'Сухофрукти',
        value: 'druid-fruits'
      },
      {
        name: 'Подарункові набори',
        value: 'gift-sets'
      }
    ]
  }),
  methods: {
    async setCategory(name) {
      await this.$router.push(`/catalog/${name}`)
    }
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
