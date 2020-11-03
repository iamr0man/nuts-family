<template>
  <nuxt-link :to="link" class="item-card">
    <img class="item-card__image" :src="item.image[0]" alt="image" />
    <h3 class="item-card__name">
      {{ item.name }}
    </h3>
    <v-rating
      class="item-card__rating"
      :value="countAvgStars"
      readonly
      color="secondary"
    />
    <WeightSelect :weight="weight" @changeWeight="updateWeight" />
    <p class="item-card__price">{{ price }} грн.</p>
    <v-btn
      v-if="!isExistInCart"
      class="item-card__action primary"
      @click.prevent="addToCart"
      >Купити</v-btn
    >
    <nuxt-link v-else to="/cart">Товар вже в кошику</nuxt-link>
  </nuxt-link>
</template>

<script>
import { v1 as uuidv1 } from 'uuid'
import priceMixin from '@/mixins/priceMixin'
export default {
  mixins: [priceMixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    link() {
      return this.$route.params.name + '/' + this.item.id
    }
  },
  methods: {
    async addToCart() {
      const data = {
        id: uuidv1(),
        productId: this.item.id,
        categoryName: this.$route.params.name,
        weight: this.weight,
        amount: 1
      }
      await this.$store.dispatch('cart/ADD_CART_PRODUCT', data)
    }
  }
}
</script>

<style lang="scss">
.item-card {
  width: 50%;
  min-height: 375px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 20px 20px 60px #d9d9d9;
  text-decoration: none;
  &__image {
    width: 100%;
  }
  &__name {
    text-align: center;
    font-size: 14px;
  }
  &__rating.v-rating .v-icon {
    padding: 0 !important;
  }
  &__price {
    font-weight: 900;
    font-size: 20px;
    color: #000;
  }
  &__action {
    margin: 10px 0;
  }
}

@media screen and (min-width: 868px) {
  .item-card {
    width: 22%;
    margin: 0 10px;
  }
}
</style>
