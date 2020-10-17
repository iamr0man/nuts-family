<template>
  <div class="item">
    <img :src="item.product.image" alt="" class="item__image" />
    <h2 class="item__name">{{ item.product.name }}</h2>
    <div class="item__row">
      <p class="item__label">Вага:</p>
      <div class="item__field">{{ item.weight }} грам</div>
    </div>
    <div class="item__row">
      <p class="item__label">Кількість:</p>
      <v-text-field v-model="amount" class="item__field" />
    </div>
    <div class="item__price">{{ price }} грн.</div>
    <div class="item__remove" @click="removeItem" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['item'],
  data: () => ({
    amount: 1
  }),
  computed: {
    ...mapGetters('auth', { profile: 'getProfile' }),
    price() {
      return this.amount * this.item.product.price[this.item.weight]
    }
  },
  methods: {
    async removeItem() {
      await this.$store.dispatch('cart/REMOVE_CART_PRODUCT', this.item.id)
    }
  }
}
</script>

<style lang="scss">
.item {
  width: 70%;
  min-height: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;

  .v-application p {
    margin: 10px 0 !important;
  }

  &__image {
    width: 70%;
  }

  &__name {
    text-align: center;
    font-weight: 900;
    line-height: 25px;
  }

  &__row {
    display: flex;
    align-items: baseline;

    .item__label {
      color: #484848;
      font-weight: 500;
      font-size: 17px;
      margin-right: 7px;
    }

    .item__field {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .v-input__slot {
    width: 70px !important;
  }
  .item__price {
    font-size: 20px;
    font-weight: 900;
  }
  &__remove {
    position: relative;
    margin-top: 7px;
    opacity: 0.3;
    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      width: 2px;
      height: 15px;
      background-color: #333;
      transform: rotate(-45deg);
    }
    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      width: 2px;
      height: 15px;
      background-color: #333;
      transform: rotate(45deg);
    }
  }
}
</style>
