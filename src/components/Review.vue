<template>
  <div class="review">
    <div class="review__header">
      <p class="review__username">{{ review.userName }}</p>
      <p class="review__date">{{ parsedDate }}</p>
    </div>
    <v-rating class="review__rating" color="secondary" :value="review.rating" />
    <p class="review__text">{{ review.comment }}</p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['review'],
  computed: {
    parsedDate() {
      const d = new Date(this.review.timestamp)
      const mm = new Date(d).getMonth() + 1
      const dd = new Date(d).getDate()

      return [
        (dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        d.getFullYear()
      ].join('.')
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
    font-size: 18px;
  }
}
</style>
