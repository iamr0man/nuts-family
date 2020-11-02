<template>
  <div class="home">
    <v-row class="pt-5">
      <v-col
        v-for="v in categories"
        :key="v.value"
        class="home__card"
        cols="12"
        sm="12"
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
      title: 'NutsFamily',
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
  &__card {
    margin: 10px;
    border-radius: 40px;
    background-size: cover;
    &:nth-child(1) {
      background-image: url('../static/nuts.jpg');
    }
    &:nth-child(2) {
      background-image: url('../static/druid-fruits.jpg');
    }
    &:nth-child(3) {
      background-image: url('../static/box.jpg');
    }
    .home__category {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      border-radius: 50px;
      .name {
        font-size: 24px;
        font-weight: 800;
      }
    }
  }
}
</style>
