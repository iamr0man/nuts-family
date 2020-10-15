<template>
  <div class="cart__item">
    <img :src="v.image" alt="" class="item__image" />
    <h2 class="item__name">{{ v.name }}</h2>
    <p class="item__weight">Вага {{ v.selectedWeight }}</p>
    <div class="item__amount">
      <p class="item__label">Кількість</p>
      <v-text-field v-model="amount" class="item__field" />
    </div>
    <div class="item__price">{{ v.selectedPrice }}</div>
    <div class="item__remove" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    amount: 1
  }),
  computed: {
    ...mapGetters('auth', { profile: 'getProfile' }),
    price() {
      return this.amount
    }
  },
  mounted() {
    this.amount = this.cart.selectedAmount
  }
}
</script>

<style lang="scss">
.item {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__close {
    position: relative;
    opacity: 0.3;
    &::before {
      content: ' ';
      position: absolute;
      top: 0;
      width: 2px;
      height: 15px;
      background-color: #333;
    }
    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      width: 2px;
      height: 15px;
      background-color: #333;
    }
  }
}
</style>
