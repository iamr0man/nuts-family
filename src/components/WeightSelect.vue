<template>
  <div class="weights">
    <p v-for="v in weights" :key="v" class="weights__item">{{ v }} г.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weights: [100, 200, 300, 500, 1000]
    }
  }
}
</script>

<style lang="scss">
.weights {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  &__item {
    margin-right: 10px;
    border: 1px solid #3cb640;
    border-radius: 10px;
    padding: 5px 10px;
    color: #3cb640;
    &:hover {
      background: #3cb640;
      color: #fff;
    }
  }
}
</style>
