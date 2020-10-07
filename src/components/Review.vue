<template>
  <div class="review">
    <div class="review__header">
      <p class="review__username">{{ review.username }}</p>
      <p class="review__date">{{ parsedDate }}</p>
    </div>
    <v-rating class="review__rating" color="secondary" :value="review.rating" />
    <p class="review__text">{{ review.text }}</p>
  </div>
</template>

<script>
export default {
  props: ['review'],
  computed: {
    parsedDate() {
      // const d = new Date()
      // return new Date(
      //   parseInt(parts[2], 10),
      //   parseInt(parts[1], 10) - 1,
      //   parseInt(parts[0], 10)
      // )
    }
  }
}
</script>

<style lang="scss" scoped>
.review {
  $self: &;
  display: flex;
  flex-direction: column;
  #{$self}__header {
    display: flex;
    justify-content: space-between;
    font-weight: 800;
    font-size: 22px;
  }
}
</style>
