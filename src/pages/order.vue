<template>
  <div class="order">
    <h1 class="order__header">ВАШЕ ЗАМОВЛЕННЯ ОТРИМАНО.</h1>
    <div class="order__description">
      <p>
        ДЯКУЄМО ЗА ПОКУПКУ! Наші фахівці вже борються за право обробити Ваше
        замовлення!
      </p>
      <p>Будьте впевнені, що все буде свіженьке та смачне!</p>
    </div>
    <v-btn color="primary" @click="$router.push({ name: 'index' })"
      >Перейти до магазину</v-btn
    >
  </div>
</template>

<style lang="scss">
.order {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  &__header {
    text-align: center;
    color: #00ab48;
  }
  &__description {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
