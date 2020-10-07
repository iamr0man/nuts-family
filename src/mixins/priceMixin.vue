<script>
import WeightSelect from '~/components/WeightSelect'

export default {
  components: { WeightSelect },
  data() {
    return {
      weight: 100
    }
  },
  computed: {
    weights() {
      return Object.entries(this.item.price)
    },
    price() {
      return this.item.price[this.weight]
    },
    countAvgStars() {
      return this.item.reviews.map((v) => v.rating) / this.item.reviews.length
    }
  },
  methods: {
    updateWeight(newValue) {
      this.weight = newValue
    }
  }
}
</script>
