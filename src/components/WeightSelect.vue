<template>
  <div class="weights">
    <p
      v-for="v in weights"
      :key="v"
      class="weights__item"
      :class="{ 'weights__item--active': v === weight }"
      @click.prevent="setActive(v)"
    >
      {{ v }} г.
    </p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['weight'],
  data: () => ({
    weights: [100, 200, 300, 500, 1000]
  }),
  methods: {
    setActive(v) {
      this.$emit('changeWeight', v)
    }
  }
}
</script>

<style lang="scss">
.weights {
  width: 105%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &__item {
    border: 1px solid #3cb640;
    border-radius: 10px;
    margin: 0 5px;
    padding: 3px 5px;
    color: #3cb640;
    font-size: 14px;
    cursor: pointer;
  }

  &__item--active {
    background: #3cb640;
    color: #fff;
  }
}
</style>
